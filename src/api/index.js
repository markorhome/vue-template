import server from '../request'

export function $getData(url,params) {
    
    if(params) {
        url += '?'
     
        for(var i in params) {
            url += i + '=' + params[i] + '&'
        }
        url = url.slice(0, -1)
        params = {}
    } 
    return server({
        url,
        method: 'GET',
        data: params
    })
}