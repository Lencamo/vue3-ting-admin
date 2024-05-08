<template>
  <div class="formIdeas">
    <el-row :gutter="20">
      <el-col :span="16">
        <formCard @check-data="handleCheck"></formCard>
      </el-col>
      <el-col :span="8">
        <dataShow :checkData="checkData"></dataShow>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import formCard from './components/form-card.vue'
import dataShow from './components/data-show.vue'

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
