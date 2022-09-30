import axios from 'axios'
import config from 'config/app.base'
import authService from 'domain/services/auth-service'

const httpAuth = axios.create({
    baseURL: config.baseApiUrl,
    // Add header or another config here
    headers: {
    // 'Content-Type': 'application/json;charset=UTF-8',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    // 'Access-Control-Allow-Headers': ''
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
})
// Add a response interceptor
httpAuth.interceptors.response.use((response) => {
    // Do something with response data
    return response
}, (error) => {
    // Do something with response error
    // return Promise.reject(error)
    let code = parseInt(error.response && error.response.status)
    if (code === 401 || code === 422) {
        return authService.unauthorized()
    } else if (code === 403) {
        return authService.access_denied()
    }
    return Promise.reject(error)
})

export default httpAuth
