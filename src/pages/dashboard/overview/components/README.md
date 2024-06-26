# vue3-ting-admin

&emsp;&emsp;vue3-ting-admin 是一个基于 vue3 + Element Plus 的、可以快速开发的、轻量级的RBAC权限管理系统基础模板。

&emsp;&emsp;本项目提供了多套项目模板，可以根据自己的需求选择不同的模板。项目还可以配合个人脚手架 lencamo-cli，快速获取项目模板，快速开发新模块。

## 在线预览

- [服务器部署预览](http://ting.lencamo.cn/)
- [vercel 部署预览](https://vue3-ting-admin.vercel.app/)

## 提交规范

&emsp;&emsp;本项目集成了commit message规范检查功能，请按照Angular规范提交代码使用。具体可阅读：[Angular提交规范](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit)

```md
<type>(<scope>): <subject>

- type：用于说明 commit 的类别，只允许使用下面的几个type标识
- scope：用于说明 commit 影响的范围，比如数据层、控制层、视图层等等（可以为空）
- subject：commit 目的的简短描述，不超过50个字符
```

<details>
  <summary>type标识说明</summary>

<br/>

| 标识     | 说明                                               |
| -------- | -------------------------------------------------- |
| feat     | 新功能（feature）                                  |
| fix      | 修复bug                                            |
| docs     | 文档（documentation）                              |
| dx       | 提升开发体验（developer experience）               |
| style    | 不影响代码含义的修改（空格、格式化、缺失的分号等） |
| refactor | 重构（refactoring，没有加新功能或修复bug）         |
| perf     | 提升性能（performance）                            |
| test     | 增加测试                                           |
| workflow | 工作流（workflows）                                |
| build    | 构建流程、外部依赖变动（如webpack、npm等）         |
| ci       | 持续集成（continuous integration）                 |
| chore    | 不属于以上类型的其他修改                           |
| types    | 类型定义文件更改                                   |
| wip      | 开发中                                             |
| release  | 发布版本                                           |

</details>

## 项目使用

### 1、根据不同需求，选择不同的模板

- 使用脚手架快速获取项目模板

```sh
npm install lencamo-cli -g
lencamo-cli generate project-name
```

### 2、组件、函数自动导入

&emsp;&emsp;本项目集成的vue、element-plus、iconify等可以直接使用，无需手动导入。

- 手动导入

```html
<template>
  <div>
    <el-button @click="open">按钮</el-button>
  </div>
</template>

<script lang="ts">
  import { ref } from 'vue'
  import { ElButton, ElMessage } from 'element-plus'

  const open = () => {
    ElMessage({
      message: 'Congrats, this is a success message.',
      type: 'success'
    })
  }
</script>
```

- 自动导入

```html
<template>
  <div>
    <el-button @click="open">按钮</el-button>
  </div>
</template>

<script lang="ts">
  const open = () => {
    ElMessage({
      message: 'Congrats, this is a success message.',
      type: 'success'
    })
  }
</script>
```

### 3、svg图标组件快捷使用

&emsp;&emsp;本项目集成了Iconify图标库，可以自由选择图标，并且提供了静态图标组件和动态图标组件两种使用方式，可以根据自己的需求选择。 图标名称格式为：

```sh
# collection - 图标集
# icon - 图标名称
{collection}-{icon}
```

```html
<template>
  <!-- 一、动态引入图标 -->
  <!-- 示例1 -->
  <el-icon size="25" color="#323435">
    <svgIcon :icon="isCollapse ? 'ep:expand' : 'ep:fold'"></svgIcon>
  </el-icon>
  <!-- 示例2 -->
  <el-icon v-for="item in iconList">
    <svgIcon :icon="item"></svgIcon>
  </el-icon>

  <!-- 二、静态引入图标 -->
  <!-- 示例1 -->
  <!-- 在线图标 -->
  <el-icon size="25" color="#323435">
    <EpExpand />
  </el-icon>
  <!-- 本地图标 -->
  <el-icon size="25" color="#323435">
    <!-- @/assets/svg/icon/expand.svg -->
    <TingExpand />
  </el-icon>
</template>

<script lang="ts">
  const iconList = ref(['ep:arrow-left', 'ant-design:arrow-left-outlined', 'bi:arrow-left'])
</script>
```

## 项目开发

### 1、项目开发环境

```sh
nvm install && nvm use # 匹配并使用当前项目node版本
```

### 2、快速开发新模块

- 使用脚本快速生成新模块

```sh
sh ting-module-generate.sh product order
```

- 使用脚手架快速生成新模块

```sh
npm install lencamo-cli -g
lencamo-cli generate product order --module ting
```

### 3、项目开发思想

- 项目入口：

> ---> main.ts --> App.vue

- 数据流向：

> ---> services ---> [types] ---> stores ---> views

- 页面跳转：

> ---> App.vue ---> router --> views ---> pages

## 打包部署

### 1、使用docker部署

&emsp;&emsp;本项目提供了docker快速部署脚本，可以一键部署到自己的服务器上

```sh
# 先保证自己服务器安装了docker环境
# 然后拷贝tign-docker-build.sh脚本到服务器上
# 运行脚本
sh ting-docker-build.sh

# 最后访问项目地址
http://服务器ip地址:81
```

2. 使用github CICD自动部署

&emsp;&emsp;本项目提供了github CICD自动部署yml模板，可以一键部署到自己的服务器上

```sh
# 使用示例
略
```

## 功能介绍

&emsp;&emsp;本项目，项目集成了常用的功能模块，包括：

- 完善简洁的RBAC权限管理功能（用户管理、部门管理、菜单管理、角色管理），权限控制深入到按钮级别，并且还提供了完善的Apifox接口文档
- 集成了暗色亮色切换、自定义Element Plus主题功能
- 集成了面包屑导航、标签页导航功能
- 集成了Iconify图标库，可以自由选择图标
- 集成了样式重置、多端适配方案
- 集成了Axios请求封装、Mock数据模拟功能
- 集成了Prettier + ESLint代码格式化规范
- 集成了commit message、代码规范检查功能

&emsp;&emsp;除此之外，本项目还提供了一些个人组件封装示例，如：

- 数字滚动count组件
- echart图表基础组件（并提供常见的图表示例，如：柱状图、折线图、饼图等）
- 密码强度校验条组件（并提供了可复用的密码修改模块）
- 各类前端实现的行为验证组件（如：canvas验证码、拖拽验证、滑动验证等）
- 扩展属性key-value组件
- 中国地区多级联动area-cascader组件
- ……

## 产生原因

&emsp;&emsp;作为前端开发者我仅仅想要一个轻量级的RBAC基础权限管理系统（最好携带接口文档或者node接口），不修改调整组件库默认样式或做过的的样式调整，集成了基础项目初始化所需要的一些功能即可。而市面上的很多权限管理系统大多不满足我的要求：

- 项目样式纵横于整个项目，不利用项目风格调整
- 功能太过于丰富，普通前端开发者入门门槛极高
- 权限管理过于强大复杂，且后端往往采用Java
- ……

## 项目结构

```
vue3-ting-admin
├─ .github
│  └─ workflows
│     └─ release.yml
├─ .vscode
│  ├─ extensions.json
│  └─ settings.json
├─ dist
├─ public
├─ scripts
├─ src
│  ├─ assets
│  │  ├─ imgs
│  │  ├─ styles
│  │  ├─ svg
│  │  └─ theme
│  ├─ components
│  ├─ config
│  ├─ directives
│  ├─ global
│  ├─ pages
│  ├─ router
│  ├─ services
│  ├─ stores
│  ├─ types
│  ├─ utils
│  ├─ view
│  ├─ App.vue
│  └─ main.ts
├─ Dockerfile
├─ README.md
├─ auto-imports.d.ts
├─ components.d.ts
├─ env.d.ts
├─ index.html
├─ nginx.conf
├─ package-lock.json
├─ package.json
├─ ting-docker-build.sh
├─ ting-module-generate.sh
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts
```
