<template>
  <div class="login">
    <div class="login-tools">
      <span><screen-full></screen-full></span>
      <span><toggle-dark></toggle-dark></span>
    </div>
    <div class="login-box">
      <LoginPanel></LoginPanel>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginPanel from './components/login-panel.vue'
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;

  .login-tools {
    position: absolute;
    right: 20px;
    top: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    span {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0px 10px;
      cursor: pointer;
    }
  }

  .login-box {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
  }
}
</style>
