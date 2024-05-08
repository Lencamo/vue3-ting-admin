<template>
  <div class="area-cascader">
    <el-cascader
      :options="typeMap[typeUse]"
      v-model="selectValue"
      @change="handleSelectChange"
      clearable
      style="width: 70%"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { pcValueCode, pcValueText, pcaValueCode, pcaValueText } from './china-divisions.data'
import { watchEffect } from 'vue'

interface Props {
  value: string[]
  typeUse?: 'pcValueCode' | 'pcValueText' | 'pcaValueCode' | 'pcaValueText'
}

const props = withDefaults(defineProps<Props>(), {
  typeUse: 'pcaValueCode'
})

const typeMap: any = {
  pcValueCode: pcValueCode,
  pcValueText: pcValueText,
  pcaValueCode: pcaValueCode,
  pcaValueText: pcaValueText
}

const emit = defineEmits(['update:value'])

// ========

const selectValue = ref()

watchEffect(() => {
  selectValue.value = props.value
})

const handleSelectChange = () => {
  emit('update:value', selectValue.value)
}
</script>

<style lang="scss" scoped>
.area-cascader {
  width: 100%;
}
</style>
