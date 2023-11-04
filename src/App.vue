<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
// import useloginStore from './stores/login/login'
// const loginStore = useloginStore()

// // 动态路由-防刷新处理
// loginStore.dynamicRoutesCacheAction()
</script>

<style lang="scss" scoped>
.app {
  width: 100vw;
  height: 100vh;
  background-color: #e8eaed;
}
</style>
