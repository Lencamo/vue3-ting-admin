<template>
  <div class="readme">
    <Readme :class="isDark ? 'markdown-dark' : 'markdown-light'"></Readme>
  </div>
</template>

<script setup lang="ts">
import Readme from './components/README.md'
import { useDark } from '@vueuse/core'

import './theme-css/github-markdown-light.css'
import './theme-css/github-markdown-dark.css'

import './theme-css/github-highlight-light.css'
import './theme-css/github-highlight-dark.css'

const isDark = useDark()
</script>

<style lang="scss" scoped>
:deep(li) {
  list-style: disc;
}

.readme {
  background: var(--mainBoxBgColor);
  padding: 18px;
}
</style>
