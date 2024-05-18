<template>
  <div class="login-panel">
    <h2>vue3-ting-admin</h2>
    <div class="tabs">
      <el-tabs v-model="loginWays" stretch>
        <el-tab-pane label="帐号登录" name="pwd">
          <pwdForm ref="pwdFormRef"></pwdForm>
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="phone">
          <phoneForm ref="phoneFormRef"></phoneForm>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="login">
      <el-button style="width: 100%" type="primary" size="large" @click="handleLoginBtn"
        >立即登录</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import pwdForm from './pwd-form.vue'
import phoneForm from './phone-form.vue'

// 登录方式
const loginWays = ref('pwd')
const pwdFormRef = ref<InstanceType<typeof pwdForm>>()
const phoneFormRef = ref<InstanceType<typeof phoneForm>>()
// 表单验证
const handleLoginBtn = () => {
  if (loginWays.value === 'pwd') {
    // console.log('使用密码进行登录')
    pwdFormRef.value?.pwdLoginAction()
  } else {
    // console.log('使用手机号进行登录')
    phoneFormRef.value?.phoneLoginAction()
  }
}
</script>

<style lang="scss" scoped>
.login-panel {
  width: 400px;
  border-radius: 8px;

  display: flex;
  flex-direction: column;

  background-color: var(--mainBoxBgColor);
  padding: 20px;

  h2 {
    height: 50px;
    text-align: center;
  }

  .tabs {
    padding: 0px 25px;
  }

  .login {
    padding: 0px 25px;
    margin-bottom: 18px;
  }
}
</style>
