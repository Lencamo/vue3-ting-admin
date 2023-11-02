<template>
  <div class="home">
    <h2>home</h2>
    <el-button type="primary" size="default" @click="handleLogoutBtn">退出系统</el-button>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/config/constants'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogoutBtn = () => {
  // 1、删除token
  localCache.removeCache(LOGIN_TOKEN)

  // 2、页面跳转
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.home {
  //
}
</style>
