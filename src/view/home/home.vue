<template>
  <div class="home">
    <el-container class="home-content">
      <el-aside width="210px">
        <nav-aside></nav-aside>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <nav-header></nav-header>
        </el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import navAside from '@/components/nav-aside/nav-aside.vue'
import navHeader from '@/components/nav-header/nav-header.vue'
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
