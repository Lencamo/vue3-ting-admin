<template>
  <div class="echart-head">
    <div class="header">
      <div class="title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="select">
        <slot name="right">
          <template v-if="dataSelect">
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
          </template>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import dayjs from 'dayjs'

interface Prop {
  title?: string
  dataSelect?: boolean
}

const props = withDefaults(defineProps<Prop>(), {
  title: '',
  dataSelect: true
})

const dateType = ref('1')
const queryDate = ref(dayjs().format('YYYY-MM'))

const emits = defineEmits(['dateSelect'])

watchEffect(() => {
  // bug修复: 选择年时，queryDate格式不对问题
  if (dateType.value === '2') {
    dayjs(queryDate.value, 'YYYY', true).isValid() ||
      (queryDate.value = dayjs(queryDate.value).format('YYYY'))
  }

  // bug修复: 选择年并更改年份，然后再选择月份，日期选择框显示为空
  if (dateType.value === '1') {
    dayjs(queryDate.value, 'YYYY-MM', true).isValid() ||
      (queryDate.value = dayjs(queryDate.value).format('YYYY-01'))
  }

  emits('dateSelect', {
    dateType: dateType.value,
    queryDate: queryDate.value
  })
})
</script>

<style lang="scss" scoped>
.echart-head {
  height: 48px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 0px 5px;

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
