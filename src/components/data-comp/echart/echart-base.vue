<template>
  <div class="echart-base">
    <div ref="elRef" :style="styles"></div>
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { isString } from '@/utils/is'
import * as echarts from 'echarts'
import { debounce } from 'lodash-es'

interface Props {
  options: EChartsOption
  width?: number
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  height: 300
})

// ========

const styles = computed(() => {
  const width = isString(props.width) ? props.width : `${props.width}px`
  const height = isString(props.height) ? props.height : `${props.height}px`

  return {
    width,
    height
  }
})

const elRef = ref()
let echartRef: echarts.ECharts | null = null

watch(
  () => props.options,
  (newVal) => {
    if (echartRef) {
      echartRef?.setOption(newVal)
    }
  },
  { deep: true }
)

const initChart = () => {
  echartRef = echarts.init(elRef.value, 'light', {
    renderer: 'canvas'
  })
  echartRef?.setOption(props.options)
}

const resizeHandler = debounce(() => {
  if (echartRef) {
    echartRef.resize()
  }
}, 100)

onMounted(() => {
  initChart()

  window.addEventListener('resize', resizeHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
})
</script>

<style lang="scss" scoped>
.echart-base {
  width: 100%;
  height: 100%;
}
</style>
