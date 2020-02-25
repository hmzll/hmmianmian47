<template>
  <div class="login-wrap">
    <!-- 左侧登录的盒子 -->
    <div class="login-box">
      <!-- 标题盒子 -->
      <div class="title-box">
        <!-- logo -->
        <img class="logo" src="./images/login_logo.png" alt />
        <span class="left-title">黑马面面</span>
        <!-- 竖线 -->
        <span class="line"></span>
        <span class="right-title">用户登录</span>
      </div>

      <!-- 表单 -->
      <el-form ref="loginForm" :model="form" label-width="43px" :rules="rules">
        <el-form-item prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" prefix-icon="el-icon-user"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            show-password
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-row>
            <!-- 第一列。放的是输入框 -->
            <el-col :span="17">
              <el-input v-model="form.code" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="7">
              <img @click="changeImgCode" class="code" :src="imgUrl" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop="agree">
          <div class="agree-box" style="display:flex;align-items:center;">
            <el-checkbox v-model="form.agree" class="agree"></el-checkbox>
            <span>
              我已阅读并同意
              <el-link type="primary">用户协议</el-link>和
              <el-link type="primary">隐私条款</el-link>
            </span>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button class="box-btn" type="primary" @click="doLogin">登录</el-button>
          <el-button class="box-btn" type="primary" @click="showReg">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧图片 -->
    <img src="./images/login_banner_ele.png" alt />

    <!-- 注册对话框 -->
    <reg ref="reg"></reg>
  </div>
</template>

<script>
// 1.导入组件
import reg from "./components/register.vue";
import { login } from '@/api/login.js'
import { setToken } from '@/utilis/token.js'

// 2.注册组件

// 3.在需要用组件的地方，写这个组件的标签
export default {
  components: {
    reg
  },
  data() {
    return {
      // 图片地址
      imgUrl: process.env.VUE_APP_URL + "/captcha?type=login",

      // 跟表单双向绑定的数据
      form: {
        phone: "18511111111",
        password: "12345678",
        code: "",
        agree: true
      },
      // 规则对象
      rules: {
        // 真正的规则
        phone: [{ required: true, message: "手机号不能为空", trigger: "blur" }],

        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],

        code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],

        agree: [
          // 多选框没有失去焦点，只有值改变事件
          // 因为checkbox其实他不可能值为空，除非你强行赋值为空
          // 所以我们不能拿值是否为空来做验证了
          // { required:true, message:'必须勾选同意用户协议',trigger:"change"},

          // 只有值为true才满足条件，否则代表不匹配
          {
            pattern: /true/,
            message: "必须勾选同意用户协议",
            trigger: "change"
          }
        ]
      }
    };
  },

  methods: {
    // 点击图片切换验证码的点击事件
    changeImgCode() {
      this.imgUrl = process.env.VUE_APP_URL + "/captcha?type=login&sb=" + Date.now();
    },

    // 登录的点击事件
    doLogin() {
      // 找到表单对象，调用validate方法
      this.$refs.loginForm.validate(v => {
        if (v) {
         
          // 正儿八经发请求比较合理
          login({
            phone: this.form.phone,
            password:this.form.password,
            code: this.form.code
          })
          .then( res => {

            if(res.data.code == 200){

              //把token存起来
              // window.localStorage.setItem('token',res.data.data.token)
              setToken(res.data.data.token)
              this.$message.success('登录成功')
              this.$router.push('/index');
            }else{

              this.$message.error(res.data.message)
            }
            
          })
        }
      });
    },

    // 注册的点击事件
    showReg() {
      this.$refs.reg.dialogFormVisible = true;
    }
  }
};
</script>

<style lang="less">
.login-wrap {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );

  /* 给谁加flex，就代表他的子元素使用弹性布局 */
  display: flex;
  /* 主轴排列为space-around */
  justify-content: space-around;
  /* 副轴为：center */
  align-items: center;

  .login-box {
    width: 478px;
    height: 550px;
    padding-right: 41px;
    // 把内间距内聚（默认是外扩）
    box-sizing: border-box;
    background: rgba(245, 245, 245, 1);

    .title-box {
      display: flex;
      // 副轴居中
      align-items: center;
      margin-top: 50px;
      margin-left: 48px;
      margin-bottom: 43px;

      .logo {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }

      .left-title {
        margin-right: 14px;
        font-size: 22px;
      }

      .line {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }

      .right-title {
        font-size: 21px;
      }
    }

    .code {
      width: 100%;
      height: 42px;
      vertical-align: top;
    }

    // 可加可不加看自己习惯
    .agree {
      display: flex;

      .el-checkbox__label {
        display: flex;
        align-items: center;
      }
    }

    .box-btn {
      width: 100%;

      &:nth-child(2) {
        margin-left: 0;
        margin-top: 26px;
      }
    }
  }
}
</style>