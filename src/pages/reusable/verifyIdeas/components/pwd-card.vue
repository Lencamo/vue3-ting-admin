<template>
  <div class="pwd-card">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="top-box">
          <h3>密码修改</h3>
        </div>
      </template>
      <div class="core-box">
        <p>
          <el-text tag="b">1、拥有比较完善的密码校验</el-text>
        </p>
        <p>
          <el-text tag="b">2、附加了密码强度验证进度条</el-text>
        </p>
        <el-form
          ref="pwdFormRef"
          :model="pwdForm"
          :rules="formRules"
          label-position="top"
          status-icon
        >
          <el-form-item label="原密码" prop="oldPwd">
            <el-input v-model="pwdForm.oldPwd" type="password" show-password autocomplete="off" />
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input v-model="pwdForm.newPwd" type="password" show-password autocomplete="off" />
            <!-- 密码强度条 -->
            <strength-bar :inputValue="pwdForm.newPwd"></strength-bar>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              v-model="pwdForm.checkPass"
              type="password"
              show-password
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item class="btn-box">
            <el-button @click="resetForm(pwdFormRef)">重置</el-button>
            <el-button type="primary" @click="submitForm(pwdFormRef)">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const pwdFormRef = ref<FormInstance>()

// 表单数据
const pwdForm = reactive({
  oldPwd: '',
  newPwd: '',
  checkPass: ''
})

// 数据校验
const formRules = reactive<FormRules>({
  oldPwd: [
    {
      required: true,
      validator: (rule: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error('密码不能为空'))
        } else if (value === pwdForm.newPwd) {
          callback(new Error('新密码不能与旧密码相同'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  newPwd: [
    {
      required: true,
      validator: (rule: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error('密码不能为空'))
        } else if (value === pwdForm.oldPwd) {
          callback(new Error('新密码不能与旧密码相同'))
        } else {
          // 总是在确认密码处显示信息
          if (pwdForm.checkPass !== '') {
            if (!pwdFormRef.value) return
            pwdFormRef.value.validateField('checkPass', () => null)
          }
          callback()
        }
      },
      trigger: 'blur'
    },
    {
      pattern: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      message: '密码需要由数字和英文字母组成',
      trigger: 'change'
    },
    { min: 6, message: '密码长度不能低于6个字符', trigger: 'blur' },
    { max: 20, message: '密码长度不能高于20个字符', trigger: 'blur' }
  ],
  checkPass: [
    {
      required: true,
      validator: (rule: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error('密码不能为空'))
        } else if (value !== pwdForm.newPwd) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  const data = {
    oldPwd: pwdForm.oldPwd,
    newPwd: pwdForm.newPwd
  }
  console.log(data)
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.pwd-card {
  /* padding: 18px; */

  .core-box {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      margin: 10px 0px;
    }

    .el-form {
      width: 280px;
      padding: 15px 20px 0px;
      border: 1px solid #e4e7ed;

      margin: 20px 0px;

      .btn-box :deep(.el-form-item__content) {
        justify-content: space-around;
      }
    }
  }
}
</style>
