<template>
  <div class="nav-header">
    <div class="header">
      <div class="left">
        <div class="exchange" @click="handleMenuIconClick">
          <el-icon size="25" color="#323435">
            <component :is="isCollapse ? 'Expand' : 'Fold'"></component>
          </el-icon>
        </div>
        <div class="bread">
          <el-breadcrumb :separator-icon="ArrowRight">
            <template v-for="item in breadcrumb" :key="item.path">
              <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
            </template>
          </el-breadcrumb>
        </div>
      </div>
      <div class="right">
        <span><screen-full></screen-full></span>
        <span><toggle-dark></toggle-dark></span>
        <span>
          <el-dropdown>
            <div class="drop">
              <img :src="avatars" alt="" />
              <p>TingAdmin &ensp;</p>
              <el-icon><arrow-down /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item divided @click="handleLogoutBtn"> 退出系统 </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </span>
      </div>
    </div>
    <div class="tabs">
      <tags-view></tags-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { ref, computed } from 'vue'
import avatars from '@/assets/imgs/default.png'

import { LOGIN_TOKEN, LOGIN_USER_INFO, LOGIN_ROLE_MENU } from '@/config/constants.ts'
import { localCache } from '@/utils/cache'
import { useRouter, useRoute } from 'vue-router'
import { mapPathToBreadcrumbs } from '@/utils/map-path'
import useloginStore from '@/stores/login/login'

const router = useRouter()

// 面包屑部分
const route = useRoute()
const loginStore = useloginStore()
const breadcrumb = computed(() => {
  return mapPathToBreadcrumbs(route.path, loginStore.userRoleMenu)
})

// 退出登录
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
/* drop下拉框border问题修复 */
:focus-visible {
  outline: none !important;
}

.nav-header {
  height: 100%;

  .header {
    display: flex;
    justify-content: space-between;

    height: 50px;
    padding: 0px 20px;

    .left {
      display: flex;
      align-items: center;
      height: 100%;

      .bread {
        margin-left: 10px;
      }
    }

    .right {
      display: flex;
      align-items: center;
      height: 100%;

      span {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0px 10px;
        cursor: pointer;

        .drop {
          display: flex;
          align-items: center;

          img {
            height: 25px;
            width: 25px;
            border-radius: 50%;
            margin-right: 10px;
          }
        }
      }
    }
  }

  .tabs {
    background-color: var(--mainBoxBgColor);

    height: 35px;
    width: 100%;
    /* padding: 0px 20px; */
  }
}
</style>
