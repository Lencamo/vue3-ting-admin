<template>
  <div class="nav-aside">
    <div class="logo">
      <img src="@/assets/imgs/title.jpg" alt="" />
      <h3 class="title">权限管理系统</h3>
    </div>

    <div class="memu">
      <el-menu>
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
              <el-menu-item :index="subItem.id + ''">
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
import useloginStore from '@/stores/login/login'
const loginStore = useloginStore()

// 菜单树
const userRoleMenu = loginStore.userRoleMenu
</script>

<style lang="scss" scoped>
.el-menu-item {
  margin-left: 20px;
}

.nav-aside {
  .logo {
    display: flex;
    height: 30px;
    padding: 10px 0px 10px 25px;

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
