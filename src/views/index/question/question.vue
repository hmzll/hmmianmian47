<template>
  <!-- 根标签 -->
  <div class="question-wrap">
    <!-- 顶部卡片 -->
    <el-card>
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科" prop="subject">
          <subjectSelect :isSearch="true" v-model="formInline.subject"></subjectSelect>
          <!-- <subjectSelect :isSearch="true" :value="formInline.subject" @input="formInline.subject = 子组件传过来的值"></subjectSelect> -->
        </el-form-item>

        <el-form-item label="阶段" prop="step">
          <el-select v-model="formInline.step" placeholder="请选择阶段">
            <el-option value label="所有阶段"></el-option>
            <el-option label="初级" value="1"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="企业" prop="enterprise">
          <businessSelect :isSearch="true" v-model="formInline.enterprise" />
        </el-form-item>

        <el-form-item label="题型" prop="type">
          <el-select v-model="formInline.type" placeholder="请选择题型">
            <el-option label="单选" value="1"></el-option>
            <el-option label="多选" value="2"></el-option>
            <el-option label="简答" value="3"></el-option>
          </el-select>
        </el-form-item>

        <br />

        <el-form-item label="难度" prop="difficulty">
          <el-select v-model="formInline.difficulty" placeholder="请选择难度">
            <el-option label="简单" value="1"></el-option>
            <el-option label="一般" value="2"></el-option>
            <el-option label="困难" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="作者" prop="username">
          <el-input v-model="formInline.username"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期" prop="create_date">
          <el-date-picker v-model="formInline.create_date" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>

        <br />

        <el-form-item label="标题" class="title-item" prop="title">
          <el-input v-model="formInline.title"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getList()">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="$refs.questionAdd.dialogFormVisible = true"
          >新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 底部卡片 -->
    <el-card class="bottom-card">
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="title" label="题目"></el-table-column>
        <el-table-column prop="name" label="学科·阶段">
          <template slot-scope="scope">
            <!-- 用过滤器来做 -->
            {{ scope.row | formatSubjectStep }}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="题型">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">单选</span>
            <span v-else-if="scope.row.type == 2">多选</span>
            <span v-else>简答</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">{{ scope.row.status == 1 ? '启用' : '禁用' }}</template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
        <el-table-column label="操作" width="135">
          <template slot-scope="scope">
            <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row)"
            >{{ scope.row.status == 1 ? "禁用" : "启用"}}</el-button>
            <el-button type="text" @click="doDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="my-pagination"
        background
        :current-page="page"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @current-change="pageChange"
        @size-change="sizeChange"
      ></el-pagination>
    </el-card>

    <question-add ref="questionAdd" />
    <question-edit ref="questionEdit" />
  </div>
</template>

<script>
import {
  questionList,
  questionStatus,
  questionRemove
} from "@/api/question.js";
// 导入新增的对话框
import questionAdd from "./components/questionAdd.vue";
// 导入编辑的对话框
import questionEdit from "./components/questionEdit.vue";

export default {
  name: "question",
  components: {
    questionAdd,
    questionEdit
  },
  data() {
    return {
      formInline: {},
      subjectList: [],
      businessList: [],
      //表格绑定的数据源
      tableData: [],
      page: 1,
      size: 5,
      total: 0
    };
  },

  methods: {
    // 删除的点击事件
    doDel(item) {
      //弹出确认框
      this.$confirm("请问是否要删除这行数据？")
        .then(() => {
          questionRemove({
            id: item.id
          }).then(res => {
            if (res.data.code == 200) {
              this.$message.success("删除成功！");
              this.getList();
            }
          });
        })
        .catch(() => {
          this.$message("乖孩子！不删库跑路");
        });
    },

    // 修改状态点击事件
    changeStatus(item) {
      questionStatus({
        id: item.id
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("修改状态成功！");
          this.getList();
        }
      });
    },

    clear() {
      // 重置表单
      this.$refs.formInline.resetFields();
      // 重新加载数据
      this.getList();
    },

    // 页容量的改变事件
    sizeChange(size) {
      this.size = size;
      this.page = 1;
      this.getList();
    },

    // 页码改变事件
    pageChange(page) {
      this.page = page;
      this.getList();
    },

    // 编辑的点击事件
    showEdit(item) {
      //拿到被点击的这行的数据
      //赋值给编辑对话框里的form属性
      this.$refs.questionEdit.form = { ...item };

      // 在这里把city从字符串转成数组
      this.$refs.questionEdit.form.city = this.$refs.questionEdit.form.city.split(
        ","
      );
      this.$refs.questionEdit.form.multiple_select_answer = this.$refs.questionEdit.form.multiple_select_answer.split(
        ","
      );

      //显示出对话框
      this.$refs.questionEdit.dialogFormVisible = true;
    },
    getList() {
      // 获取题目列表
      questionList({
        page: this.page,
        limit: this.size,
        ...this.formInline
      }).then(res => {
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    }
  },

  created() {
    this.getList();
  },

  filters: {
    formatSubjectStep(val) {
      //我要拿到学科名字 val.subject_name
      //我要拿到阶段对应的名字，那么就应该写if判断了
      let stepName = "";
      if (val.step == 1) {
        stepName = "初级";
      } else if (val.step == 2) {
        stepName = "中级";
      } else {
        stepName = "高级";
      }

      return val.subject_name + " · " + stepName;
    }
  }
};
</script>

<style lang="less">
.question-wrap {
  /* 找到除了最后一个el-form-item下面的所有 el-form-item__content
    el-form-item代表的是每一项（代表除了最后一项以外的其他项里所有内容为宽150）
 */
  .el-form--inline {
    .el-form-item:not(:last-child) .el-form-item__content {
      width: 150px;
    }

    /* 找到标题那一栏里面的内容，设置他的内容为宽度388 */
    .el-form-item.title-item .el-form-item__content {
      width: 388px;
    }

    //   设置日期选择器
    .el-form-item .el-form-item__content .el-date-editor {
      width: 150px;
    }

    /* 设置每个表单元素前面文字的左右内间距 */
    .el-form-item__label {
      padding-right: 31px;
      padding-left: 30px;
    }
  }

  /* 设置卡片的内间距 */
  .el-card__body {
    padding-left: 0;
  }

  .bottom-card {
    margin-top: 21px;
  }

  .my-pagination {
    text-align: center;
    margin-top: 31px;
  }
}
</style>