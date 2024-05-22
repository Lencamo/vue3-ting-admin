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
      <el-row :gutter="20">
        <el-col :span="12">
          <!-- 折线图 -->
          <echartCard :data="lineData"></echartCard>
        </el-col>
        <el-col :span="12">
          <echartCard :data="barOptions"></echartCard>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <echartCard :data="pieData_1" :height="210"></echartCard>
        </el-col>
        <el-col :span="9">
          <!-- 雷达图 -->
          <echartCard :data="radarData" :height="210"></echartCard>
        </el-col>
        <el-col :span="9">
          <echartCard :data="pieOptions_4" :height="210"></echartCard>
        </el-col>
      </el-row>
      <!-- 2、饼图 -->
      <el-row :gutter="20">
        <el-col :span="12">
          <echartCard :data="pieData_2" :height="240"></echartCard>
        </el-col>
        <el-col :span="12">
          <echartCard :data="pieData_3" :height="240"></echartCard>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import countCard from './components/count-card.vue'
import echartCard from './components/echart-card.vue'

import {
  countCardList,
  lineOptions,
  barOptions,
  pieOptions_1,
  pieOptions_2,
  pieOptions_3,
  pieOptions_4,
  radarOptions
} from './dashboard.data'

const lineData = lineOptions as any
const pieData_1 = pieOptions_1 as any
const pieData_2 = pieOptions_2 as any
const pieData_3 = pieOptions_3 as any
const radarData = radarOptions as any
</script>

<style lang="scss" scoped>
.dashboard {
  //
}
</style>
