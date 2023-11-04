#!/bin/bash

# 添加 vue组件
mkdir -p ./src/components/$1/$2

if [ $? -eq 0 ]; then
  echo "添加 $2 组件 成功"
else
  echo "你的权限不足，添加 $2 组件失败"
fi

touch ./src/components/$1/$2/$2.vue
cat >./src/components/$1/$2/$2.vue <<EOF
<template>
  <div class="$2">
    <h2>$2</h2>
  </div>
</template>

<script setup lang="ts">
//
</script>

<style lang="scss" scoped>
.$2 {
  //
}
</style>
EOF

# 添加 组件路由
mkdir -p ./src/router/$1/$2

if [ $? -eq 0 ]; then
  echo "添加 $2 路由 成功"
else
  echo "你的权限不足，添加 $2 路由失败"
fi

touch ./src/router/$1/$2/$2.ts
cat >./src/router/$1/$2/$2.ts <<EOF
export default {
  path: '/main/$1/$2',
  component: () => import('@/components/$1/$2/$2.vue')
}
EOF
