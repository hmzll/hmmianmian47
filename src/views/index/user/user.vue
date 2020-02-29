<template>
  <div>
    <!-- 顶部卡片 -->
    <el-card class="box-card">
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称" prop="username">
          <el-input class="short" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input class="normal" v-model="formInline.email"></el-input>
        </el-form-item>
    
        <el-form-item label="角色" prop="role_id">
          <el-select class="normal" v-model="formInline.role_id">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearch">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="showAdd">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 下面卡片 -->
    <el-card class="box-card">
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="eid" label="用户名"></el-table-column>
        <el-table-column prop="name" label="电话"></el-table-column>
        <el-table-column prop="username" label="邮箱"></el-table-column>
        <el-table-column prop="username" label="角色"></el-table-column>
        <el-table-column prop="username" label="备注"></el-table-column>
        <el-table-column prop="username" label="状态"></el-table-column>
        
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row)"
            >{{ scope.row.status == 1 ? '禁用' : '启用' }}</el-button>
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


  </div>
</template>

<script>

export default {
  name: "user",

  components: {
   
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
   
  },

  created() {

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