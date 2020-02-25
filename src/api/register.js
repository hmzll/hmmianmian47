// 这个文件里面放所有跟注册有关的接口

// 导入axios
import axios from 'axios'

window.console.log('register被执行了')

// 准备封装请求的方法

// 获取手机验证码
// 注意：要写export，因为你封装的方法，最终都是为了被调用的
// 既然要被别人调用就要export暴露出去
// 把接口需要的数据，当做data参数传进来
// 封装成独立的文件里的函数，好处是：以后别人想用，谁都可以导入访问
// 提高了代码的复用
export function sendSMS(data) {

    // 把axios调用后的返回值返回出去了
    // 那么调用者拿到这个返回值,就可以自己写.then，然后他想干嘛就干嘛
    return axios({
        url: process.env.VUE_APP_URL + "/sendsms",
        method: 'post',
        data,
        withCredentials: true
    })

    // .then( res => {

    //     // 如果我在这里写.then的代码，会有什么问题？
    //     // 把处理响应体的代码写死了
    //     alert(res)
    // })

    // 代表是对axios调用后的返回值.then
    // axios(参数).then()
}


// 发注册账号接口的请求
export function register(data) {

    return axios({
        url: process.env.VUE_APP_URL + '/register',
        method: "post",
        data,
        withCredentials: true
    })
}