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

// 挂载到Vue实例里
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
