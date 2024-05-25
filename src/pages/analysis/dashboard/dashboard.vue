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
        <el-col :span="16">
          <!-- 双x轴图表 -->
          <div class="echart-card">
            <echartHead title="双x轴图表" @date-select="dateSelectChange"></echartHead>
            <EchartBase :options="barData_1"></EchartBase>
          </div>
        </el-col>
        <el-col :span="8">
          <!-- 双x轴图表 -->
          <div class="echart-card">
            <echartHead :data-select="false">
              <template #title>
                <span style="color: red">#title插槽</span>
              </template>
              <template #right>#right插槽</template>
            </echartHead>
            <EchartBase :options="barData_2"></EchartBase>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <!-- 折线图 -->
          <div class="echart-card">
            <EchartBase :options="lineData"></EchartBase>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="echart-card">
            <EchartBase :options="barData"></EchartBase>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="echart-card">
            <EchartBase :options="pieData_1" :height="210"></EchartBase>
          </div>
        </el-col>
        <el-col :span="12">
          <!-- 雷达图 -->
          <div class="echart-card">
            <EchartBase :options="radarData" :height="210"></EchartBase>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="echart-card">
            <EchartBase :options="pieData_4" :height="210"></EchartBase>
          </div>
        </el-col>
      </el-row>
      <!-- 2、饼图 -->
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="echart-card">
            <EchartBase :options="pieData_2" :height="240"></EchartBase>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="echart-card">
            <EchartBase :options="pieData_3" :height="240"></EchartBase>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import countCard from './components/count-card.vue'
import echartHead from './components/echart-head.vue'

import {
  countCardList,
  lineOptions,
  barOptions,
  barOptions_1,
  barOptions_2,
  pieOptions_1,
  pieOptions_2,
  pieOptions_3,
  pieOptions_4,
  radarOptions
} from './dashboard.data'

const lineData = lineOptions as any
const barData = barOptions as any
const barData_1 = barOptions_1 as any
const barData_2 = barOptions_2 as any
const pieData_1 = pieOptions_1 as any
const pieData_2 = pieOptions_2 as any
const pieData_3 = pieOptions_3 as any
const pieData_4 = pieOptions_4 as any
const radarData = radarOptions as any

const dateSelectChange = (val: string) => {
  // 更新option的值即可
  // console.log('数据发生变化', val)
  // 提示（仅供测试）
  ElMessage({
    type: 'success',
    message: JSON.stringify(val)
  })
}
</script>

<style lang="scss" scoped>
/* 透传 Attributes */
.echart-card {
  background: var(--mainBoxBgColor);
  padding: 18px;

  margin-top: 20px;
}

.dashboard {
  //
}
</style>
