const { existsSync, unlinkSync } = require('fs')
const _7z = require('7zip-min')

const requests = require('../face/src/services/api/requests')

const archiveAllureBy7Zip = async (folder) => {
    const fileName = `${folder}.7z`
    const project = 'nc-web-admin'

    await requests.createProject(project, 'Tests description')
    await _7z.pack(folder, fileName, async (err) => {
        if (err) {
            console.log(err)
        }
        await requests.allureSend(project, fileName, 'allure-results.7z')
        if (existsSync(fileName)) {
            unlinkSync(fileName)
        }
    })
}

(async () => {
    await archiveAllureBy7Zip("./allure-results")
})()

