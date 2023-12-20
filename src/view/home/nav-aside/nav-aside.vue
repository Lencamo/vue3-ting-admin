<template>
  <div class="nav-aside">
    <div class="logo">
      <img src="@/assets/imgs/title.jpg" alt="" />
      <h3 class="title" v-if="!isCollapse">后台管理系统</h3>
    </div>

    <div class="menu">
      <!--  -->
    </div>
  </div>
</template>

<script setup lang="ts">
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
