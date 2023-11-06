<template>
  <div class="user">
    <div class="search-box">
      <userHeader @query-list="handleQueryList" @reset-list="handleResetList"></userHeader>
    </div>
    <div class="list-table">
      <userBody ref="listTableRef" @add-click="handleAddClick"></userBody>
    </div>
    <userDialog ref="userDialogRef"></userDialog>
  </div>
</template>

<script setup lang="ts">
import userHeader from './components/user-header.vue'
import userBody from './components/user-body.vue'
import userDialog from './components/user-dialog.vue'

import { ref } from 'vue'
import type { IQueryInfo } from '@/types/main/system'

const listTableRef = ref<InstanceType<typeof userBody>>()
const userDialogRef = ref<InstanceType<typeof userDialog>>()

// 显示查询结果
const handleQueryList = (payload: IQueryInfo) => {
  // console.log(payload)
  listTableRef.value?.getCurrentUserList(payload)
}

// 恢复默认列表
const handleResetList = () => {
  listTableRef.value?.getCurrentUserList()
}

// 新增按钮处理
const handleAddClick = () => {
  userDialogRef.value?.setUserDialogVisible()
}
</script>

<style lang="scss" scoped>
.user {
  //
}
</style>
