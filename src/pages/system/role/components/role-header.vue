<template>
  <div class="role-header">
    <el-form label-position="right" label-width="70px" :model="searchForm" ref="searchFormRef">
      <el-row :gutter="40">
        <el-col :sm="12" :md="8" :lg="6">
          <el-form-item label="角色名称" prop="name">
            <el-input placeholder="请输入角色名称" v-model="searchForm.name" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="6">
          <div class="btn-box">
            <el-button type="primary" icon="Search" @click="conditionSearch">查询</el-button>
            <el-button icon="Refresh" @click="resetForm(searchFormRef)">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

const searchForm = reactive({
  name: ''
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
.role-header {
  background: var(--mainBoxBgColor);
  padding: 18px;

  .btn-box {
    text-align: right;
  }
}
</style>
