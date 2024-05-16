<template>
  <div class="screen-full" @click="toggle()">
    <el-icon :size="21"><component :is="isFullscreen ? Crop : FullScreen" /></el-icon>
  </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import { FullScreen, Crop } from '@element-plus/icons-vue'

const { toggle, isFullscreen } = useFullscreen()
</script>

<style lang="scss" scoped>
.screen-full {
  margin: auto 0px;
}
</style>
