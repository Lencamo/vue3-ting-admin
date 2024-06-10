<template>
  <div class="count-card">
    <div class="section-box">
      <div class="left">
        <p style="font-size: 15px">{{ title }}</p>
        <h3 style="font-size: 22px">
          <!-- {{ value }} -->
          <!-- 使用 count.js 方式 -->
          <countup-js
            :countVal="value"
            :prefix="name === 'money' ? '¥' : ''"
            :suffix="name === 'deal' ? '%' : ''"
          ></countup-js>
        </h3>
      </div>
      <div class="right">
        <el-icon :size="35" :color="color">
          <svgIcon :icon="icon"></svgIcon>
        </el-icon>
      </div>
    </div>
    <div class="total-box" style="font-size: 13px">
      <span>总{{ title }}</span>

      <!-- <span>{{ total }}</span> -->
      <!-- 使用 useTransition 方式 -->
      <use-transition></use-transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ICountCard } from '../echarts.d'

const props = defineProps<ICountCard>()
</script>

<style lang="scss" scoped>
.count-card {
  background: var(--mainBoxBgColor);
  padding: 10px 18px;
  padding-bottom: 0px;

  height: 100px;

  .section-box {
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 60px;

    .left {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      height: 100%;
    }
  }

  .total-box {
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 40px;
    border-top: 1px solid #e9e9e9;
  }
}
</style>
