<template>
  <div class="role">
    <div class="search-box">
      <roleHeader @query-list="handleQueryList" @reset-list="handleResetList"></roleHeader>
    </div>
    <div class="list-table">
      <div class="list-table">
        <roleBody
          ref="listTableRef"
          @add-click="handleAddClick"
          @edit-click="handleEditClick"
        ></roleBody>
      </div>
    </div>
    <roleDialog ref="roleDialogRef"></roleDialog>
  </div>
</template>

<script setup lang="ts">
import roleHeader from './components/role-header.vue'
import roleBody from './components/role-body.vue'
import roleDialog from './components/role-dialog.vue'

import { ref } from 'vue'
import type { IRoleList } from '@/types/main/system'

const listTableRef = ref<InstanceType<typeof roleBody>>()
const roleDialogRef = ref<InstanceType<typeof roleDialog>>()

// 显示查询结果
const handleQueryList = (payload: any) => {
  // console.log(payload)
  listTableRef.value?.getCurrentRoleList(payload)
}

// 恢复默认列表
const handleResetList = () => {
  listTableRef.value?.getCurrentRoleList()
}

// =======

const isNew = ref<boolean>(true)

// 新增按钮处理
const handleAddClick = () => {
  isNew.value = true
  roleDialogRef.value?.setRoleDialogVisible(isNew.value)
}
// 编辑按钮处理
const handleEditClick = (payload: IRoleList) => {
  isNew.value = false
  // console.log(payload)
  roleDialogRef.value?.setRoleDialogVisible(isNew.value, payload)
}
</script>

<style lang="scss" scoped>
.role {
  //
}
</style>
