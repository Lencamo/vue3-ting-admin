<template>
  <div class="phone-form">
    <el-form :model="phoneForm" :rules="formRules" ref="phoneFormRef" label-width="70px">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="phoneForm.phone" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="codeBox">
          <el-input class="w-50 m-2" v-model="phoneForm.code" />
          <div class="code">xdag</div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormRules, FormInstance } from 'element-plus'

const phoneForm = reactive({
  phone: '',
  code: ''
})

// 表单校验
const formRules = reactive<FormRules>({
  phone: [
    { required: true, message: '手机号不能为空', trigger: 'blur' },
    { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
  ],
  code: [{ required: true, message: '用户名不能为空', trigger: 'blur' }]
})

// 待调用函数
const phoneFormRef = ref<FormInstance>()
const phoneLoginAction = () => {
  console.log(phoneForm)
  phoneFormRef.value?.validate((valid, fields) => {
    if (valid) {
      ElMessage.success('表单校验成功！')
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

  .codeBox {
    display: flex;
    justify-content: center;

    .code {
      width: 120px;
      border: 1px solid #dcdfe6;
      margin: 0px 5px;
      text-align: center;
      background-color: #c2c7cc;
    }
  }
}
</style>
