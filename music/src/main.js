import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/css/index.less'
import Fastclick from 'fastclick'

Vue.config.productionTip = false

Fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
