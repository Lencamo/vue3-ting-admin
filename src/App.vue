<template>
  <div class="app">
    <h2>app</h2>
    <div>
      <button><router-link to="/home">后台页</router-link></button>
      <button><router-link to="/login">登录页</router-link></button>
      <button><router-link to="/demo">测试页</router-link></button>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
//
</script>

<style lang="scss" scoped>
.app {
  //
}
</style>
