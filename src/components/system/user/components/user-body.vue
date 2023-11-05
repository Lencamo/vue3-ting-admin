<template>
  <div class="user-body">
    <div class="top-box">
      <h3>用户列表</h3>
      <el-button type="primary" size="small">新增用户</el-button>
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
          <template #default>
            <el-button type="warning" size="small" icon="Edit" />
            <el-button type="danger" size="small" icon="Delete" />
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
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/stores/main/system'
import { storeToRefs } from 'pinia'
import { utcFormatUtil } from '@/utils/data-format'
import { ref } from 'vue'

// 获取user列表数据
const systemStore = useSystemStore()
systemStore.getUserListAction()
const { userList } = storeToRefs(systemStore)

// 分页器数据
const { userTotalCount } = storeToRefs(systemStore)
const currentPage = ref(1)
const pageSize = ref(5)
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
