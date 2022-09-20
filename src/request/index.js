import axios from 'axios'
import { Toast } from 'vant'
// import Cookies from 'js-cookie'

let baseURL=''

// if(process.env.NODE_ENV == 'development') {
//     baseURL = 'http://test-stockapi.dn8188.com/'
//     // baseURL = '/api'
// } else if(process.env.NODE_ENV == 'production') {
//     baseURL = 'https://test-stockapi.dn8188.com/'
// }

let server = axios.create({
    baseURL: baseURL,
    timeout: 500000
})

server.interceptors.request.use((config)=>{

    // config.headers['Access-Control-Expose-Headers'] = 'token'
    // config.headers['auth_type'] = 'sina'
    // config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    // config.headers['token'] = Cookies.get('token') || ''
    return config
},(error)=>{
    return Promise.error(error)
})

server.interceptors.response.use((response)=>{
    let code = response.data.code

    // if(response.status == 200 && (code == 1000||code == 90)) {
        return response.data
    // } else {
    //     Promise.reject(response)
    //     Toast(response.data.msg || response.data.message)
    // }
},(error)=>{
    const {response} = error
    Toast('接口错误：'+response.data.status)
    Promise.reject(response)
})
export default server
