<template>
  <div class="echart-head">
    <div class="header">
      <div class="title">
        <slot name="title"></slot>
      </div>
      <div class="select">
        <el-radio-group v-model="dateType">
          <el-radio value="1">月</el-radio>
          <el-radio value="2">年</el-radio>
        </el-radio-group>
        <el-date-picker
          v-model="queryDate"
          :value-format="dateType === '1' ? 'YYYY-MM' : 'YYYY'"
          :type="dateType === '1' ? 'month' : 'year'"
          :format="dateType === '1' ? 'YYYY-MM' : 'YYYY'"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import dayjs from 'dayjs'

const dateType = ref('1')
const queryDate = ref(dayjs().format('YYYY-MM'))

const emits = defineEmits(['selectChange'])

watchEffect(() => {
  emits('selectChange', {
    dateType: dateType.value,
    queryDate: queryDate.value
  })
})
</script>

<style lang="scss" scoped>
.echart-head {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 5px;
    margin-bottom: 20px;
    margin-top: -5px;

    .title {
      /* 和echart默认值保持一致 */
      font-size: 18px;
      color: #333;
      font-weight: bolder;
    }

    .select {
      display: flex;
      align-items: center;

      :deep(.el-radio) {
        margin-right: 20px;
      }
      :deep(.el-date-editor.el-input) {
        width: 125px;
      }
    }
  }
}
</style>
