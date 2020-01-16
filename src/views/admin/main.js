import Vue from 'vue'
import App from './App.vue'
import router from '../../router/admin'
import store from '../../store/admin'


// 引入自定义基础样式
import 'assets/admin/css/base.css'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// 挂载操作cookies方法
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
// 挂载操作storage方法
import storage from 'common/storage'
Vue.prototype.$localStorage=storage
// 挂载防抖函数
import {debounce} from 'common/utils'
Vue.prototype.$debounce=debounce
// 挂载事件总线实例
Vue.prototype.$bus=new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
