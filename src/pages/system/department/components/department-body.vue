<template>
  <div class="department-body">
    <div class="top-box">
      <h3>部门列表</h3>
      <span>
        <el-button type="primary" size="small" @click="handleAddBtn()">新增部门</el-button>
      </span>
    </div>
    <div class="center-box">
      <el-table :data="departmentList" row-key="id" default-expand-all style="width: 100%">
        <el-table-column prop="name" label="部门名称" width="200" />
        <el-table-column prop="leader" label="部门领导" width="120" />
        <el-table-column prop="parentId" label="上级部门" width="120" />
        <el-table-column prop="enable" label="状态" width="80">
          <template #default="scope">
            <el-button :type="scope.row.enable ? 'success' : 'info'" plain size="small">
              {{ scope.row.enable ? '开启' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="createAt" label="创建时间" width="180">
          <template #default="scope">
            {{ utcFormatUtil(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="updateAt" label="更新时间" width="180">
          <template #default="scope">
            {{ utcFormatUtil(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="120">
          <template #default="scope">
            <el-button type="warning" size="small" icon="Edit" @click="handleEditBtn(scope.row)" />
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="handleDelectBtn(scope.row.id)"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/stores/main/system'
import { storeToRefs } from 'pinia'
import { utcFormatUtil } from '@/utils/data-format'
import type { IDepartmentList } from '@/types/main/system'

// 获取department列表数据
const systemStore = useSystemStore()
const { departmentTotalCount, departmentList } = storeToRefs(systemStore)

const getCurrentDepartmentList = (payload: any = {}) => {
  const queryInfo = { ...payload }

  systemStore.getDepartmentListAction(queryInfo)
}
defineExpose({ getCurrentDepartmentList })

// 初次进入页面时
getCurrentDepartmentList()

// 部门删除按钮
const handleDelectBtn = (departmentId: number) => {
  // console.log(departmentId)
  systemStore.delectDepartmentAction(departmentId)
}

const emit = defineEmits(['addClick', 'editClick'])

// 新增部门按钮
const handleAddBtn = () => {
  emit('addClick')
}
// 编辑部门按钮
const handleEditBtn = (department: IDepartmentList) => {
  emit('editClick', department)
}
</script>

<style lang="scss" scoped>
.department-body {
  background: #ffffff;
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
