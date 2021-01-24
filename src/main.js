import Vue from 'vue'
import App from './App'
import Store from './store'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = Store

new Vue(App).$mount()
