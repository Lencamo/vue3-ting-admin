<template>
  <div class="waterfall">
    <div class="grid">
      <div data-aos="flip-left" class="grid-item" v-for="i in 55" :key="i">
        <img :src="`https://picsum.photos/200/${Math.floor(rand(100, 250))}`" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Masonry from 'masonry-layout'
import imagesloaded from 'imagesloaded'
import { rand } from '@vueuse/core'

const masonry = ref()

onUnmounted(() => {
  masonry.value.destroy()
})

onMounted(() => {
  // 堆叠问题解决方案1：
  // https://github.com/desandro/masonry/issues/1161#issuecomment-1024974937
  // https://github.com/jlmakes/scrollreveal/issues/475#issuecomment-450044536
  // https://github.com/jlmakes/scrollreveal/issues/286#issuecomment-285899627
  // Promise.all(
  //   Array.from(document.images)
  //     .filter((img) => !img.complete)
  //     .map(
  //       (img) =>
  //         new Promise((resolve) => {
  //           img.onload = img.onerror = resolve
  //         })
  //     )
  // ).then(() => {
  //   masonry.value = new Masonry('.grid', {
  //     itemSelector: '.grid-item',
  //     gutter: 10
  //   })

  //   scrollreveal('.grid-item', {
  //     duration: 500,
  //     viewFactor: 0,
  //     reset: true
  //   })
  // })

  // 堆叠问题方案2
  // - 1. 初始化 Masonry 实例
  masonry.value = new Masonry('.grid', {
    itemSelector: '.grid-item',
    columnWidth: 200,
    // horizontalOrder: true,
    gutter: 10
  })
  // - 2. 图片全部加载完成后，重新布局
  imagesloaded('.grid-item', function () {
    masonry.value.layout()
  })
})
</script>

<style lang="scss" scoped>
.waterfall {
  background: var(--mainBoxBgColor);
  padding: 18px;

  .grid {
    width: 100%;

    .grid-item {
      margin-bottom: 15px;

      width: 200px; // 🤔

      img {
        display: block;
        max-width: 100%;
      }
    }
  }
}
</style>
