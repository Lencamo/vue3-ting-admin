<template>
  <div class="nav-aside">
    <div class="logo">
      <img src="@/assets/imgs/title.jpg" alt="" />
      <h3 class="title" v-if="!isCollapse">后台管理系统</h3>
    </div>

    <div class="menu">
      <el-menu
        :default-active="defaultMenuItemShow"
        :collapse-transition="false"
        :collapse="isCollapse"
      >
        <template v-for="item in routeMetas" :key="item.id">
          <el-menu-item :index="item.id + ''" @click="handleMenuItemClick(item)">
            <el-icon>
              <!-- 动态图标组件 -->
              <component :is="item.icon" />
            </el-icon>
            <template #title>
              <span>{{ item.title }}</span>
            </template>
          </el-menu-item>
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
import { mapPathToMenu } from '@/utils/map-path.ts'

// 本地路由meta信息
const routeMetas = loginStore.routeMetas

// 设置页面加载时展开的菜单项
const route = useRoute()
const defaultMenuItemShow = computed(() => {
  const menuItem = mapPathToMenu(route.path, routeMetas)

  return menuItem.id + ''
})

// 路由跳转
const router = useRouter()
const handleMenuItemClick = (item: any) => {
  router.replace(item.url)
}

// aside折叠功能
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
/* .el-menu-item {
  margin-left: 20px;
} */

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
