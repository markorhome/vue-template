// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vant from 'vant';
import VueWechatTitle from 'vue-wechat-title';
import { Input, Table, TableColumn } from 'element-ui';

import './assets/css/resets.css';
import 'vant/lib/index.css';
import 'element-ui/lib/theme-chalk/index.css'

import store from './store'
import * as filter from './common/filter'

import { $getData } from "./api"
Vue.prototype.$getData = $getData

Vue.config.productionTip = false
Vue.use(VueWechatTitle).use(Vant).use(Table).use(Input).use(TableColumn)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  filter,
  components: { App },
  template: '<App/>'
})
