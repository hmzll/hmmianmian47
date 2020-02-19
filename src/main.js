import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false


// 导入路由对象，默认优先会找js文件
import router from './router/index'

// 挂载到Vue实例里
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
