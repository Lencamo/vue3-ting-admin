<template>
  <div class="behavior-card">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="top-box">
          <h3>前端行为验证</h3>
        </div>
      </template>
      <div class="core-box">
        <el-form :model="formDate" :rules="formRules" ref="formRef" label-position="top">
          <el-form-item label="第三方验证码" prop="authValue">
            <el-input
              v-model="formDate.authValue"
              @change="handleChangeValidate"
              placeholder="请输入邮箱或手机号"
              size="large"
            >
              <template #prepend>
                <el-select v-model="authType" size="large" style="width: 110px">
                  <el-option label="电话+86" value="phone" />
                  <el-option label="QQ 邮箱" value="email" />
                </el-select>
              </template>
              <template #append>
                <el-button
                  type="primary"
                  :disabled="isBtnDisable"
                  :style="{ color: isBtnDisable ? '#9ea1a8' : '#3f91fb' }"
                  @click="handleSendClick"
                  style="width: 100px; font-weight: normal"
                >
                  {{ btnValue }}
                </el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="canvas验证码">
            <el-input v-model="formDate.authCode" placeholder="请输入验证码" size="large">
              <template #append>
                <el-button
                  type="primary"
                  style="width: 100px; height: 40px; padding: 0px; border: none; overflow: hidden"
                >
                  <canvas-verify
                    ref="canvasRef"
                    :width="100"
                    :height="40"
                    @verify-code="handleVerifyCode"
                  ></canvas-verify>
                </el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="滑动验证">
            <drag-verify ref="dragRef" @drag-success="passcallback"></drag-verify>
          </el-form-item>
          <el-form-item label="拼图验证">
            <puzzle-verify :show="isShow" @success="onSuccess" @close="onClose"></puzzle-verify>
            <el-button style="width: 350px" type="primary" @click="onShow">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormRules, FormInstance } from 'element-plus'
import puzzleVerify from 'vue3-puzzle-vcode'

const formDate = reactive({
  authValue: '', // 手机号或邮箱
  authCode: '', // canvas验证码
  dragPass: false, // 滑动验证结果
  puzzlePass: false // 拼图验证结果
})

const formRef = ref<FormInstance>()
const formRules = reactive<FormRules>({
  // 第三方验证码
  authValue: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (authType.value === 'phone' && !value.match(/^(?:(?:\+|00)86)?1\d{10}$/)) {
          callback(new Error('请输入正确的手机号格式'))
        } else if (
          authType.value === 'email' &&
          !value.match(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)
        ) {
          callback(new Error('请输入正确的邮箱格式'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ]
})

// ====================
// 第三方验证码
// ====================

const authType = ref('phone')
const btnValue = ref('获取验证码')
const countdown = ref(60)
const isBtnDisable = ref(true)

const handleChangeValidate = () => {
  formRef.value?.validateField('authValue', (valid: boolean) => {
    if (valid && countdown.value === 60) {
      isBtnDisable.value = false
    } else {
      isBtnDisable.value = true
    }
  })
}

const handleSendClick = () => {
  isBtnDisable.value = true

  const countdownAction = () => {
    if (countdown.value >= 0) {
      btnValue.value = '重新发送(' + countdown.value + ')'
      countdown.value--
    } else {
      countdown.value = 60
      isBtnDisable.value = false
      btnValue.value = '重新发送'
      clearInterval(timer)
    }
  }

  // 立即执行一次
  countdownAction()

  const timer = setInterval(countdownAction, 1000)
}

// ====================
// canvas验证码
// ====================

const canvasRef = ref()

const handleVerifyCode = (code: string) => {
  formDate.authCode = code
}

// ====================
// 拖拽验证
// ====================

const dragRef = ref()

const passcallback = (value) => {
  // alert('验证结果：', value)

  // 验证成功的操作
  if (value) {
    ElMessage.success('验证成功，2秒后重置')

    setTimeout(() => {
      dragRef.value?.dragReset()
    }, 2000)
  } else {
    ElMessage.error('验证失败，请重试')
  }
}

// ====================
// 滑动验证
// ====================

const isShow = ref(false)

const onShow = () => {
  isShow.value = true
}

const onClose = () => {
  isShow.value = false
}

const onSuccess = () => {
  onClose() // 验证成功，手动关闭模态框
  formDate.puzzlePass = true
}
</script>

<style lang="scss" scoped>
/* TODO: validateIcon位置不正确bug修复 */
:deep(.el-input__validateIcon) {
  display: none;
}

:deep(.el-form-item__error) {
  margin-left: 110px;
}

.behavior-card {
  //
}
</style>
