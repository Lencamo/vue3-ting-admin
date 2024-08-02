<template>
  <div class="tags-view">
    <div class="left-icon" @click="handleLeftScroll">
      <el-icon :size="20"><EpArrowLeft /></el-icon>
    </div>
    <div ref="tagsBox" class="tags-box">
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
    <div class="right-icon" @click="handleRightScroll">
      <el-icon :size="20"><EpArrowRight /></el-icon>
    </div>
    <div class="clear-icon" @click="handleClearAll">
      <el-icon :size="20"><EpCircleClose /></el-icon>
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
    // 指定tag是否在第一个位置
    if (tagIndex === 0 && currentTagList.value.length > 1) {
      // 行为：第一个tag，点击后向后移动跳转
      currentTag.value = currentTagList.value[tagIndex + 1]
    } else {
      // 行为：非第一个tag，点击后向前移动跳转
      currentTag.value = currentTagList.value[tagIndex - 1]
    }

    // 路由跳转
    handleJump(currentTag.value)
  }

  // 2、删除指定tag元素
  currentTagList.value.splice(tagIndex, 1)
}

// ======= scroll handle ========

let tagsBox: any = ref<HTMLDivElement>()

// 点击按钮向左滚动
const handleLeftScroll = () => {
  tagsBox.value.scrollLeft -= 150
}

// 点击按钮向右滚动
const handleRightScroll = () => {
  tagsBox.value.scrollLeft += 150
}

// 点击按钮清除所有tag
const handleClearAll = () => {
  currentTagList.value = [currentTag.value as ITag]
}
</script>

<style lang="scss" scoped>
.is-active {
  background-color: #599cf8;
  color: #fff;
}

.tags-view {
  position: relative;
  height: 100%;

  .left-icon {
    position: absolute;
    left: 5px;
    top: 5px;
  }

  .right-icon {
    position: absolute;
    right: 45px;
    top: 5px;
  }

  .clear-icon {
    position: absolute;
    right: 15px;
    top: 5px;
  }

  .tags-box {
    /* margin: 0px 30px; */
    margin-left: 30px;
    margin-right: 70px;

    height: 100%;
    display: flex;
    align-items: center;

    // ✨ 滚动条
    overflow-y: scroll;

    &::-webkit-scrollbar {
      height: 4px;

      // bug修复：产生莫名其妙的padding-right
      width: 100%;
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
}
</style>
