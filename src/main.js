import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// todo 1.入口
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
