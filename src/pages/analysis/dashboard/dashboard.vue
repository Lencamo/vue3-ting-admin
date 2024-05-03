<template>
  <div class="dashboard">
    <!-- 数字滚动-模块 -->
    <el-row :gutter="20">
      <template v-for="item in countCartList" :key="item">
        <el-col :span="6">
          <countCard v-bind="item"></countCard>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import countCard from './components/count-card.vue'
import { countCartList } from './dashboard.data'
</script>

<style lang="scss" scoped>
.dashboard {
  //
}
</style>
