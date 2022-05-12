const { readdirSync, existsSync, mkdirSync, readFileSync } = require('fs-extra')
const archiveType = require('archive-type')

const ErrorResponse = require('../middleware/errorResponse')
const asyncHandler = require('../middleware/asyncHandler')
const AllureMethods = require('../src/allureMethods')

const env = process.env

// @desc    delete project from allure server
// @rout    POST /api/allure/remove_project
exports.deleteProject = asyncHandler(async (req, res, next) => {
    let { project } = req.body

    if (!project) {
        return next(new ErrorResponse(`Проект: '${project}' - обязательный параметр`, 500))
    }

    project = project.toLowerCase()
    await AllureMethods.deleteProject(project)

    res.status(200).json({ success: true })
})

// @desc    create project for allure results
// @rout    POST /api/allure/project
exports.createProject = asyncHandler(async (req, res, next) => {
    let { project, description, platform } = req.body

    if (!project || !description || !platform) {
        return next(new ErrorResponse(`Проект: '${project}', описание: '${description}' и платформа '${platform}' - обязательные параметры.`, 500))
    }

    project = project.toLowerCase()
    const result = await AllureMethods.createOrGetDataFromDb({ project, description, platform, lastUpdate: Date.now() })

    res.status(200).json(result)
})

// @desc    get allure archive and generate allure report
// @rout    POST /api/allure/upload
exports.uploadAllureReports = asyncHandler(async (req, res, next) => {
    if (!req.files) {
        return next(new ErrorResponse(`Аллюр отчет не прикреплен`, 500))
    }
    const { files } = req


    for (let file in files) {
        if (files.hasOwnProperty(file)) {
            if (files[file].size > process.env.MAX_FILE_UPLOAD * 1024 * 1024) {
                return next(new ErrorResponse(`Максимальный размер файла не должен превышать ${process.env.MAX_FILE_UPLOAD}Mb`, 400))
            }

            if (!(await AllureMethods.checkForProject(file))) {
                await AllureMethods.createOrGetDataFromDb({ project: file, description: 'Не задано', platform: 'wink' })
            }

            const filePath = `${env.FILE_UPLOAD_PATH}${files[file].name}`
            const uploadPath = `${env.FILE_UPLOAD_PATH}${file}`

            await createFolderIfDoesNotExists(uploadPath)

            try {
                const { ext } = archiveType(files[file].data)

                await files[file].mv(filePath, async (err) => {
                    if (err) {
                        return next(new ErrorResponse(`При загрузке файла возникли проблемы`, 500))
                    }

                    if (ext === 'zip' || ext === '7z') {
                        await AllureMethods.unpackAllureBy7zAndGenerate(file, filePath, uploadPath)
                    } else if (ext === 'gz') {
                        await AllureMethods.unpackGzAllureAndGenerate(file, filePath, uploadPath)
                    } else {
                        return next(new ErrorResponse(`Неподдерживаемый формат архива ${ext}. Поддерживаются только: .zip, .7z, .gz, .tgz, .tar.gz`, 500))
                    }
                })
            } catch (err) {
                return next(new ErrorResponse(`Неподдерживаемый формат файла. Поддерживаются только: .zip, .7z, .gz, .tgz, .tar.gz`, 500))
            }
        }
    }
    res.status(200).json({ success: true })
})

// @desc    get allure info
// @rout    POST /slack/commands/allure_info
exports.allureInfo = asyncHandler(async (req, res, next) => {
    await createFolderIfDoesNotExists('./allure-reports')
    const reports = readdirSync('./allure-reports')
    const allProjects = await AllureMethods.getALLProjects()
    let reportsInfo = {
        reports: []
    }
    for (let report of reports) {
        const summeryFile = `./allure-reports/${report}/widgets/summary.json`
        if (existsSync(summeryFile)) {
            const summery = JSON.parse(readFileSync(summeryFile, 'utf8'))
            const project = await AllureMethods.getProjectInfo(report)
            summery.project = report
            if (project) {
                summery._id = project._id
                summery.platform = project.platform
                summery.lastUpdate = project.lastUpdate
            } else {
                await AllureMethods.createOrGetDataFromDb({ project: report, description: 'Не задано', platform: 'wink' })
            }
            summery.hasReports = true
            summery.description = project ? project.description : 'Не задано'
            reportsInfo.reports = [summery, ...reportsInfo.reports]
        }
    }
    const projectsToPush = allProjects.reduce((acc, project) =>
        reportsInfo.reports.reduce((acc, report) => report.project === project.project ? true : acc, false)
            ? acc : [...acc, { ...project, hasReports: false }], [])

    reportsInfo.reports = [...projectsToPush, ...reportsInfo.reports]
        .sort((a, b) => a.lastUpdate - b.lastUpdate ).reverse()
    res.status(200).send(reportsInfo)
})

const createFolderIfDoesNotExists = (folder) => {
    if (!existsSync(folder)) {
        mkdirSync(folder, { recursive: true })
    }
}
