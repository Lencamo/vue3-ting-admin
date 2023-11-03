<template>
  <div class="nav-aside">
    <div class="logo">
      <img src="@/assets/imgs/title.jpg" alt="" />
      <h3 class="title">权限管理系统</h3>
    </div>

    <div class="memu">
      <el-menu>
        <!-- 1 -->
        <el-sub-menu index="1">
          <template #title>
            <el-icon><Monitor /></el-icon>
            <span>系统总览</span>
          </template>
          <el-menu-item index="1-1"><span>核心技术</span></el-menu-item>
          <el-menu-item index="1-2"><span>商品统计</span></el-menu-item>
        </el-sub-menu>

        <!-- 2 -->
        <el-sub-menu index="2">
          <template #title>
            <el-icon><setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="2-1"><span>用户管理</span></el-menu-item>
          <el-menu-item index="2-2"><span>部门管理</span></el-menu-item>
          <el-menu-item index="2-3"><span>角色管理</span></el-menu-item>
          <el-menu-item index="2-4"><span>菜单管理</span></el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
//
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
