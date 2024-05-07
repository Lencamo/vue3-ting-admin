<template>
  <div class="strength-bar">
    <div
      class="progress-segment"
      v-for="i in 5"
      :key="i"
      :class="{ [progressColor]: strength >= i }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// 父组件input值
interface Props {
  inputValue: string
  strengthColors?: (string | undefined)[]
}

const props = defineProps<Props>()

// 设置单独的类样式
const defaultColors = ref(['#c9140b', '#dc7471', '#e5b845', '#82c593', '#299745'])

const strengthColorsInit = () => {
  if (props.strengthColors) {
    props.strengthColors.forEach((item, index) => {
      if (item) defaultColors.value[index] = item
    })
  }
}
strengthColorsInit()

// ==========

// 密码强度等级
const strength = ref(0)

// 动态的 strength 强度值
watch(
  () => props.inputValue,
  (newValue: string) => {
    const conditions = [
      /[a-z]/, // 包含小写字母
      /[A-Z]/, // 包含大写字母
      /[0-9]/, // 包含数字
      /[!@#$%^&*]/, // 包含特殊字符
      /.{8,}/ // 至少8个字符
    ]

    strength.value = conditions.reduce((acc, regex) => acc + Number(regex.test(newValue)), 0)
  },
  { immediate: true }
)

// 动态的 progressColor 类名
const progressColor = computed(() => {
  const levels = ['', 'very-weak', 'weak', 'medium', 'strong', 'very-strong']
  return levels[strength.value]
})
</script>

<style lang="scss" scoped>
$strength-levels: (
  'very-weak': v-bind('defaultColors[0]'),
  'weak': v-bind('defaultColors[1]'),
  'medium': v-bind('defaultColors[2]'),
  'strong': v-bind('defaultColors[3]'),
  'very-strong': v-bind('defaultColors[4]')
);

.strength-bar {
  width: 100%;
  height: 6px;
  margin: 6px 0;
  border-radius: 3px;
  overflow: hidden;
  display: flex;

  .progress-segment {
    flex: 1;
    background-color: #e0e0e0; // 默认颜色
    transition: background-color 0.3s;

    &:not(:last-child) {
      margin-right: 5px;
    }

    @each $name, $color in $strength-levels {
      &.#{$name} {
        background-color: $color;
      }
    }
  }
}
</style>
