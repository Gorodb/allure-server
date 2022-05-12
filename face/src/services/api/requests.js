import apiService from './apiService'

class requests extends apiService {
    static async getProjects () {
        const response = await this._getRequest('api/allure/info')
        return response.reports ? response.reports : response
    }

    static async deleteProject (project) {
        return this._postRequest('api/allure/remove_project', { project })
    }

    static async upload (file, name) {
        return this._sendFile('api/allure/upload', file, name)
    }

    static async createProject (project) {
        return this._postRequest('api/allure/project', project)
    }
}

export default requests
