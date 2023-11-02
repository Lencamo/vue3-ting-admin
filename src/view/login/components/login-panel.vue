<template>
  <div class="login-panel">
    <h2>权限管理系统</h2>
    <div class="tabs">
      <el-tabs v-model="loginWays" type="border-card" stretch>
        <el-tab-pane label="帐号登录" name="pwd">
          <pwdForm ref="pwdFormRef"></pwdForm>
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="phone">
          <phoneForm ref="phoneFormRef"></phoneForm>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="foundBack">
      <el-checkbox v-model="isRemeber" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" @click="handleLoginBtn">立即登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import pwdForm from './pwd-form.vue'
import phoneForm from './phone-form.vue'
import { localCache } from '@/utils/cache.ts'
import { CACHE_REMEBER } from '@/config/constants.ts'

// 记住密码
const isRemeber = ref<boolean>(localCache.getCache(CACHE_REMEBER) ?? false)
// 测试
watch(isRemeber, (newvalue, oldvalue) => {
  // console.log(newvalue)
  localCache.setCache(CACHE_REMEBER, newvalue)
})

// 登录方式
const loginWays = ref('pwd')
const pwdFormRef = ref<InstanceType<typeof pwdForm>>()
const phoneFormRef = ref<InstanceType<typeof phoneForm>>()
// 表单验证
const handleLoginBtn = () => {
  if (loginWays.value === 'pwd') {
    // console.log('使用密码进行登录')
    pwdFormRef.value?.pwdLoginAction(isRemeber.value)
  } else {
    // console.log('使用手机号进行登录')
    phoneFormRef.value?.phoneLoginAction()
  }
}
</script>

<style lang="scss" scoped>
.login-panel {
  width: 300px;

  display: flex;
  flex-direction: column;

  background-color: #c2c7cc;
  padding: 20px;

  h2 {
    height: 50px;
    text-align: center;
  }

  .foundBack {
    display: flex;
    justify-content: space-between;
    margin: 5px 5px;
  }
}
</style>
