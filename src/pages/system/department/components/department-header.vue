<template>
  <div class="department-header">
    <el-form label-position="right" label-width="70px" :model="searchForm" ref="searchFormRef">
      <el-row :gutter="40">
        <el-col :sm="12" :md="8" :lg="6">
          <el-form-item label="部门名称" prop="name">
            <el-input placeholder="请输入部门名称" v-model="searchForm.name" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="6">
          <el-form-item label="部门领导" prop="leader">
            <el-input placeholder="请输入部门领导" v-model="searchForm.leader" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn-box">
      <el-button type="primary" :icon="Search" @click="conditionSearch">查询</el-button>
      <el-button :icon="Refresh" @click="resetForm(searchFormRef)">重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { Search, Refresh } from '@element-plus/icons-vue'

const searchForm = reactive({
  name: '',
  leader: ''
})

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
  emit('queryList', searchForm)
}
</script>

<style lang="scss" scoped>
.department-header {
  background: var(--mainBoxBgColor);
  padding: 18px;

  .btn-box {
    text-align: right;
  }
}
</style>
