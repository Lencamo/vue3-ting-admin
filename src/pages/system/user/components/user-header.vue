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
        <el-col :sm="12" :md="8" :lg="6">
          <el-form-item label="部门归属" prop="departmentId">
            <el-tree-select
              placeholder="请选择用户所属部门"
              v-model="searchForm.departmentId"
              :data="globalDepartmentList"
              :props="{ children: 'children', label: 'name', value: 'id' }"
              check-strictly
            />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="6">
          <el-form-item label="用户角色" prop="departmentId">
            <el-select placeholder="请选择用户的角色" v-model="searchForm.roleId">
              <template v-for="department in globalRoleList" :key="department.id">
                <el-option :label="department.name" :value="department.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn-box">
      <el-button type="primary" icon="Search" @click="conditionSearch">查询</el-button>
      <el-button icon="Refresh" @click="resetForm(searchFormRef)">重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import useMainStore from '@/stores/main/entires/main'
import { storeToRefs } from 'pinia'

const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: '',
  createAt: '',
  departmentId: '',
  roleId: ''
})

// 部门、角色列表数据
const mainStore = useMainStore()
const { globalDepartmentList, globalRoleList } = storeToRefs(mainStore)

// 自定义事件
const emit = defineEmits(['resetList', 'queryList'])

// 重置按钮
const searchFormRef = ref<FormInstance>()
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()

  // 更新列表
  emit('resetList')
}

// 查询按钮
const conditionSearch = () => {
  // console.log(searchForm)
  emit('queryList', searchForm)
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
