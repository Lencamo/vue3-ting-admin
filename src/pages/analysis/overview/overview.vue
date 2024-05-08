<template>
  <div class="overview">
    <aboutBox :name="name"></aboutBox>
    <descBox title="项目信息" :descArr="projectDetails"></descBox>
    <descBox title="生产环境依赖" :descArr="dependDetails"></descBox>
    <descBox title="开发环境依赖" :descArr="devDependDetails"></descBox>
  </div>
</template>

<script setup lang="ts">
import aboutBox from './components/about-box.vue'
import descBox from './components/desc-box.vue'
import type { IDescItem } from './overview'

// package.json文件信息
const { pkg, lastBuildTime } = __APP_INFO__
const { name, version, dependencies, devDependencies } = pkg

// 对象处理工具函数
const objToDescArr = (obj) => {
  const descArr: IDescItem[] = []
  Object.keys(obj).forEach((key) => {
    descArr.push({
      label: key,
      value: obj[key],
      isTag: true
    })
  })

  return descArr
}

// =======

const projectDetails: IDescItem[] = [
  {
    label: '项目作者',
    value: 'Lencamo',
    linkUrl: 'https://lencamo.cn/'
  },
  {
    label: '最新版本',
    value: version,
    isTag: true
  },
  {
    label: '最近编译',
    value: lastBuildTime
  },
  {
    label: '项目文档',
    value: '待开发……'
  },
  {
    label: '在线预览',
    value: 'Vercel演示',
    linkUrl: 'https://vue3-ting-admin.vercel.app'
  },
  {
    label: '项目地址',
    value: 'Github地址',
    linkUrl: 'https://github.com/Lencamo/vue3-ting-admin'
  }
]

const dependDetails = objToDescArr(dependencies)
const devDependDetails = objToDescArr(devDependencies)
</script>

<style lang="scss" scoped>
.overview {
}
</style>
