<template>
  <div class="echart-line">
    <EchartBase :options="lineData" :height="300"></EchartBase>
  </div>
</template>

<script setup lang="ts">
import { lineOptions } from '../dashboard.data'

const lineData = lineOptions as any
</script>

<style lang="scss" scoped>
.echart-line {
  background: #ffffff;
  padding: 18px;

  margin-top: 20px;
}
</style>
