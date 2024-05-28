<template>
  <div @click="toggle()">
    <el-icon :size="21">
      <svgIcon :icon="isFullscreen ? 'ep:crop' : 'ep:full-screen'"></svgIcon>
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

const { toggle, isFullscreen } = useFullscreen()
</script>

<style lang="scss" scoped>
.screen-full {
  //
}
</style>
