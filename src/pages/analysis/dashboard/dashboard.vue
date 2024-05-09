<template>
  <div class="dashboard">
    <!-- 数字滚动-模块 -->
    <div class="count-box">
      <el-row :gutter="20">
        <template v-for="item in countCardList" :key="item">
          <el-col :span="6">
            <countCard v-bind="item"></countCard>
          </el-col>
        </template>
      </el-row>
    </div>

    <!-- echart-图表 -->
    <div class="echart-box">
      <echartLine></echartLine>
    </div>
  </div>
</template>

<script setup lang="ts">
import countCard from './components/count-card.vue'
import echartLine from './components/echart-line.vue'

import { countCardList } from './dashboard.data'
</script>

<style lang="scss" scoped>
.dashboard {
  //
}
</style>
