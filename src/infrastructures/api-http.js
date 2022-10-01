import axios from 'axios'

const http = axios.create({
  baseURL: process.env.VUE_APP_ETHW_API_URL,
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
