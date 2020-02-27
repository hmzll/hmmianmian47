// 放vuex的代码
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    
    state:{
        // 用户名
        username:"",
        // 头像
        avatar:""
    },

    mutations:{

        // 专门用来修改用户名的方法
        changeUsername(state,val){

            state.username = val;
        },

        // 专门用来修改头像的方法
        changeAvatar(state,val){

            state.avatar = val;
        }
    }
})

export default store;