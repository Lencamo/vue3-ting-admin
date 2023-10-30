<template>
  <div class="demo">
    <h2>demo</h2>
    <div>{{ counter }} -- {{ doubleCounter }}</div>
    <button @click="counterAdd(2)">+2</button>
  </div>
</template>

<script setup lang="ts">
import useDemoStore from '@/stores/demo.ts'
import { storeToRefs } from 'pinia'

const demoStore = useDemoStore()
const { counter, doubleCounter } = storeToRefs(demoStore)

const counterAdd = (num: number) => {
  demoStore.incrementCounter(num)
}
</script>

<style lang="scss" scoped>
.demo {
  //
}
</style>
