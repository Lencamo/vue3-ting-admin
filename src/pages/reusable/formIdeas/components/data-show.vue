<template>
  <div class="data-show">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="top-box">
          <h3>数据</h3>
        </div>
      </template>
      <div class="core-box">
        <pre>{{ jsonData }}</pre>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['checkData'])

const jsonData = computed(() => {
  return JSON.stringify(props.checkData, null, 2)
})
</script>

<style lang="scss" scoped>
.data-show {
  //
}
</style>
