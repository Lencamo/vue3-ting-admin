<template>
  <span class="countup-js" ref="countRef">
    {{ countVal }}
  </span>
</template>

<script setup lang="ts">
import { CountUp } from 'countup.js'
import { onMounted } from 'vue'
import { ref } from 'vue'

interface Props {
  countVal: string
  startVal?: string
  prefix?: string
  suffix?: string
}

const props = withDefaults(defineProps<Props>(), {
  startVal: '0',
  prefix: '',
  suffix: ''
})

// countup.js使用
const countRef = ref<HTMLElement>()

onMounted(() => {
  const countup = new CountUp(countRef.value!, Number(props.countVal), {
    startVal: Number(props.startVal),
    prefix: props.prefix,
    suffix: props.suffix
  })

  countup.start()
})
</script>

<style lang="scss" scoped>
.countup-js {
  //
}
</style>
