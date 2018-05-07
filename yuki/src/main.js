// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import './assets/css/yuki.css'
import './assets/js/jquery-3.3.1.js'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.http.options.xhr = { withCredentials: true }
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
