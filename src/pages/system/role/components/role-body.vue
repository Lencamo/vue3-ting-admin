<template>
  <div class="role-body">
    <div class="top-box">
      <h3>角色列表</h3>
      <span>
        <el-button type="danger" size="small" plain disabled><s>批量删除</s></el-button>
        <el-button
          type="primary"
          size="small"
          @click="handleAddBtn()"
          v-permissions="{ route, action: 'create' }"
          >新增角色</el-button
        >
      </span>
    </div>
    <div class="center-box">
      <el-table :data="roleList" style="width: 100%" border>
        <el-table-column type="selection" />
        <el-table-column type="index" label="序号" min-width="60" />
        <el-table-column prop="name" label="角色名称" min-width="140" />
        <el-table-column prop="intro" label="角色描述" min-width="120">
          <template #default="scope">
            <el-popover effect="light" trigger="hover" placement="top" min-width="200px">
              <template #default>
                <div>简介：{{ scope.row.intro }}</div>
              </template>
              <template #reference>
                <el-text truncated>{{ scope.row.intro }}</el-text>
              </template>
            </el-popover>
          </template>
        </el-table-column>
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
              icon="Edit"
              @click="handleEditBtn(scope.row)"
              v-permissions="{ route, action: 'update', effect: 'disabled' }"
            />
            <el-popconfirm
              title="你确定执行删除操作吗？"
              @confirm="handleDelectBtn(scope.row.id)"
              width="200px"
            >
              <template #reference>
                <el-button
                  type="danger"
                  size="small"
                  icon="Delete"
                  v-permissions="{ route, action: 'delete', effect: 'disabled' }"
                />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="foot-box">
      <el-pagination
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 30, 40]"
        v-model:current-page="currentPage"
        :total="roleTotalCount"
        layout="sizes, prev, pager, next, jumper, total"
        small
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/stores/main/system'
import { storeToRefs } from 'pinia'
import { utcFormatUtil } from '@/utils/data-format'
import { ref } from 'vue'
import type { IQueryInfo, IRoleList } from '@/types/system'

// 权限操作控制
import { useRoute } from 'vue-router'
const route = useRoute()

// 分页器数据
const systemStore = useSystemStore()
const { roleTotalCount, roleList } = storeToRefs(systemStore)
const currentPage = ref(1)
const pageSize = ref(5)

// 获取role列表数据
const getCurrentRoleList = (payload: IQueryInfo = {}) => {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const queryInfo = { offset, size, ...payload }

  systemStore.getRoleListAction(queryInfo)
}
defineExpose({ getCurrentRoleList })

// 初次进入页面时
getCurrentRoleList()

// 列表的size变化处理
const handleSizeChange = (size: number) => {
  // console.log(size)
  getCurrentRoleList()
}
// 列表的当前页变化处理
const handleCurrentChange = (page: number) => {
  // console.log(page)
  getCurrentRoleList()
}

// 角色删除按钮
const handleDelectBtn = (roleId: number) => {
  // console.log(roleId)
  systemStore.delectRoleAction(roleId)
}

const emit = defineEmits(['addClick', 'editClick'])

// 新增角色按钮
const handleAddBtn = () => {
  emit('addClick')
}
// 编辑角色按钮
const handleEditBtn = (role: IRoleList) => {
  emit('editClick', role)
}

// 增删改请求与分页器
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (name === 'addRoleAction' || name === 'delectRoleAction' || name === 'editRoleAction') {
      currentPage.value = 1
      pageSize.value = 5
    }
  })
})
</script>

<style lang="scss" scoped>
.role-body {
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

  .foot-box {
    margin-top: 18px;

    display: flex;
    justify-content: flex-end;
  }
}
</style>
