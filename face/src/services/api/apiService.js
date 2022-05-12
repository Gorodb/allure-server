import { axios } from './axiosInstance'
import FormData from 'form-data'

class ApiService {
    static async _postRequest (url, body = {}) {
        try {
            const { data } = await axios.post(url, body)
            return data
        } catch (e) {
            return e.response.data
        }
    }

    static async _getRequest (url, params = {}) {
        let queryParams = ''
        for (let param in params) {
            if (params[param] !== undefined) {
                queryParams += `${param}=${params[param]}&`
            }
        }
        if (queryParams) {
            queryParams += '?'
        }

        try {
            const { data } = await axios.get(`${url}${encodeURI(queryParams)}`)
            return data
        } catch (e) {
            return e.response.data
        }
    }

    static async _sendFile (url, file, name) {
        try {
            const formData = new FormData()
            formData.append(name, file)

            const { data } = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return data
        } catch (e) {
            return e.response.data
        }
    }

    static async _putRequest (url, body = {}) {
        try {
            const { data } = await axios.put(url, body)
            return data
        } catch (e) {
            return e.response.data
        }
    }

    static async _deleteRequest (url) {
        try {
            const { data } = await axios.delete(url)
            return data
        } catch (e) {
            return e.response.data
        }
    }
}

export default ApiService
