<template>
  <div class="formIdeas">
    <el-row :gutter="20">
      <el-col :span="12">
        <inputCard></inputCard>
      </el-col>
      <el-col :span="12">
        <others></others>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import inputCard from './components/input-card.vue'
import others from './components/others.vue'
</script>

<style lang="scss" scoped>
.formIdeas {
  //
}
</style>
