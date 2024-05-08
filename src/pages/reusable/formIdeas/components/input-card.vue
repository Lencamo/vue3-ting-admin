<template>
  <div class="input-card">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="top-box">
          <h3>form表单</h3>
        </div>
      </template>
      <div class="core-box">
        <el-form :model="formDate">
          <el-form-item label="扩展属性">
            <key-value v-model:value="formDate.extraAttr" :del-limit="0"></key-value>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { reactive } from 'vue'

const formDate = reactive({
  extraAttr: [
    {
      attrKey: '像素',
      attrValue: '4000万'
    }
  ]
})

// ========

const emit = defineEmits(['checkData'])

// 监听值变化
watch(
  () => formDate,
  (newVal) => {
    emit('checkData', newVal)
  },
  { deep: true, immediate: true }
)
</script>

<style lang="scss" scoped>
.input-card {
  margin-bottom: 18px;

  .core-box {
    display: flex;
    flex-direction: column;
    align-items: center;

    .el-form {
      width: 80%;
      padding: 15px 20px 0px;
      border: 1px solid #e4e7ed;

      margin: 20px 0px;
    }
  }
}
</style>
