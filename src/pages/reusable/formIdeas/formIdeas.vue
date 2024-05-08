<template>
  <div class="formIdeas">
    <el-row :gutter="20">
      <el-col :span="16">
        <inputCard @check-data="handleCheck"></inputCard>
      </el-col>
      <el-col :span="8">
        <others :checkData="checkData"></others>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import inputCard from './components/input-card.vue'
import others from './components/others.vue'

import { ref } from 'vue'

let checkData = ref({})

const handleCheck = (value) => {
  checkData.value = value
}
</script>

<style lang="scss" scoped>
.formIdeas {
  //
}
</style>
