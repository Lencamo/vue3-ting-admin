<template>
  <div class="phone-form">
    <el-form :model="formData" :rules="formRules" ref="formDataRef">
      <el-form-item prop="phone">
        <el-input
          :prefix-icon="Iphone"
          placeholder="手机号"
          v-model="formData.phone"
          size="large"
          @change="handleChangeValidate"
        />
      </el-form-item>
      <el-form-item>
        <drag-verify :height="40" ref="dragRef" @drag-success="passcallback"></drag-verify>
      </el-form-item>
      <el-form-item prop="code">
        <el-input placeholder="请输入验证码(默认为1234)" v-model="formData.code" size="large">
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
      <el-form-item>
        <div class="check">
          <el-checkbox v-model="isAccept" label="我已阅读并同意" size="large" />
          <el-link type="primary">《用户协议》</el-link>
          <el-link type="primary">《隐私政策》</el-link>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { Iphone } from '@element-plus/icons-vue'
import type { FormRules, FormInstance } from 'element-plus'
import useloginStore from '@/stores/login/login.ts'
import { useRouter } from 'vue-router'

const loginStore = useloginStore()
const router = useRouter()

const isAccept = ref(false)

// ======== 拖拽验证 =========

const dragRef = ref()
const isPass = ref(false)

const passcallback = (value) => {
  // alert('验证结果：', value)
  isPass.value = value

  // 验证成功的操作
  if (value) {
    ElMessage.success('验证成功，请点击获取验证码')

    // ElMessage.success('验证成功，2秒后重置')
    // setTimeout(() => {
    //   dragRef.value?.dragReset()
    // }, 2000)
  } else {
    ElMessage.error('验证失败，请重试')
  }
}

// ======= 发送验证码 =======

const btnValue = ref('获取验证码')
const countdown = ref(60)
const isBtnDisable = ref(true)

// 前提1
const handleChangeValidate = () => {
  formDataRef.value?.validateField('phone', (valid: boolean) => {
    if (valid && countdown.value === 60) {
      isBtnDisable.value = false
    } else {
      isBtnDisable.value = true
    }
  })
}

const handleSendClick = () => {
  // 前提2
  if (!isPass.value) {
    ElMessage.error('请先完成拖拽验证')
    return
  }

  // 发送验证码
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

// ===========================

const formData = reactive({
  phone: '',
  code: ''
})

// 表单校验
const formRules = reactive<FormRules>({
  phone: [
    { required: true, message: '手机号不能为空', trigger: 'blur' },
    { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
  ]
})

const formDataRef = ref<FormInstance>()

const phoneLoginAction = () => {
  formDataRef.value?.validate((valid, fields) => {
    const { phone, code } = formData

    // 滑块验证
    if (!isPass.value) {
      ElMessage.error('请先完成拖拽验证')
      return
    }

    // 同意验证
    if (!isAccept.value) {
      ElMessage.error('请先阅读并同意用户协议和隐私政策')
      return
    }

    // 验证码校验
    if (code != '1234') {
      ElMessage.error('验证码错误')
      isPass.value = false
      dragRef.value?.dragReset()
      formData.code = ''
      return
    }

    if (valid) {
      // TODO: 暂时使用密码登陆逻辑
      loginStore.pwdLoginAction({ username: 'TingAdmin', password: 'TingAdmin123' }).then(() => {
        // 登陆提示
        ElNotification({
          type: 'success',
          title: '登录成功',
          message: '欢迎回来，' + 'TingAdmin' + '！'
        })

        // 页面跳转
        router.push('/home')
      })
    } else {
      ElMessage.error('表单校验失败.')
    }
  })
}
defineExpose({ phoneLoginAction })
</script>

<style lang="scss" scoped>
.phone-form {
  margin-top: 10px;

  .check {
    display: flex;
    align-items: center;
  }

  .codeBox {
    display: flex;
    justify-content: center;

    .code {
      width: 120px;
      height: 100%;
      height: 32px;
      border: 1px solid #dcdfe6;
      margin: 0px 5px;
      text-align: center;
      background-color: var(--homeAsideBgColor);

      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
