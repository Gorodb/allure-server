import React from "react"

import Markdown from '@loopmode/markdown'

import classes from './Examples.module.scss'

const installRequirements = `\`\`\`javascript
yarn add 7zip-min
yarn add axios
yarn add form-data
yarn add npm-run-all
\`\`\``

const testPhase = `\`\`\`javascript
"scripts": {
    "pretest": "rm -rf allure-results && rm -rf allure-report && webdriver-manager update",
    "run-test": "jest",
    "run-after-test": "node archiver.js",
    "test": "npm-run-all run-test run-after-test --continue-on-error",
    "allure_run": "yarn allure generate allure-results --clean -o allure-report && yarn allure open allure-report",
    "allure_gen": "yarn allure generate allure-results --clean -o allure-report"
}
\`\`\``

const axiosInstance = `\`\`\`javascript
const Axios = require('axios')
const https = require('https')

const apiUrl = 'http...' // адрес бэкенда

const axios = Axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    }),
    baseURL: apiUrl
})

module.exports = axios
\`\`\``

const axiosMethods = `\`\`\`javascript
const axios = require('./axiosInstance')
const FormData = require('form-data')
const { readFileSync } = require('fs')
    
static async createProject (description, project, platform) {
    try {
        const { data } = await axios.post('api/allure/project', { description, project, platform })
        return data
    } catch (e) {
        console.error(e.response)
        return e.response
    }
}

static async sendAllureResults (name, filePath, fileName) {
    const file = readFileSync(filePath)

    try {
        const formData = new FormData()
        formData.append(name, file, fileName)

        const { data } = await axios.post('api/allure/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...formData.getHeaders()
            }
        })
       return data
 } catch (e) {
        console.error(e)
        return e.response
    }
}
\`\`\``

const sendMethods = `\`\`\`javascript
const { existsSync, mkdirSync, unlinkSync } = require('fs')
const _7z = require('7zip-min')

const requests = require('./api/requests')

const archiveAllureBy7Zip = async (folder) => {
    const fileName = \`\${folder}.7z\`
    const project = 'nc-web-admin' // название проекта на латинице, допустимы тире

    await requests.createProject('Проект на русском (описание)', project, 'admin-nc') // admin-nc - платформа для фильтрации
    await _7z.pack(folder, fileName, async (err) => {
        if (err) {
            console.log(err)
        }
        await requests.sendAllureResults(project, fileName, 'allure-results.7z')
        if (existsSync(fileName)) {
            unlinkSync(fileName)
        }
    })
}

(async () => {
    await archiveAllureBy7Zip("./allure-results")
})()
\`\`\``

const JsExample = () => {
    return (
        <>
            <div className={classes['code-description']}>Добавляем зависимости</div>
            <Markdown>
                {installRequirements}
            </Markdown>
            <div className={classes['code-description']}>Добавляем <span>archiver.js</span> файл в корень проекта. Он будет выполняться после завершения фазы <span>test</span></div>
            <Markdown>
                {sendMethods}
            </Markdown>
            <div className={classes['code-description']}>Добавляем инстанс axios: файл <span>axiosInstance.js</span> в папку <span>api</span></div>
            <Markdown>
                {axiosInstance}
            </Markdown>
            <div className={classes['code-description']}>Добавляем метод для отправки отчета на сервер, файл <span>requests.js</span></div>
            <Markdown>
                {axiosMethods}
            </Markdown>
            <div className={classes['code-description']}>Настраиваем <span>package.json</span> для автоматической отправки аллюров</div>
            <Markdown>
                {testPhase}
            </Markdown>
        </>
    )
}

export default JsExample