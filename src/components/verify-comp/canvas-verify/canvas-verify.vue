<template>
  <div class="canvas-verify">
    <!-- canvas验证码 -->
    <canvas id="canvas" :width="width" :height="height" @click="handleCanvasClick"></canvas>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'

const props = defineProps({
  height: {
    type: Number,
    default: 50
  },
  width: {
    type: Number,
    default: 160
  },
  charNum: {
    type: Number,
    default: 5
  },
  lineNum: {
    type: Number,
    default: 5
  },
  dotNum: {
    type: Number,
    default: 40
  }
})

const emit = defineEmits(['verify-code'])

const canvasStart = () => {
  nextTick(() => {
    // 获取验证码
    const verifyCode = drawCode(
      '#canvas',
      props.width,
      props.height,
      props.charNum,
      props.lineNum,
      props.dotNum
    )
    // 显示验证码
    // console.log(verificationCode)
    emit('verify-code', verifyCode) // 向父组件发送验证码
  })
}

// 初次渲染时执行
canvasStart()

// 点击canvas执行
const handleCanvasClick = () => {
  canvasStart()
}

// 父组件调用执行
defineExpose({ canvasStart })

// ======== 工具函数 ========

// 获取随机数
const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
// 获取随机颜色
const getColor = (min, max) => {
  let r = getRandom(min, max)
  let g = getRandom(min, max)
  let b = getRandom(min, max)
  return `rgb(${r},${g},${b}`
}

// ======== canvas绘制 ========

// 绘制验证码函数
const drawCode = (selector, width, height, charNum = 5, lineNum = 5, dotNum = 40) => {
  let canvas = document.querySelector(selector)

  // 1、初始化画布
  let ctx = canvas.getContext('2d') // 获取画布
  ctx.fillStyle = getColor(235, 250) // 绘制背景
  ctx.fillRect(0, 0, width, height) // 绘制起始坐标、宽高

  // 2、绘制验证码
  let codeStr = ''
  for (let i = 0; i < charNum; i++) {
    // 2.1 生成验证码字符
    // 数字，大写字母，小写字母对应的ASCII码范围'0'-'9':48-57, 'A'-'Z':65-90, 'a'-'z':97-122
    let asciiNum = getRandom(48, 122) // ASCII码值
    if ((asciiNum > 57 && asciiNum < 65) || (asciiNum > 90 && asciiNum < 97)) {
      i--
      continue
    }
    const char = String.fromCharCode(asciiNum)
    codeStr += char // 供后续验证使用

    // 2.2 设置一些基础样式
    let fontSize = getRandom(height - height * 0.5, height - height * 0.1) // 字体大小
    ctx.font = fontSize + 'px Simhei' // 设置字体大小和字体类型
    ctx.textBaseline = 'top' // 设置文字的基线
    ctx.fillStyle = getColor(120, 180) // 设置字体的填充颜色

    // 2.3 绘制验证码字符
    ctx.save() // 保存样式

    // 2.3 追加一些干扰样式
    // 设置文字的位移
    ctx.translate((width / charNum) * i + width / charNum / 2, height / 2)
    // 随机字体旋转角度
    let deg = getRandom(-35, 35)
    // 设置文字的旋转角度
    ctx.rotate((deg * Math.PI) / 180)

    // 2.4 绘制验证码字符
    ctx.fillText(char, -10, -10)

    // 2.5 恢复，准备绘制下一个字符
    ctx.restore()
  }

  // 3、绘制随机干扰线
  for (let j = 0; j < lineNum; j++) {
    ctx.beginPath() // 起始路径
    ctx.moveTo(getRandom(0, width), getRandom(0, height)) // 起点
    ctx.lineTo(getRandom(0, width), getRandom(0, height)) // 终点
    ctx.strokeStyle = getColor(180, 200) // 随机干扰线颜色
    ctx.closePath() // 关闭路线

    // 绘制路线
    ctx.stroke()
  }

  // 4、绘制随机圆点
  for (let j = 0; j < dotNum; j++) {
    ctx.beginPath()
    ctx.arc(getRandom(0, width), getRandom(0, height), 1, 0, 2 * Math.PI) // 设置圆点的位置，半径，形状
    ctx.fillStyle = getColor(150, 200) // 设置圆点颜色
    ctx.closePath()

    // 绘制圆点
    ctx.fill()
  }

  return codeStr // 返回验证码字符串
}
</script>

<style lang="scss" scoped>
.canvas-verify {
  width: 100%;
  height: 100%;
}
</style>
