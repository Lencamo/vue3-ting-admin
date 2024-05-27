<template>
  <div class="home">
    <el-container class="home-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <nav-aside :is-collapse="isCollapse"></nav-aside>
      </el-aside>
      <el-container>
        <el-header height="85px">
          <nav-header @collapse-change="handleCollapse"></nav-header>
        </el-header>
        <el-main>
          <main-container></main-container>
        </el-main>
        <el-footer>Copyright ©2023-present vue3-ting-admin</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import navAside from './nav-aside/nav-aside.vue'
import navHeader from './nav-header/nav-header.vue'
import mainContainer from './main-container/main-container.vue'

import { ref } from 'vue'

// aside折叠功能
const isCollapse = ref(false)

const handleCollapse = (payload: boolean) => {
  isCollapse.value = payload
}
</script>

<style lang="scss" scoped>
/* 根据tags-view需求调整 */
:deep(.el-header) {
  padding: 0px;
}

.home {
  height: 100%;

  .home-content {
    height: 100%;

    .el-header {
      background-color: var(--homeHeaderBgColor);
    }
    .el-aside {
      background-color: var(--homeAsideBgColor);

      transition: all 0.2s ease !important;
    }

    .el-main {
      background-color: var(--homeMainBgColor);
    }

    .el-footer {
      /* background-color: var(--homeFooterBgColor); */
      background-color: var(--homeMainBgColor);
      color: #acaeb2;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
