import axios from 'axios'
// import Cookies from 'js-cookie'

let baseURL = 'https://stockapi.dn8188.com/bx-api/margin/'
let baseURLTnb = 'https://test-tnbapi.dn8188.com/'

let server = axios.create({
    baseURL: baseURL,
    timeout: 500000
})

server.interceptors.request.use((config)=>{
    
    config.headers['Access-Control-Expose-Headers'] = 'token'
    config.headers['auth_type'] = 'sina'
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    // config.headers['token'] = Cookies.get('token') || ''
    return config
},(error)=>{
    return Promise.resolve(error)
})

server.interceptors.response.use((response)=>{
    let code = response.data.code

    if(code == '1000') {
        return response.data
    } else {
        console.error(response.data.msg)
        Promise.reject()
    }
},(error)=>{
    // console.error(error, 'error')
    // Promise.resolve(error)
})

export default server