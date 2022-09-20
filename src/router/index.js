import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: resolve => require(['@/components/Home'], resolve),
            meta: {
                title: '',
            }
        },
        {
            path: '/abc',
            name: 'HQ',
            component: resolve => require(['@/components/HQChart/index'], resolve),
            meta: {}
              
        }
    ]
})