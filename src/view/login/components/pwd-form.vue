<template>
  <div class="pwd-form">
    <el-form :model="formData" :rules="formRules" ref="formDataRef">
      <el-form-item prop="user">
        <el-input :prefix-icon="User" placeholder="帐号" v-model="formData.user" size="large" />
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input
          :prefix-icon="Lock"
          placeholder="密码"
          v-model="formData.pwd"
          size="large"
          type="password"
          show-password
        />
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入验证码" v-model="formData.code" size="large">
          <template #append>
            <canvas-verify
              ref="canvasRef"
              :width="100"
              :height="38"
              @verify-code="handleVerifyCode"
            ></canvas-verify>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <div class="remeber">
          <el-checkbox v-model="isRemeber" label="记住密码" size="large" />
          <el-link type="primary">没有账号？</el-link>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import type { FormRules, FormInstance } from 'element-plus'
import useloginStore from '@/stores/login/login.ts'
import { useRouter } from 'vue-router'
import { localCache } from '@/utils/cache.ts'
import { CACHE_USER, CACHE_REMEBER } from '@/config/constants.ts'

const loginStore = useloginStore()
const router = useRouter()

// ======== 记住密码 =========

// 记住密码
const isRemeber = ref<boolean>(localCache.getCache(CACHE_REMEBER) ?? false)
// 测试
watch(isRemeber, (newvalue, oldvalue) => {
  // console.log(newvalue)
  localCache.setCache(CACHE_REMEBER, newvalue)
})

// ======= canvas验证码 =======

const canvasRef = ref()
const canvasCode = ref()

const handleVerifyCode = (code: string) => {
  canvasCode.value = code
}

// ===========================

const formData = reactive({
  user: localCache.getCache(CACHE_USER)?.username ?? 'TingAdmin',
  pwd: localCache.getCache(CACHE_USER)?.password ?? 'TingAdmin123',
  code: ''
})

// 表单校验
const formRules = reactive<FormRules>({
  user: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 2, max: 12, message: '用户名长度范围应在 2 - 12 之间', trigger: 'blur' }
  ],
  pwd: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      pattern: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      message: '密码需要由数字和英文字母组成',
      trigger: 'blur'
    },
    { min: 6, max: 20, message: '密码长度范围为：6-20', trigger: 'change' }
  ]
})

const formDataRef = ref<FormInstance>()

const pwdLoginAction = () => {
  formDataRef.value?.validate((valid, fields) => {
    const { user, pwd, code } = formData

    // 验证码校验
    if (code !== canvasCode.value) {
      ElMessage.error('验证码错误')
      canvasRef.value.canvasStart() // 此处最好做防抖处理
      formData.code = ''
      return
    }

    // 表单校验成功
    if (valid) {
      loginStore.pwdLoginAction({ username: user, password: pwd }).then(() => {
        // 登陆提示
        ElNotification({
          type: 'success',
          title: '登录成功',
          message: '欢迎回来，' + user + '！'
        })

        // 记住密码
        if (isRemeber.value) {
          localCache.setCache(CACHE_USER, { username: user, password: pwd })
        } else {
          localCache.removeCache(CACHE_USER)
        }

        // 页面跳转
        router.push('/home')
      })
    } else {
      ElMessage.error('表单校验失败.')
    }
  })
}
defineExpose({ pwdLoginAction })
</script>

<style lang="scss" scoped>
:deep(.el-input-group__append) {
  padding: 0px;
  border: 1px solid #dddfe5;
  border-left: none;
  border-radius: 0px 4px 4px 0px;
  overflow: hidden;

  height: 38px;
}

.pwd-form {
  margin-top: 10px;

  .remeber {
    display: flex;
    justify-content: space-between;

    width: 100%;
  }
}
</style>
