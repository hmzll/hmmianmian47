// 导入Vue
import Vue from 'vue'

// 导NProgress的包
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { info } from '@/api/index.js'
import { removeToken } from '@/utilis/token.js'
import { Message } from 'element-ui';


// 导入路由
import VueRouter from 'vue-router'
import store from '../store/index.js'

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
  { path: "/login", component: login, meta: { title: '登录' } },
  { path: "/", redirect: '/login' },

  {
    path: "/index",
    component: index,
    meta: { title: '首页' },
    children: [
      // 子路由一般不加/
      { path: "user", component: user, meta: { title: '用户列表' } },
      { path: "chart", component: chart, meta: { title: '数据概览' } },
      { path: "business", component: business, meta: { title: '企业列表' } },
      { path: "question", component: question, meta: { title: '题库列表' } },
      { path: "subject", component: subject, meta: { title: '学科列表' } },
    ]
  },

]

// 创建路由对象
const router = new VueRouter({
  routes
})

// 定义白名单数组
let whiteUrl = ['/login', '/zhuce', '/guanggao']

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

  // 可以直接放行的页面，在真实项目可能有多个
  // 注册、广告页面、给用户看的新闻页面、给普通用户展示的产品页面，都不需要做登录判断
  // 路由白名单，里面存放了一些不需要做权限验证的路径，遇到这些白名单里的路径就直接跳转
  // if (to.path == '/login') {

  // 如果我白名单里包含了你要去的页面的路径，代表你这个页面
  // 是不需要权限验证的，直接放行就可以了
  if (whiteUrl.includes(to.path)) {

    // 如果是登录页面，直接放行
    next();

  } else {

    // 别的页面就要做token的真假判断了
    info().then(res => {

      if (res.data.code == 200) {

        // console.log(res);
        
        // 把服务器返回的用户名取出来存到vuex
        store.commit('changeUsername',res.data.data.username);
        store.commit('changeAvatar', process.env.VUE_APP_URL + '/' + res.data.data.avatar);

        //代表token是对的，那么直接放行
        next()

      } else {

        //弹出提示 注意：在路由的js文件里，this不是vue实例，所以没有this.$message
        // 直接用报错的
        // this.$message.error('登录状态有问题，请重新登录')
        Message.error('登录状态有问题，请重新登录！')

        //删除本地token
        removeToken();

        // 手动在这里把进度条完成
        NProgress.done();

        //打回登录页
        next('/login')
      }
    });
  }

})


// 跳转之后的钩子，是在跳转完触发的
// 参数1：to：到哪去
// 参数2：from：从哪来
router.afterEach((to) => {

  // 进来以后结束进度条
  NProgress.done();

  // 取出当前要去的页面的标签，设置给title
  document.title = to.meta.title;
})

// 暴露出去
export default router