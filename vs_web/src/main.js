import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ant from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(ant)

Vue.config.productionTip = false
Vue.prototype.$https = axios

axios.defaults.baseURL = 'http://localhost:8080'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
