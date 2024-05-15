<template>
  <div class="slide-verify">
    <!-- 滑块 -->
    <div
      ref="dragBoxRef"
      class="drag-box"
      :style="dragBoxStyle"
      @mousemove="dragMoving"
      @mouseup="dragFinish"
    >
      <!-- 2、背景 -->
      <div
        ref="progressItemRef"
        class="progress-item"
        :class="{ goBack1: isOk }"
        :style="progressBarStyle"
      ></div>
      <!-- 3、文字 -->
      <div class="tip-item">
        <!--  -->
        {{ dragStatus ? '验证通过' : '请按住滑块，拖动到最右侧' }}
      </div>
      <!-- 4、图标 -->
      <div
        class="icon-item"
        :class="{ goBack2: isOk }"
        @mousedown="dragStart"
        ref="iconItemRef"
        :style="iconBoxStyle"
      >
        <el-icon><component :is="dragStatus ? 'CircleCheck' : 'DArrowRight'"></component></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  // drag盒子品质
  width: { type: Number, default: 350 },
  height: { type: Number, default: 40 },
  background: { type: String, default: '#eee' }, // 整体背景色

  // background配置
  iconBoxBg: { type: String, default: '#7c58c9' }, // 图标盒子背景色
  progressBg: { type: String, default: '#76c61d' }, // 拖拽进度条背景色

  // border-radius配置
  circle: { type: Boolean, default: false },
  radius: { type: String, default: '5px' }
})

const emit = defineEmits(['update:value', 'drag-success'])

const dragBoxRef = ref()
const progressItemRef = ref()
const iconItemRef = ref()

const isOk = ref(false) // 是否变化背景、图标
const isMoving = ref(false) // 是否正在拖动
const distance = ref(0) // 拖拽的距离
const dragStatus = ref(false) // 验证状态

// ==== 计算属性 ====

const iconBoxStyle = computed(() => ({
  width: props.height + 'px',
  height: props.height + 'px',
  background: props.iconBoxBg
}))

const dragBoxStyle = computed(() => ({
  width: props.width + 'px',
  height: props.height + 'px',
  lineHeight: props.height + 'px',
  background: props.background,

  borderRadius: props.circle ? props.height / 2 + 'px' : props.radius
}))

const progressBarStyle = computed(() => ({
  background: props.progressBg,
  height: props.height + 'px',

  borderRadius: props.circle ? props.height / 2 + 'px 0 0 ' + props.height / 2 + 'px' : props.radius
}))

// ==== 事件监听 ====

const dragStart = (e) => {
  if (!dragStatus.value) {
    isMoving.value = true
    distance.value = e.pageX || e.touches[0].pageX
  }
}

const dragMoving = (e) => {
  if (isMoving.value && !dragStatus.value) {
    const _x = (e.pageX || e.touches[0].pageX) - distance.value
    if (_x > 0 && _x <= props.width - props.height) {
      iconItemRef.value.style.left = _x + 'px'
      progressItemRef.value.style.width = _x + props.height / 2 + 'px'
    } else if (_x > props.width - props.height) {
      iconItemRef.value.style.left = props.width - props.height + 'px'
      progressItemRef.value.style.width = props.width - props.height / 2 + 'px'

      passVerify(true)
    }
  }
}

const dragFinish = (e) => {
  if (isMoving.value && !dragStatus.value) {
    const _x = (e.pageX || e.changedTouches[0].pageX) - distance.value
    if (_x < props.width - props.height) {
      passVerify(false)

      dragReset()
    } else {
      iconItemRef.value.style.left = props.width - props.height + 'px'
      progressItemRef.value.style.width = props.width - props.height / 2 + 'px'

      passVerify(true)
    }
    isMoving.value = false
  }
}

// ==== 验证拖拽结果 ====
const passVerify = (result: boolean) => {
  isMoving.value = false
  dragStatus.value = result
  emit('drag-success', result)
}

// ==== 恢复初始状态 ====
const dragReset = () => {
  isOk.value = true

  setTimeout(() => {
    isOk.value = false
    isMoving.value = false
    distance.value = 0
    dragStatus.value = false

    progressItemRef.value.style.width = '0'
    iconItemRef.value.style.left = '0'
  }, 500)
}

defineExpose({ dragReset })
</script>

<style lang="scss" scoped>
.goBack1 {
  width: 0px !important;
  transition: width 0.5s;
}
.goBack2 {
  left: 0px !important;
  transition: left 0.5s;
}

.drag-box {
  position: relative;
  background-color: #e8e8e8;
  text-align: center;
  overflow: hidden;

  .progress-item {
    position: absolute;
    height: 34px;
    width: 0px;
  }

  .icon-item {
    position: absolute;
    top: 0px;
    left: 0px;
    cursor: move;
  }

  .tip-item {
    position: absolute;
    top: 0px;
    user-select: none;

    /* color: transparent; */
    text-align: center;
    font-size: 12px;
    width: 100%;
  }
}
</style>
