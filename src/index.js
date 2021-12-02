import Vue from 'vue'
import App from './page/app'
import router from './router'
import store from './vuex'
import './assets/icon/loadAll.js'
import './index.css'
import './responsive'

//全局注册部分频繁使用组件及函数
import { Toast as toast } from 'vant'
import { post } from './api'
Vue.prototype.$post = post


Vue.config.productionTip = false

new Vue({
  router,
  store,
  toast,
  render: h => h(App)
}).$mount('#app')
