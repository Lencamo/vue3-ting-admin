<template>
  <div class="echart-card">
    <EchartBase :options="data" :height="height"></EchartBase>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Prop {
  data: any
  height?: number
}

const props = withDefaults(defineProps<Prop>(), {
  height: 300
})

const height = computed(() => props.height)
</script>

<style lang="scss" scoped>
.echart-card {
  background: var(--mainBoxBgColor);
  padding: 18px;

  margin-top: 20px;
}
</style>
