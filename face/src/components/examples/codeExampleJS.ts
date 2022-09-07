export const installRequirements = `\`\`\`javascript
yarn add 7zip-min
yarn add axios
yarn add form-data
yarn add npm-run-all
\`\`\``

export const testPhase = `\`\`\`javascript
"scripts": {
    "pretest": "rm -rf allure-results && rm -rf allure-report && webdriver-manager update",
    "run-test": "jest",
    "run-after-test": "node archiver.js",
    "test": "npm-run-all run-test run-after-test --continue-on-error",
    "allure_run": "yarn allure generate allure-results --clean -o allure-report && yarn allure open allure-report",
    "allure_gen": "yarn allure generate allure-results --clean -o allure-report"
}
\`\`\``

export const axiosInstance = `\`\`\`javascript
const Axios = require('axios')
const https = require('https')

const apiUrl = 'http...' // backend endpoint

const axios = Axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    }),
    baseURL: apiUrl
})

module.exports = axios
\`\`\``

export const axiosMethods = `\`\`\`javascript
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

export const sendMethods = `\`\`\`javascript
const { existsSync, mkdirSync, unlinkSync } = require('fs')
const _7z = require('7zip-min')

const requests = require('./api/requests')

const archiveAllureBy7Zip = async (folder) => {
    const fileName = \`\${folder}.7z\`
    const project = 'go-e-website' // project name

    await requests.createProject('Projects description', project, 'go-e-website') // go-e-website - platform for filters
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