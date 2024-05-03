<template>
  <div class="department">
    <div class="search-box" v-permissions="{ route, action: 'query' }">
      <departmentHeader
        @query-list="handleQueryList"
        @reset-list="handleResetList"
      ></departmentHeader>
    </div>
    <div class="list-table">
      <departmentBody
        ref="listTableRef"
        @add-click="handleAddClick"
        @edit-click="handleEditClick"
      ></departmentBody>
    </div>
    <departmentDialog ref="departmentDialogRef"></departmentDialog>
  </div>
</template>

<script setup lang="ts">
import departmentHeader from './components/department-header.vue'
import departmentBody from './components/department-body.vue'
import departmentDialog from './components/department-dialog.vue'

// 权限操作控制
import { useRoute } from 'vue-router'
const route = useRoute()

import { ref } from 'vue'
import type { IDepartmentList } from '@/types/main/system'

const listTableRef = ref<InstanceType<typeof departmentBody>>()
const departmentDialogRef = ref<InstanceType<typeof departmentDialog>>()

// 显示查询结果
const handleQueryList = (payload: any) => {
  // console.log(payload)
  listTableRef.value?.getCurrentDepartmentList(payload)
}

// 恢复默认列表
const handleResetList = () => {
  listTableRef.value?.getCurrentDepartmentList()
}

// =======

const isNew = ref<boolean>(true)

// 新增按钮处理
const handleAddClick = () => {
  isNew.value = true

  departmentDialogRef.value?.setDepartmentDialogVisible(isNew.value)
}
// 编辑按钮处理
const handleEditClick = (payload: IDepartmentList) => {
  isNew.value = false
  // console.log(payload)
  departmentDialogRef.value?.setDepartmentDialogVisible(isNew.value, payload)
}
</script>

<style lang="scss" scoped>
.department {
  //
}
</style>
