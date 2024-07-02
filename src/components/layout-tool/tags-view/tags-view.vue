<template>
  <div class="tags-view">
    <div
      v-for="tag in currentTagList"
      :key="tag?.title"
      :class="['tags-item', { 'is-active': tag === currentTag ? true : false }]"
    >
      <span v-show="tag === currentTag">●</span>
      <span @click="handleJump(tag)">{{ tag?.title }}</span>
      <span v-show="currentTagList.length > 1" @click="handleClose(tag)">✕</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import useMainStore from '@/stores/main/entires/main.ts'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const mainStore = useMainStore()
const { originalMenuList } = storeToRefs(mainStore)

interface ITag {
  title: string
  path: string
}

// ======= init data ========

const originalTagList = ref<ITag[]>([])

const getTagList = () => {
  originalTagList.value = originalMenuList.value.map((item) => {
    return {
      title: item.name,
      path: item.url
    }
  })
}

// getTagList()

// ======== tags view ========

const currentTag = ref<ITag>()
const currentTagList = ref<ITag[]>([])

const route = useRoute()

watch(
  () => route.path,
  (newVal) => {
    if (originalTagList.value.length > 0) {
      const routeTag = originalTagList.value.filter((item) => item.path === newVal)
      currentTagList.value = Array.from(new Set([...currentTagList.value, routeTag[0]]))

      // 点击nav-aside跳转处理
      currentTag.value = routeTag[0]
    }

    if (isFirst.value === 1) {
      firstWatch() // 清理初始化时多余的watch
    }
  }
  // { immediate: true }
)

// bug修复：生命周期原因导致originalMenuList值为空
const isFirst = ref(0)
const firstWatch = watch(
  () => originalMenuList.value,
  (newVal) => {
    if (newVal.length > 0 && isFirst.value === 0) {
      getTagList() // 更换 getTagList 调用时机

      const routeTag = originalTagList.value.filter((item) => item.path === route.path)
      currentTagList.value = Array.from(new Set([...currentTagList.value, routeTag[0]]))

      // 点击nav-aside跳转处理
      currentTag.value = routeTag[0]

      isFirst.value++
    }
  },
  {
    immediate: true
  }
)

// --------

// ======= tags aciton ========

const router = useRouter()
const handleJump = (tag: ITag) => {
  // 点击tag跳转处理
  currentTag.value = tag
  router.push(tag.path)
}

const handleClose = (tag: ITag) => {
  const tagIndex = currentTagList.value.findIndex((t) => t.title === tag.title)

  // 1、active样式转移
  // 指定tag是否为当前页tag
  if (currentTag.value === tag) {
    // 指定tag是否在第二个位置
    if (tagIndex === 1 && currentTagList.value.length - 1 > tagIndex) {
      currentTag.value = currentTagList.value[tagIndex + 1]
    } else {
      currentTag.value = currentTagList.value[tagIndex - 1]
    }

    // 路由跳转
    handleJump(currentTag.value)
  }

  // 2、删除指定tag元素
  currentTagList.value.splice(tagIndex, 1)
}
</script>

<style lang="scss" scoped>
.is-active {
  background-color: #599cf8;
  color: #fff;
}

.tags-view {
  height: 100%;
  margin: 0px 20px;

  display: flex;
  align-items: center;

  // ✨ 滚动条
  overflow: scroll;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 2px;
  }

  .tags-item {
    margin: 0px 5px;
    border: 1px solid #dfe1e8;
    padding: 5px;

    font-size: 11px;

    display: flex; // 子元素水平排列

    span {
      margin: 0px 4px;
      cursor: pointer;

      white-space: nowrap; // ✨ 防止换行
    }
  }
}
</style>
