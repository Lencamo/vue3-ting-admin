<template>
  <div class="nav-aside">
    <div class="logo">
      <img src="@/assets/imgs/title.jpg" alt="" />
      <h3 class="title" v-if="!isCollapse">权限管理系统</h3>
    </div>

    <div class="menu">
      <el-menu
        :default-active="defaultMenuItemShow"
        :collapse-transition="false"
        :collapse="isCollapse"
      >
        <!-- 一级 -->
        <template v-for="item in userRoleMenu" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <!-- 动态图标组件 -->
                <component :is="item.icon" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <!-- 二级 -->
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.id + ''" @click="handleMenuItemClick(subItem)">
                <span>{{ subItem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import useloginStore from '@/stores/login/login'
const loginStore = useloginStore()
import { useRouter, useRoute } from 'vue-router'
import { firstMenuItem } from '@/utils/map-menus.ts'
import { mapPathToMenu } from '@/utils/map-path.ts'

// 菜单树
const userRoleMenu = loginStore.userRoleMenu

// 设置页面加载时展开的菜单项
// const defaultMenuItemShow = ref(firstMenuItem.id + '')
const route = useRoute()
const defaultMenuItemShow = computed(() => {
  const subItem = mapPathToMenu(route.path, userRoleMenu)

  return subItem.id + ''
})

// aside折叠功能
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})

// 路由跳转
const router = useRouter()
const handleMenuItemClick = (subItem: any) => {
  router.push(subItem.url)
}
</script>

<style lang="scss" scoped>
.el-menu-item {
  margin-left: 20px;
}

.nav-aside {
  .logo {
    display: flex;
    height: 30px;
    padding: 10px 0px 10px 15px;

    background-color: #15181b;
    color: #ffffff;

    img {
      height: 100%;
    }

    .title {
      margin: 0px auto;
      line-height: 30px;
    }
  }
}
</style>
