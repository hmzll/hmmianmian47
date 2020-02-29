<template>
  <div>
    <!-- 顶部卡片 -->
    <el-card class="box-card">
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号" prop="eid">
          <el-input class="short" v-model="formInline.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input class="normal" v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="short" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select class="normal" v-model="formInline.status">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearch">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="showAdd">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 下面卡片 -->
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">
            <!-- 把创建日期用全局过滤器过滤显示 -->
            {{ scope.row.create_time | formatTime }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else style="color:red;">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="changeStatus(scope.row)">
              {{ scope.row.status == 1 ? '禁用' : '启用' }}
            </el-button>
            <el-button type="text" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        @size-change="sizeChanged"
        @current-change="pageChange"
        :current-page="page"
        :page-sizes="[ 5, 10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- <business-add ref='businessAdd'></business-add>
    <business-edit ref='businessEdit'></business-edit>-->

    <business-dialog ref="businessDialog"></business-dialog>
  </div>
</template>

<script>
import { businessList, businessRemove,businessStatus } from "@/api/business.js";
// import businessAdd from './components/businessAdd.vue'
// import businessEdit from './components/businessEdit.vue'

import businessDialog from "./components/businessDialog.vue";

export default {
  name: "business",

  components: {
    // businessAdd,
    // businessEdit
    businessDialog
  },

  data() {
    return {
      formInline: {},
      tableData: [],
      page: 1,
      size: 5,
      total: 0,
      oldItem: null
    };
  },

  methods: {

    changeStatus(item){

      businessStatus({
        id:item.id
      }).then(res => {

        if(res.data.code == 200){

          this.$message.success('状态修改成功')
          this.getList();
        }else{

          this.$message.error(res.data.message);
        }
      })
    },
    remove(item) {
      businessRemove({
        id: item.id
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("删除成功");

          if(this.tableData.length == 1 ){
            // 如果只有最后一条就刷新上一页
            this.page--;
          }

          if(this.page < 1){
            this.page = 1;
          }

          this.getList();

        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    sizeChanged(size) {
      this.size = size;
      this.page = 1;
      this.getList();
    },

    pageChange(page) {
      this.page = page;
      this.getList();
    },

    clear() {
      //表单的重置方法
      this.$refs.formInline.resetFields();
      // 在加载以前把页码改成1
      this.page = 1;
      // 重新加载数据
      this.getList();
    },

    doSearch() {
      this.page = 1;
      // 刷新数据
      this.getList();
    },

    showAdd() {
      this.$refs.businessDialog.dialogFormVisible = true;

      // 标记为新增状态
      this.$refs.businessDialog.isAdd = true;

      // 清空表单里的数据
      this.$refs.businessDialog.form = {};
    },

    showEdit(item) {
      //先显示
      this.$refs.businessDialog.dialogFormVisible = true;
      //把是否添加的状态改为false
      this.$refs.businessDialog.isAdd = false;

      if (item != this.oldItem) {
        this.$refs.businessDialog.form = { ...item };
        this.oldItem = item;
      }
    },

    // 获取数据的方法
    getList() {
      businessList({
        page: this.page,
        limit: this.size,
        ...this.formInline
      }).then(res => {
        // console.log(res);
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    }
  },

  created() {
    this.getList();
  }
};
</script>

<style>
.box-card {
  margin-bottom: 19px;
}
.short {
  width: 90px;
}

.normal {
  width: 139px;
}
</style>