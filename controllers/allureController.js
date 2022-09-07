const {readdirSync, existsSync, mkdirSync, readFileSync} = require('fs-extra')
const archiveType = require('archive-type')

const ErrorResponse = require('../middleware/errorResponse')
const asyncHandler = require('../middleware/asyncHandler')
const AllureMethods = require('../src/allureMethods')
const {reportTypes} = require("../types/reportTypes");

const env = process.env

// @desc    delete project from allure server
// @rout    POST /api/allure/remove_project
exports.deleteProject = asyncHandler(async (req, res, next) => {
  let {project} = req.body

  if (!project) {
    return next(new ErrorResponse(`Project: '${project}' - is a required field`, 500))
  }

  project = project.toLowerCase()
  await AllureMethods.deleteProject(project)

  res.status(200).json({success: true})
})

// @desc    create project for allure results
// @rout    POST /api/allure/project
exports.createProject = asyncHandler(async (req, res, next) => {
  let {project, description, platform, type, entrypoint = 'index.html'} = req.body

  if (!project || !description || !platform) {
    return next(new ErrorResponse(`Project: '${project}', description: '${description}' and platform '${platform}' - are required fields.`, 500))
  }

  if (!reportTypes[type]) {
    return next(new ErrorResponse(`Project type should be one of: ${types.join(' | ')}`, 500))
  }

  project = project.toLowerCase()
  const result = await AllureMethods.createOrGetDataFromDb({
    project,
    description,
    type,
    platform, lastUpdate: Date.now(),
    entrypoint
  })

  res.status(200).json(result)
})

// @desc    get allure archive and generate allure report
// @rout    POST /api/allure/upload
exports.uploadAllureReports = asyncHandler(async (req, res, next) => {
  if (!req.files) {
    return next(new ErrorResponse(`Report was not attached`, 500))
  }
  const {files} = req

  for (let file in files) {
    if (files[file].size > process.env.MAX_FILE_UPLOAD * 1024 * 1024) {
      return next(new ErrorResponse(`File size shouldn't be greater then ${process.env.MAX_FILE_UPLOAD}Mb`, 400))
    }

    if (!(await AllureMethods.checkForProject(file))) {
      await AllureMethods.createOrGetDataFromDb({project: file, description: 'Unassigned', platform: 'go-e'})
    }

    const fileName = files[file].name
    const filePath = `${env.FILE_UPLOAD_PATH}${fileName}`
    const uploadPath = `${env.FILE_UPLOAD_PATH}${file}`
    const reportType = await AllureMethods.getProjectsType(file)

    if (!reportType) {
      return next(new ErrorResponse(`Project ${file} does not include type: ${reportType}, first update the project`, 500))
    }

    await createFolderIfDoesNotExists(uploadPath)

    try {
      const {ext} = archiveType(files[file].data)

      await files[file].mv(filePath, async (err) => {
        if (err) {
          return next(new ErrorResponse(`An error on file upload`, 500))
        }

        if (ext === 'zip' || ext === '7z') {
          if (reportType === reportTypes.allure) {
            console.log('Unzipping allure reports...')
            await AllureMethods.unpackAllureBy7zAndGenerate(file, filePath, uploadPath, reportType)
          } else if (reportType === reportTypes.html) {
            console.log('Unzipping html reports...')
            await AllureMethods.unpackHtmlBy7zAndMove(file, filePath, uploadPath, reportType)
          }
        } else if (ext === 'gz') {
          if (reportType === reportTypes.allure) {
            await AllureMethods.unpackGzAllureAndGenerate(file, filePath, uploadPath, reportType)
          } else if (reportType === reportTypes.html) {
            await AllureMethods.unpackGzHtmlAndMove(file, filePath, uploadPath, reportType)
          }
        } else {
          return next(new ErrorResponse(`Unrecognized archive type ${ext}. Supported only: .zip, .7z, .gz, .tgz, .tar.gz`, 500))
        }
      })
    } catch (err) {
      return next(new ErrorResponse(`Unsupported file format. Supported only: .zip, .7z, .gz, .tgz, .tar.gz`, 500))
    }
  }
  res.status(200).json({success: true})
})

// @desc    get allure info
// @rout    POST /slack/commands/allure_info
exports.allureInfo = asyncHandler(async (req, res) => {
  await createFolderIfDoesNotExists('./allure-reports')
  const reports = readdirSync('./allure-reports')
  const allProjects = await AllureMethods.getALLProjects()
  let reportsInfo = {
    reports: []
  }
  for (let report of reports) {
    const summeryFile = `./allure-reports/${report}/widgets/summary.json`
    const project = await AllureMethods.getProjectInfo(report)
    const isHtmlProject = project && project.type === 'html'
    if (isHtmlProject) {
      project.hasReports = true
      project.statistic = {}
      project.time = {}
      reportsInfo.reports = [project, ...reportsInfo.reports]
    }
    if (existsSync(summeryFile)) {
      const summery = JSON.parse(readFileSync(summeryFile, 'utf8'))
      summery.project = report
      if (project) {
        summery._id = project._id
        summery.platform = project.platform
        summery.lastUpdate = project.lastUpdate
        summery.type = project.type || 'allure'
      } else {
        await AllureMethods.createOrGetDataFromDb({
          project: report,
          description: 'Not set',
          platform: 'go-e-website',
          type: 'html'
        })
      }
      summery.hasReports = true
      summery.description = project ? project.description : 'Unassigned'
      reportsInfo.reports = [summery, ...reportsInfo.reports]
    }
  }
  const projectsToPush = allProjects.reduce((acc, project) =>
    reportsInfo.reports.reduce((acc, report) => report.project === project.project ? true : acc, false)
      ? acc : [...acc, {...project, hasReports: false}], [])

  reportsInfo.reports = [...projectsToPush, ...reportsInfo.reports]
    .sort((a, b) => a.lastUpdate - b.lastUpdate).reverse()
  res.status(200).send(reportsInfo)
})

const createFolderIfDoesNotExists = (folder) => {
  if (!existsSync(folder)) {
    mkdirSync(folder, {recursive: true})
  }
}

