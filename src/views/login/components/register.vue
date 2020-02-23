<template>
  <el-dialog title="用户注册" center width="603px" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules">
      <el-form-item label="昵称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
        <el-input show-password v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="图形码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.imgCode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img class="img_code" @click="getNewCode" :src="picCodeUrl" alt />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <!-- 
              倒计时不为0禁用按钮
              倒计时不为0，代表还有倒计时在数，所以按钮就不能被点，不能被点就是要禁用他
            -->
            <el-button
              :disabled="sec != 0"
              @click="getPhoneCode"
            >{{ sec == 0 ? '获取用户验证码' : '还有' + sec + '秒' }}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // 倒计时的秒数
      sec: 0,

      // 图形验证码的接口地址
      picCodeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",

      // 是否显示对话框
      dialogFormVisible: false,

      // 设置文字宽度
      formLabelWidth: "65px",

      // 跟表单元素双向绑定的对象
      form: {
        name: "",
        email: "",
        phone: "",
        password: "",
        imgCode: ""
      },

      // 规则对象
      rules: {
        name: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },

          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "手机号格式错误",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 5, max: 14, message: "长度在5-14之间", trigger: "change" }
        ]
      }
    };
  },

  methods: {
    // 图片的点击事件
    getNewCode() {
      // 浏览器缓存机制
      // 浏览器发现你这次请求，我刚刚才请求过，他就不会真的去发请求，而是会把上次请求得到的结果
      // 再拿出来用
      // 专门用来解决请求缓存的两套方案
      // 1. 随机数（用的少一点）
      // 2. 时间戳（用的多一点）
      // this.picCodeUrl = process.env.VUE_APP_URL +  "/captcha?type=sendsms&sb=" + Math.random()

      // 2.时间戳
      this.picCodeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&sb=" + Date.now();
    },

    // 获取手机验证码的点击事件
    getPhoneCode() {
      this.sec = 60;

      // 写一个每隔一秒触发的计时器
      // 这里一定要传箭头函数
      let timerID = setInterval(() => {
        this.sec--;

        // 如果倒计时为0，就要停止计时器了
        if (this.sec == 0) {
          clearInterval(timerID);
        }
      }, 1000);

      // 发请求获取手机验证码
      // axios如果发跨域请求，默认不会携带cookie
      axios({
        url: process.env.VUE_APP_URL + "/sendsms",
        method: "post",
        data: {
          code: this.form.imgCode,
          phone: this.form.phone
        },
        // 允许携带cookie
        withCredentials:true

      }).then(res => {

        window.console.log(res);

        if(res.data.code == 200){

          // 获取验证码成功
          alert('获取验证码成功，验证码为' + res.data.data.captcha)
          
        }else{

          alert(res.data.message)
        }
      });
    }
  }
};
</script>

<style lang="less">
.el-dialog__header {
  background: linear-gradient(to right, #11bfee, #2491e9);
}

.el-dialog__title {
  color: white;
  font-size: 17px;
}

.img_code {
  width: 100%;
  height: 41px;
  vertical-align: top;
}
</style>