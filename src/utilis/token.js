// 定义一个常量
const TOKENKEY = 'mmtoken'

// 获取token，要记得return
export function getToken(){

   return window.localStorage.getItem(TOKENKEY)
}


// 设置token，或者叫保存token，他有一个参数，接收token值
export function setToken(token){

    window.localStorage.setItem(TOKENKEY,token);
}


// 删除token
export function removeToken(){

    window.localStorage.removeItem(TOKENKEY)
}