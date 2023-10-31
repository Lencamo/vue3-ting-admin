<template>
  <div class="pwd-form">
    <el-form :model="pwdForm" :rules="formRules" ref="pwdFormRef" label-width="70px">
      <el-form-item label="帐号" prop="user">
        <el-input v-model="pwdForm.user" />
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" show-password v-model="pwdForm.pwd" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormRules, FormInstance } from 'element-plus'

const pwdForm = reactive({
  user: '',
  pwd: ''
})

// 表单校验
const formRules = reactive<FormRules>({
  user: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 1, max: 8, message: '用户名过长，请重新输入！', trigger: 'blur' }
  ],
  pwd: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      pattern: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      message: '密码需要由数字和英文字母组成',
      trigger: 'blur'
    },
    { min: 6, max: 12, message: '密码长度范围为：6-12', trigger: 'change' }
  ]
})

// 待调用函数
const pwdFormRef = ref<FormInstance>()
const pwdLoginAction = () => {
  console.log(pwdForm)
  pwdFormRef.value?.validate((valid, fields) => {
    if (valid) {
      ElMessage.success('表单校验成功！')
    } else {
      ElMessage.error('表单校验失败.')
    }
  })
}
defineExpose({ pwdLoginAction })
</script>

<style lang="scss" scoped>
.pwd-form {
  margin-top: 10px;
}
</style>
