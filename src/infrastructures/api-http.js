import axios from 'axios'
import config from 'config/app.base'

const http = axios.create({
  baseURL: config.baseApiUrl,
  // Add header or another config here
  headers: {
    // 'Content-Type': 'application/json;charset=UTF-8',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    // 'Access-Control-Allow-Headers': ''
    'Accept': 'application/json'
  }
})

export default http
