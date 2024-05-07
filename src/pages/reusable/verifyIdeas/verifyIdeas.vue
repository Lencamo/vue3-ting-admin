<template>
  <div class="verifyIdeas">
    <el-row :gutter="20">
      <el-col :span="12">
        <pwdCard></pwdCard>
      </el-col>
      <el-col :span="12">
        <others></others>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import pwdCard from './components/pwd-card.vue'
import others from './components/others.vue'
//
</script>

<style lang="scss" scoped>
.verifyIdeas {
  //
}
</style>
