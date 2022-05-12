import Axios from 'axios'
import https from 'https'

export const axios = process.env.NODE_ENV === 'development'
    ? Axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        }),
        baseURL: process.env.REACT_APP_API_URL
    })
    : Axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    })
