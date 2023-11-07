<template>
  <div class="user-body">
    <div class="top-box">
      <h3>用户列表</h3>
      <span>
        <el-button type="danger" size="small" plain disabled><s>批量删除</s></el-button>
        <el-button type="primary" size="small" @click="handleAddBtn()">新增用户</el-button>
      </span>
    </div>
    <div class="center-box">
      <el-table :data="userList" style="width: 100%" border>
        <el-table-column type="selection" />
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="name" label="用户名" width="120" />
        <el-table-column prop="realname" label="真实姓名" width="120" />
        <el-table-column prop="cellphone" label="手机号码" width="120" />
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
    <div class="foot-box">
      <el-pagination
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 30, 40]"
        v-model:current-page="currentPage"
        :total="userTotalCount"
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
import type { IQueryInfo, IUserList } from '@/types/main/system'

// 分页器数据
const systemStore = useSystemStore()
const { userTotalCount, userList } = storeToRefs(systemStore)
const currentPage = ref(1)
const pageSize = ref(5)

// 获取user列表数据
const getCurrentUserList = (payload: IQueryInfo = {}) => {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const queryInfo = { offset, size, ...payload }

  systemStore.getUserListAction(queryInfo)
}
defineExpose({ getCurrentUserList })

// 初次进入页面时
getCurrentUserList()

// 列表的size变化处理
const handleSizeChange = (size: number) => {
  // console.log(size)
  getCurrentUserList()
}
// 列表的当前页变化处理
const handleCurrentChange = (page: number) => {
  // console.log(page)
  getCurrentUserList()
}

// 用户删除按钮
const handleDelectBtn = (userId: number) => {
  // console.log(userId)
  systemStore.delectUserAction(userId)

  // 更新列表（不跳转算了，自动变化）
  // currentPage.value = 1
  // pageSize.value = 5
  // getCurrentUserList()
}

const emit = defineEmits(['addClick', 'editClick'])

// 新增用户按钮
const handleAddBtn = () => {
  emit('addClick')
}
// 编辑用户按钮
const handleEditBtn = (user: IUserList) => {
  emit('editClick', user)
}
</script>

<style lang="scss" scoped>
.user-body {
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