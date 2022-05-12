const { existsSync, mkdirSync, unlinkSync } = require('fs')
const tar = require('tar')
const _7z = require('7zip-min')

const requests = require('../face/src/services/api/requests')

const archiveAllureBy7Zip = async (folder) => {
    const fileName = `${folder}.7z`
    const project = 'nc-web-admin'

    await requests.createProject(project, 'Тесты доступности страниц админки')
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

const archiveAllureByTar = (folder) => {
    if (!existsSync(folder)) {
        mkdirSync(folder, { recursive: true })
    }

    try {
        tar.c(
            {
                gzip: true ,
                file: `${folder}.tgz`
            },
            [folder]
        ).then(async () => {
            await requests.allureSend('nc-web-admin', 'allure-results.tgz', 'allure-results.tgz')
        }).then(() => {
            if (existsSync(`${folder}.tgz`)) {
                unlinkSync(`${folder}.tgz`)
            }
        })
    } catch (err) {
        console.log(err)
    }
}

(async () => {
    await archiveAllureBy7Zip("./allure-results")
})()

