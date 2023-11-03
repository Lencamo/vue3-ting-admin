<template>
  <div class="nav-header">
    <div class="left">
      <div class="exchange" @click="handleMenuIconClick">
        <el-icon size="25" color="#323435">
          <component :is="isCollapse ? 'Expand' : 'Fold'"></component>
        </el-icon>
      </div>
      <div class="bread">
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">系统总览</el-breadcrumb-item>
          <el-breadcrumb-item>核心技术</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="right">
      <el-dropdown>
        <div class="drop">
          <img src="@/assets/imgs/default.png" alt="" />
          <span>admin &ensp;</span>
          <el-icon><arrow-down /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item divided>
              <el-button type="primary" size="default" @click="handleLogoutBtn">退出系统</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { ref } from 'vue'

import { LOGIN_TOKEN, LOGIN_USER_INFO, LOGIN_ROLE_MENU } from '@/config/constants.ts'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogoutBtn = () => {
  // 1、清除部分storage缓存
  // 删除token
  localCache.removeCache(LOGIN_TOKEN)
  // 删除用户的角色、权限信息
  localCache.removeCache(LOGIN_USER_INFO)
  localCache.removeCache(LOGIN_ROLE_MENU)

  // 2、页面跳转
  router.push('/login')
}

// aside折叠功能
const isCollapse = ref(false)

const emit = defineEmits(['collapseChange'])

const handleMenuIconClick = () => {
  isCollapse.value = !isCollapse.value

  emit('collapseChange', isCollapse.value)
}
</script>

<style lang="scss" scoped>
.nav-header {
  height: 100%;
  display: flex;
  justify-content: space-between;

  .left {
    display: flex;
    align-items: center;
    height: 100%;

    .bread {
      margin-left: 10px;
    }
  }

  .right {
    cursor: pointer;
  }

  .right {
    display: flex;
    align-items: center;
    height: 100%;

    .el-dropdown {
      height: 100%;
      .drop {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0px 10px;

        img {
          height: 60%;
          margin: 0px 10px 0px 0px;
        }
      }
    }
  }
}
</style>
