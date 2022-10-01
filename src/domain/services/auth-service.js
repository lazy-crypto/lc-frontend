import http from 'infrastructures/api-http'
import config from 'config/app.base'
export default {
    /**
   * API search staff
   *
   * @param data
   * @returns {AxiosPromise<any>}
   */
    doAuthenticate () {
    // window.location = config.baseUrl + '/login'
    /* let dataUrl = window.location.href
    localStorage.setItem('current_page', dataUrl)
    let data = {
      client_id: config.authentication.clientId,
      response_type: 'token',
      scope: '',
      redirect_uri: config.baseUrl + config.authentication.authenticateUri
    }
    let esc = encodeURIComponent
    let query = Object.keys(data)
      .map(k => esc(k) + '=' + esc(data[k]))
      .join('&')
    window.location = config.baseApiUrl + '/oauth/authorize?' + query */
        this.logout()
    },
    login (username, password) {
        return http.post(config.adminApiUrl + '/login', {username: username, password: password})
    },
    logout () {
        localStorage.removeItem('access_token')
        localStorage.removeItem('current_page')
        localStorage.removeItem('current_user')
        window.location = config.baseUrl + '/login'
    },
    access_denied () {
        window.location = config.baseUrl + '/error/403'
    },
    unauthorized () {
        window.location = config.baseUrl + '/error/401'
    }
}
