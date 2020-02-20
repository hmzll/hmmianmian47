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
      <el-form label-width="43px">
        <el-form-item>
          <el-input placeholder="请输入手机号" prefix-icon="el-icon-user"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input placeholder="请输入密码" show-password prefix-icon="el-icon-lock"></el-input>
        </el-form-item>

        <el-form-item>
          <el-row>
            <!-- 第一列。放的是输入框 -->
            <el-col :span="17">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="7">
              <img class="code" src="./images/login_code.png" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-checkbox class="agree" v-model="checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button class="box-btn" type="primary">登录</el-button>
          <el-button class="box-btn" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧图片 -->
    <img src="./images/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {};
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
    }

    // 可加可不加看自己习惯
    .agree {
      display: flex;

      .el-checkbox__label {
        display: flex;
        align-items: center;
      }
    }

    .box-btn{
      width: 100%;

      &:nth-child(2){

        margin-left: 0;
        margin-top: 26px;
      }
    }
  }
}
</style>