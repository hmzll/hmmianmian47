// 导入Vue
import Vue from 'vue'

// 导NProgress的包
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


// 导入路由
import VueRouter from 'vue-router'

// 注册路由
Vue.use(VueRouter)

// 准备组件
import login from "../views/login/index.vue"
import index from '../views/index/index.vue'
// 导入组件
import user from '../views/index/user/user.vue'
import chart from '../views/index/chart/chart.vue'
import business from '../views/index/business/business.vue'
import question from '../views/index/question/question.vue'
import subject from '../views/index/subject/subject.vue'




// 设置路由规则
const routes = [
  { path: "/login", component: login },


  {
    path: "/index",
    component: index,
    children: [
      // 子路由一般不加/
      { path: "user", component: user },
      { path: "chart", component: chart },
      { path: "business", component: business },
      { path: "question", component: question },
      { path: "subject", component: subject },
    ]
  },

]

// 创建路由对象
const router = new VueRouter({
  routes
})

// 我们把导航守卫要写在创建router对象的后面
// 这个回调函数，是在即将跳转路由之前调用的
// to：到哪去
// from:从哪来
// 他们两都是一个对象，对象里的path属性就是他们的路径
// next:是一个函数，调用这个函数就代表放行（让你跳转）
// next调用的时候不传任何参数，就代表原来要到哪去就放行到哪
router.beforeEach((to, from, next) => {
  
  // 开启进度条
  NProgress.start();
  
  next();
})


// 跳转之后的钩子，是在跳转完触发的
// to：到哪去
// from：从哪来
router.afterEach(() => {
  
  // 进来以后结束进度条
  NProgress.done();
  
})

// 暴露出去
export default router