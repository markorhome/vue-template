import Vue from 'vue'
Vue.filter('rateOfW', function(value) {
    if(!value && value != 0) return '--'
    return (value * 100).toFixed(2) + '%'
})
Vue.filter('zhangfu', function(value) {
    if(!value && value !=0) return '--'
    return value > 0 ? '+' +(value * 100).toFixed(2) + '%' : (value * 100).toFixed(2) +'%'
})
Vue.filter('zhangfu1', function(value) {
    if(!value) return '--'
    return value > 0 ? '+' + value + '%' : value +'%'
})
Vue.filter('scale', function(value) {
    if(!value) return '--'
    return (value * 100).toFixed(2) + '%'
})
Vue.filter('price', function(value) {
    if(!value) return '--'

    value = parseInt(value)
    let length = String(value).length
    if(length >= 9) {
        return (value / 100000000).toFixed(1) + '亿'
    } else if(length >= 5)  {
        return Math.round(value / 10000) + '万'
    } else {
        return value
    }
    
})
Vue.filter('fixed2', function(value) {
    if(!value) return '--'
    return value.toFixed(2)
})
Vue.filter('code', function(value) {
    if(!value) return ''
    return value.substr(0,6)
})
Vue.filter('formatDate', function(value) {

    value = value + "";
    var value1
    var value2
    if (value.length > 5) {
        value1 = value.slice(0, 2)
        value2 = value.slice(2, 4)
    } else {
        value1 = value.slice(0, 1)
        value2 = value.slice(2, 4)
    }
    // var value3 = value.slice(6, 8)

    return value1 + ':' + value2
})
