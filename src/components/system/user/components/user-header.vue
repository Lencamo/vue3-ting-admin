<template>
  <div class="user-header">
    <el-form label-position="right" label-width="70px" :model="searchForm" ref="searchFormRef">
      <el-row :gutter="40">
        <el-col :sm="12" :md="8" :lg="6">
          <el-form-item label="用户名" prop="name">
            <el-input placeholder="请输入用户名" v-model="searchForm.name" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="6">
          <el-form-item label="真实姓名" prop="realname">
            <el-input placeholder="请输入真实姓名" v-model="searchForm.realname" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="6">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input placeholder="请输入手机号码" v-model="searchForm.cellphone" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="6">
          <el-form-item label="状态" prop="enable">
            <el-select placeholder="请选择状态" v-model="searchForm.enable">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="6">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              type="daterange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              v-model="searchForm.createAt"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn-box">
      <el-button type="primary" icon="Search">查询</el-button>
      <el-button icon="Refresh" @click="resetForm(searchFormRef)">重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: ''
})

// 重置按钮
const searchFormRef = ref<FormInstance>()
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.user-header {
  background: #ffffff;
  padding: 18px;

  .btn-box {
    text-align: right;
  }
}
</style>
