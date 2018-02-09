import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import './common/css/index.less'
import Fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
// 懒加载
Vue.use(VueLazyload, {
  loading: require('./common/imgae/default.png'),
  error: require('./common/imgae/default.png'),
  attempt: 1
})

Fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
