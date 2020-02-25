<template>
  <el-container class="my-container">
    <el-header class="my-header">
      <!-- 左边的部分 -->
      <div class="left">
        <!-- 字体图标 -->
        <i @click="isCollapse = !isCollapse" :class="isCollapse ?  'el-icon-s-unfold' : 'el-icon-s-fold' "></i>
        <img src="./images/logo.png" alt />
        <span>黑马面面</span>
      </div>
      <!-- 右边的部分 -->
      <div class="right">
        <img :src="avatar" alt />
        <span class="name">{{ username }}，你好</span>
        <el-button @click="doLogout" type="primary" size="mini">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 左侧部分 -->
      <el-aside class="my-aside" width="auto">
        <!-- 菜单 -->
        <!-- 
          router属性为true，代表启用路由模式，效果就是点击菜单会进行路由跳转
          以被点击的菜单的index属性作为路径跳转
         -->
        <el-menu router :collapse="isCollapse" default-active="1" class="el-menu-vertical-demo">
          <el-menu-item index="/index/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>

          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>

          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>

          <el-menu-item index="/index/business">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>

          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>


      <el-main class="my-main">
        <!-- 子路由的路由出口 -->
        <router-view></router-view>
      </el-main>


    </el-container>
  </el-container>
</template>

<script>
// 导入接口
import { info, logout } from "@/api/index.js";
// 导入操作token的工具
import { removeToken } from "@/utilis/token.js";

export default {
  data() {
    return {
      username: "",
      avatar: "",
      // 是否折叠菜单
      isCollapse: false
    };
  },

  methods: {
    doLogout() {
      this.$confirm("您将退出本系统, 是否继续退出?", "是否退出", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //发请求
          logout().then(() => {
            this.$message.success("退出成功！");
            removeToken();
            // 跳转到登录页面
            this.$router.push("/login");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "感谢您，您还留下来陪着我，我好开心O(∩_∩)O哈哈~"
          });
        });
    }
  },

  created() {
    console.log('index.vue进来了');
    
    // 调用获取用户信息的接口
    info().then(res => {
      // console.log(res);
      this.username = res.data.data.username;
      // 记得在前面还要拼接基地址，因为返回的头像路径不完整，要拼接
      // 还要拼接/，不然就连在一起了
      this.avatar = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
    });
  }
};
</script>

<style lang="less">
.my-container {
  height: 100%;

  .my-header {
    // background-color: pink;
    height: 60px;
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;
      height: 100%;

      i {
        font-size: 34px;
        margin-right: 22px;
      }

      img {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }

      span {
        width: 92px;
        height: 22px;
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
      }
    }

    .right {
      height: 100%;
      display: flex;
      align-items: center;

      img {
        width: 43px;
        height: 43px;
        margin-right: 9px;
      }

      span.name {
        font-size: 14px;
        margin-right: 38px;
      }
    }
  }

  // .my-aside {
  // background-color: yellowgreen;
  // }

  .my-main {
    background-color: #0094ff;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>