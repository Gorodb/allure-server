const { exec } = require('child_process')
const { existsSync, unlinkSync, readdirSync, lstatSync, moveSync, removeSync, statSync } = require('fs-extra')
const { join } = require('path')
const LeafDB = require('leaf-db')
const Seven = require('node-7z')
const sevenBin = require('7zip-bin')
const jaguar = require('jaguar')

const env = process.env
let db = new LeafDB(env.DB, { root: `${process.cwd()}/db`, autoload: true })

class AllureMethods {
    static async allureGenerateFromCustomFolder (source, destination) {
        try {
            if (existsSync(`${env.ALLURE_REPORTS_PATH}${destination}/history`)) {
                moveSync(`${env.ALLURE_REPORTS_PATH}${destination}/history`, `${source}/history`, { overwrite: true }, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
            await exec(
                `allure generate ${source} --clean -o ${env.ALLURE_REPORTS_PATH}/${destination}`,
                { maxBuffer: 25 * 1024 * 1024 }
            )
        } catch (err) {
            console.log(err)
        }
    }

    static async deleteProject (project) {
        const uploadResults = `${env.FILE_UPLOAD_PATH}${project}`
        const reports = `${env.ALLURE_REPORTS_PATH}${project}`
        removeSync(uploadResults)
        removeSync(reports)
        await db.delete({ project })
    }

    static async createOrGetDataFromDb ({ project, description, platform, lastUpdate = Date.now() }) {
        const currentData = await db.find({ project })
        if (!currentData.length) {
            db.insert({ project, description, platform, lastUpdate })
            db.persist()
        } else {
            db.update({ project }, { project, description, platform, lastUpdate })
            db.persist()
        }
        return (await db.find({ project }))[0]
    }

    static async checkForProject (fileName) {
        const data = await db.find({ project: fileName })

        return !!data.length
    }

    static async unpackAllureBy7zAndGenerate (file, filePath, uploadPath) {
        const unpackStream = Seven.extractFull(filePath, uploadPath, {
            $bin: sevenBin.path7za,
            $progress: true
        })
        unpackStream.on('error', (err) => {
            console.log(err)
            this.deleteFile(filePath)
            return false
        })
        unpackStream.on('end', () => {
            this.generateAllureAndDeleteArchive(file, uploadPath, filePath)
        })
    }

    static async unpackGzAllureAndGenerate (file, filePath, uploadPath) {
        const extract = jaguar.extract(filePath, uploadPath)
        extract.on('error', (error) => {
            console.error(error)
            this.deleteFile(filePath)
            return false
        })
        extract.on('end', async () => {
            await this.generateAllureAndDeleteArchive(file, uploadPath, filePath)
        });
    }

    static async generateAllureAndDeleteArchive (file, uploadPath, filePath) {
        const reportsFolder = readdirSync(uploadPath)
        try {
            if (lstatSync(join(uploadPath, reportsFolder[0])).isDirectory()) {
                this.deleteOldReports(join(uploadPath, reportsFolder[0]))
                await this.allureGenerateFromCustomFolder(`${uploadPath}/${reportsFolder[0]}`, file)
            } else {
                this.deleteOldReports(uploadPath)
                await this.allureGenerateFromCustomFolder(uploadPath, file)
            }
        } catch (err) {
            console.log(err)
        }
        await this.setLastUpdate(file)
        this.deleteFile(filePath)
    }

    static async setLastUpdate (project) {
        const currentProject = await this.getProjectInfo(project)
        if (currentProject) {
            delete currentProject['_id']
            await db.update({ project }, { ...currentProject, lastUpdate: Date.now() })
            await db.persist()
        }
    }

    static deleteOldReports (folderPath) {
        const deep = Date.now() - env.REPORTS_STORING_DAYS * 24 * 60 * 60 * 1000
        readdirSync(folderPath).forEach(file => {
            if (this.createdDate(join(folderPath, file)) < deep) {
                this.deleteFile(join(folderPath, file))
            }
        })
    }

    static createdDate (file) {
        try {
            const { mtimeMs  } = statSync(file)
            return mtimeMs
        } catch (err) {
            console.log(err)
        }
        return 0
    }

    static deleteFile (filePath) {
        if (existsSync(filePath)) unlinkSync(filePath)
    }

    static async getProjectInfo (project = '') {
        return (await db.find({ project }))[0]
    }

    static async getALLProjects () {
        return (await db.find({ $exists: 'project' }))
    }
}

module.exports = AllureMethods
