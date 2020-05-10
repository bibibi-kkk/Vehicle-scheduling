import Vue from 'vue'
import App from './App'
import Vant from 'vant'
import axios from 'axios'
import 'vant/lib/index.less'

Vue.use(Vant)

Vue.config.productionTip = false

Vue.prototype.$axios = axios

axios.defaults.baseURL = 'http://localhost:8080'

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
