<template>
  <div class="home">
    <el-container class="home-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <nav-aside :is-collapse="isCollapse"></nav-aside>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <nav-header @collapse-change="handleCollapse"></nav-header>
        </el-header>
        <el-main>
          <main-container></main-container>
        </el-main>
        <el-footer>Footer</el-footer>
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
.home {
  height: 100%;

  .home-content {
    height: 100%;

    .el-header {
      background-color: #cdd2d6;
    }
    .el-aside {
      background-color: #c2c7cc;

      transition: all 0.2s ease !important;
    }

    .el-main {
      background-color: #f5f7fa;
    }

    .el-footer {
      background-color: #e5e6e9;
    }
  }
}
</style>
