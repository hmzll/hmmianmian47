<template>
  <el-dialog center :title=" isAdd ? '新增企业' : '编辑企业' " :visible.sync="dialogFormVisible">
    <el-form ref="form" :rules="rules" :model="form">
      <el-form-item prop="eid" label="企业编号" :label-width="formLabelWidth">
        <el-input v-model="form.eid" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item prop="name" label="企业名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业简称" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业简介" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入接口操作函数
import { businessAdd, businessEdit } from "@/api/business.js";

export default {
  name:"businessDialog",
  data() {
    return {
      // 控制对话框显示或隐藏的属性
      dialogFormVisible: false,
      // 跟表单绑定的对象
      form: {},
      formLabelWidth: "80px",
      rules: {
        eid: [{ required: true, message: "企业编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "企业名称不能为空", trigger: "blur" }]
      },
      // 用来区分是新增还是修改
      // true代表新增，false代表修改
      isAdd: true
    };
  },

  methods: {
    save() {

      //做整个表单验证
      this.$refs.form.validate(v => {
        if (v) {
          if (this.isAdd) {
            businessAdd(this.form).then(res => {
              if (res.data.code == 200) {
                this.$message.success("新增成功！");
                this.dialogFormVisible = false;
                this.$parent.getList();
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else {
            // 调用修改的接口
            businessEdit(this.form).then(res => {
              if (res.data.code == 200) {
                this.$message.success("编辑成功！");
                this.dialogFormVisible = false;
                // 调用父组件的刷新方法
                this.$parent.getList();
              } else {
                this.$messsage.error(res.data.message);
              }
            });
          }
        }
      });
    }
  }
};
</script>

<style>
</style>