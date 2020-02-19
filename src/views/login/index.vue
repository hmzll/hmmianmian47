<template>
  <div class="login-wrap">
    <div class="login-box"></div>
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
    background: rgba(245, 245, 245, 1);
  }
}
</style>