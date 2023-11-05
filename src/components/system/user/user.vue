<template>
  <div class="user">
    <div class="search-box">
      <userHeader></userHeader>
    </div>
    <div class="list-table">
      <userBody></userBody>
    </div>
  </div>
</template>

<script setup lang="ts">
import userHeader from './components/user-header.vue'
import userBody from './components/user-body.vue'
</script>

<style lang="scss" scoped>
.user {
  //
}
</style>
