<template>
  <div class="not-found">
    <h2>not-found</h2>
    <p>
      NotFound：你当前的路由地址 /{{ $route.params.pathMatch }} 匹配失败，请输入正确的路由地址！
    </p>
  </div>
</template>

<script setup lang="ts">
//
</script>

<style lang="scss" scoped>
.not-found {
  //
}
</style>
