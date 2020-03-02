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

// 导入子路由规则
import children from './childrenRoutes.js'


// 设置路由规则
const routes = [

  {
    path: "/login",
    component: login,
    meta: { title: '登录', roles: ['超级管理员', '管理员', '老师', '学生'] }
  },
  { path: "/", redirect: '/login' },

  {
    path: "/index",
    component: index,
    meta: { title: '首页', roles: ['超级管理员', '管理员', '老师', '学生'] },
    children
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

        console.log(res);

        // 如果是启用的就放行
        if (res.data.data.status == 1) {

          // 把服务器返回的用户名取出来存到vuex
          store.commit('changeUsername', res.data.data.username);
          store.commit('changeAvatar', process.env.VUE_APP_URL + '/' + res.data.data.avatar);
          store.commit('changeRole',res.data.data.role)
          
          // 从登录跳过来的，才提示登录成功
          if(from.path == '/login'){

            Message.success('登录成功')
          }
          //代表token是对的，那么直接放行

          //就算账户是启用，也不能无条件放行
          //因为还要判断下，你这个账号有没有权限去访问将要去的页面
          //to.meta.roles可以得到这个要去的页面哪些角色可以访问
          //然后我们要判断当前登录的用户的角色是不是在这些角色里面
          // console.log(to);

          // 判断一个数组是否包含一个元素，包含得到true，不包含得到false
          // 在判断要去的页面可以访问的角色里，是否包含我当前登录的用户的角色
          
          if (to.meta.roles.includes(res.data.data.role)) {
            next()
          } else {

            //代表没有权限访问，就从哪来的就回到哪
            Message.warning('该页面，你无权访问！')
            NProgress.done();
            next(from.path)
          }


        } else {

          //代表是禁用的
          Message.warning('账号被禁用，请与管理员联系')
          NProgress.done();
          next('/login')
        }

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