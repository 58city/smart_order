import Vue from 'vue'
import App from './App.vue'
import router from '../../router/mobile'
import store from '../../store/mobile'
Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()
// 引入mockjs
require('./mock')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
