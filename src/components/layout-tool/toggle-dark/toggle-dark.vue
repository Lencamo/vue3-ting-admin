<template>
  <div class="toggle-dark">
    <el-switch
      v-model="isDark"
      :active-icon="Moon"
      :inactive-icon="Sunny"
      style="--el-switch-on-color: #323233; --el-switch-off-color: #3f91fb"
      inline-prompt
      @change="toggleDark"
    />
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Moon, Sunny } from '@element-plus/icons-vue'

// 亮色暗色主题切换
const isDark = useDark()
const toggleDark = () => useToggle(isDark)
</script>

<style lang="scss" scoped>
.toggle-dark {
  //
}
</style>
