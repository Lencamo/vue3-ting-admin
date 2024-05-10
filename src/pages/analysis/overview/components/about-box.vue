<template>
  <div class="about-box">
    <div class="top-box">
      <h3>关于</h3>
    </div>
    <div class="center-box">
      <el-text style="line-height: 27px; text-indent: 2em">
        <el-link :href="`https://github.com/Lencamo/${name}`" target="_blank" type="primary">
          {{ name }}
        </el-link>
        是一个基于Vue3.0、Vite、Element Plus、TypeScript
        的权限后台管理系统，提供现成的轻量级项目初始化方案，项目集成了常见的后台功能并提供了丰富的组件封装示例。
      </el-text>
      <el-alert
        title="本项目主要用于个人学习使用，如有错误，欢迎斧正。"
        type="success"
        :closable="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['name'])
</script>

<style lang="scss" scoped>
.about-box {
  background: var(--mainBoxBgColor);
  padding: 18px;

  .center-box {
    margin-top: 18px;
  }
}
</style>
