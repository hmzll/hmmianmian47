import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

// 导入样式直接import 路径就可以了
import "./style/base.css"


// 导入路由对象，默认优先会找js文件
import router from './router/index'
// 导入vuex对象
import store from './store/index'

// 导入全局过滤器
// 我们这个文件只需要保证能够执行里面的代码就行了
// 所以就只是简单导入
import '@/filters/filters.js'

// 挂载到Vue实例里
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
