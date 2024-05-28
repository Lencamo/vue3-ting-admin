<template>
  <div class="key-value">
    <div v-for="(item, index) in extraAttrList" :key="index" class="item-box">
      <el-input
        v-model="item.attrKey"
        @input="handleInputChange"
        placeholder="请输入属性名"
        style="width: 40%; margin-right: 5px"
      />
      <el-input
        @input="handleInputChange"
        v-model="item.attrValue"
        placeholder="请输入属性值"
        style="width: 40%; margin-right: 5px"
      />
      <el-button v-if="extraAttrList.length > props.delLimit" @click="removeItem(item)" link>
        <el-icon :size="18"><EpCircleClose /></el-icon>
      </el-button>
    </div>
    <div>
      <el-button style="width: 40%; border: 1px dashed var(--el-border-color)" @click="addItem">
        <el-icon><Plus /></el-icon>
        <el-text>新增</el-text>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

type IAttr = {
  attrKey: string
  attrValue: string
}

interface Props {
  value: IAttr[]
  delLimit?: number
}

const props = withDefaults(defineProps<Props>(), {
  delLimit: 1
})

const emit = defineEmits(['update:value'])

// ========

let extraAttrList = ref()

watchEffect(() => {
  extraAttrList.value = props.value
})

const handleInputChange = () => {
  emit('update:value', extraAttrList.value)
}

// ========

const addItem = () => {
  extraAttrList.value.push({
    attrKey: '',
    attrValue: ''
  })
  handleInputChange()
}

const removeItem = (item) => {
  const index = extraAttrList.value.indexOf(item)

  if (index !== -1) {
    extraAttrList.value.splice(index, 1)
  }
  handleInputChange()
}
</script>

<style lang="scss" scoped>
.key-value {
  width: 100%;
}
</style>
