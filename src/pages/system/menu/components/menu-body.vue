<template>
  <div class="menu-body">
    <div class="top-box">
      <h3>菜单列表</h3>
    </div>
    <div class="center-box">
      <el-table :data="menuList" row-key="id" :expand-row-keys="expandKeys" style="width: 100%">
        <el-table-column prop="name" label="菜单名称" min-width="140" />
        <el-table-column prop="icon" label="菜单图标" min-width="80">
          <template #default="scope">
            <el-icon size="16" color="#323435">
              <svgIcon :icon="scope.row.icon"></svgIcon>
            </el-icon>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="type" label="层级" width="80" /> -->
        <el-table-column prop="sort" label="相对位置" min-width="80" />
        <el-table-column prop="url" label="组件路径" min-width="210" />
        <el-table-column prop="permission" label="权限" min-width="210" />
        <el-table-column prop="createAt" label="创建时间" min-width="180">
          <template #default="scope">
            {{ utcFormatUtil(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="updateAt" label="更新时间" min-width="180">
          <template #default="scope">
            {{ utcFormatUtil(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="120" align="center">
          <template #default="scope">
            <el-button
              type="warning"
              size="small"
              :icon="Edit"
              @click="handleEditBtn(scope.row)"
              v-permissions="{ route, action: 'update', effect: 'disabled' }"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useSystemStore from '@/stores/main/system'
import { storeToRefs } from 'pinia'
import { utcFormatUtil } from '@/utils/data-format'
import type { IMenuList } from '@/types/system'
import { Edit } from '@element-plus/icons-vue'

// 权限操作控制
import { useRoute } from 'vue-router'
const route = useRoute()

// 获取Menu列表数据
const systemStore = useSystemStore()
const { menuTotalCount, menuList } = storeToRefs(systemStore)

const getCurrentMenuList = (payload?: any) => {
  const queryInfo = payload
  systemStore.getMenuListAction(queryInfo)
}
defineExpose({ getCurrentMenuList })

// 初次进入页面时
getCurrentMenuList()

// 设置table默认展开一级行
const expandKeys = computed(() => {
  return menuList.value.map((item: any) => {
    return item.id + ''
  })
})

const emit = defineEmits(['editClick'])

// 编辑菜单按钮
const handleEditBtn = (menu: IMenuList) => {
  emit('editClick', menu)
}
</script>

<style lang="scss" scoped>
.menu-body {
  background: var(--mainBoxBgColor);
  padding: 18px;

  margin-top: 20px;

  .top-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .center-box {
    margin-top: 18px;
  }
}
</style>
@/types/system
