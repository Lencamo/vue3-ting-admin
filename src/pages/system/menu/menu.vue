<template>
  <div class="menu">
    <div class="search-box">
      <menuHeader @query-list="handleQueryList" @reset-list="handleResetList"></menuHeader>
    </div>
    <div class="list-table">
      <div class="list-table">
        <menuBody ref="listTableRef" @edit-click="handleEditClick"></menuBody>
      </div>
    </div>
    <menuDialog ref="menuDialogRef"></menuDialog>
  </div>
</template>

<script setup lang="ts">
import menuHeader from './components/menu-header.vue'
import menuBody from './components/menu-body.vue'
import menuDialog from './components/menu-dialog.vue'

import { ref } from 'vue'
import type { IMenuList } from '@/types/main/system'

const listTableRef = ref<InstanceType<typeof menuBody>>()
const menuDialogRef = ref<InstanceType<typeof menuDialog>>()

// 显示查询结果
const handleQueryList = (payload: any) => {
  // console.log(payload)
  listTableRef.value?.getCurrentMenuList(payload)
}

// 恢复默认列表
const handleResetList = () => {
  listTableRef.value?.getCurrentMenuList()
}

// =======

// 编辑按钮处理
const handleEditClick = (payload: IMenuList) => {
  // console.log(payload)
  menuDialogRef.value?.setMenuDialogVisible(payload)
}
</script>

<style lang="scss" scoped>
.menu {
  //
}
</style>
