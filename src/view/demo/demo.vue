<template>
  <div class="demo">
    <h2>demo</h2>
    <div>{{ counter }} -- {{ doubleCounter }}</div>
    <button @click="counterAdd(2)">+2</button>
    <hr />
    <button @click="getDemoListFn">axios请求测试</button>
    <p>{{ demoList }}</p>
    <hr />
    <el-button type="primary" size="default" @click="">Primary</el-button>
    <el-button :plain="true" @click="open">success</el-button>
  </div>
</template>

<script setup lang="ts">
import useDemoStore from '@/stores/demo.ts'
import { storeToRefs } from 'pinia'

import { getDemoList } from '@/services/modules/demo.ts'
import { ref } from 'vue'

const demoStore = useDemoStore()
const { counter, doubleCounter } = storeToRefs(demoStore)

const counterAdd = (num: number) => {
  demoStore.incrementCounter(num)
}

const open = () => {
  ElMessage({
    message: 'Congrats, this is a success message.',
    type: 'success'
  })
  ElMessage.success('Congrats, this is a success message.')
}

// ==========

const demoList = ref()
const getDemoListFn = async () => {
  const res = await getDemoList()
  demoList.value = JSON.stringify(res.data, null, 2)
}
</script>

<style lang="scss" scoped>
.demo {
  //
}
</style>
