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
Vue.filter('poolType', function(value) {
    if(!value) return ''
    let type = {
        '1': '不变',
        '2': '加仓',
        '3': '减仓',
        '4': '新进',
        '5': '退出'
    }
    return type[value]
})