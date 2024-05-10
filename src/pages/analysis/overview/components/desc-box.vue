<template>
  <div class="desc-box">
    <el-descriptions class="margin-top" :title="title" :column="2" border>
      <el-descriptions-item v-for="(item, index) in descArr" :key="index">
        <template #label>
          <div class="cell-item">{{ item.label }}</div>
        </template>
        <span v-if="item.linkUrl">
          <el-link :href="item.linkUrl" target="_blank" type="primary">
            {{ item.value }}
          </el-link>
        </span>
        <span v-else-if="item.isTag">
          <el-tag type="primary">{{ item.value }}</el-tag>
        </span>
        <span v-else>
          {{ item.value }}
        </span>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
import type { IDescItem } from '../overview'

interface Props {
  title: string
  descArr: IDescItem[]
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.desc-box {
  background: var(--mainBoxBgColor);
  padding: 18px;

  margin-top: 20px;
}
</style>
