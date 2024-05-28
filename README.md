# vue3-ting-admin

&emsp;&emsp;vue3-ting-admin 是一个基于 vue3 + Element Plus 的、可以快速开发的、轻量级的RBAC权限管理系统基础模板。

&emsp;&emsp;本项目提供了多套项目模板，可以根据自己的需求选择不同的模板。项目还可以配合个人脚手架 lencmo-cli，快速获取项目模板，快速开发新模块。

## 在线预览

- [vercel 预览](https://vue3-ting-admin.vercel.app/)
- [本地启动预览](http://localhost:5173)

## 项目开发

- 项目开发环境

```sh
nvm install && nvm use # 匹配并使用当前项目node版本
```

- 快速开发新模块

1. 使用脚本快速生成新模块

```sh
sh ting-module-generate.sh product order
```

2. 使用脚手架快速生成新模块

```sh
npm install lencamo-cli -g
lencamo-cli generate product order --module ting
```

- 项目开发思想

1. 项目入口：

> ---> main.ts --> App.vue

2. 数据流向：

> ---> services ---> [types] ---> stores ---> views

3. 页面跳转：

> ---> App.vue ---> router --> views ---> pages

## 提交规范

&emsp;&emsp;本项目使用 Angular 提交规范，具体可阅读：[Angular提交规范](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit)

```
<type>(<scope>): <subject>

- type：用于说明 commit 的类别，只允许使用下面的几个type标识
- scope：用于说明 commit 影响的范围，比如数据层、控制层、视图层等等（可以为空）
- subject：commit 目的的简短描述，不超过50个字符
```

<details>
  <summary>type标识说明</summary>

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

- 根据不同需求，选择不同的模板

```ts
lencamo-cli generate project-name
```

- 自动导入、自动注册组件

```ts

```

- svg图标组件快捷使用

<details>
  <summary>代码示例</summary>
  
```vue
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

const icons = ref(['ep:arrow-left', 'ant-design:arrow-left-outlined', 'bi:arrow-left'])

</script>

````

</details>

## 项目介绍

&emsp;&emsp;本项目，项目集成了常用的功能模块，包括：

- 完善简洁的RBAC权限管理功能（用户管理、部门管理、菜单管理、角色管理），权限控制深入到按钮级别，并且还提供了完善的Apifox接口文档
- 集成了暗色亮色切换、自定义Element Plus主题功能
- 集成了面包屑导航、标签页导航功能
- 集成了Iconify图标库，可以自由选择图标
- 集成了样式重置、多端适配方案
- 集成了Axios请求封装、Mock数据模拟功能
- 集成了Prettier + ESLint代码格式化规范
- 集成了git zsh自动提示、代码提交规范检查功能

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

## 打包部署

1. 使用github CICD自动部署

```sh
npm run deploy
````

2. 使用docker部署

```sh
docker build -t vue3-ting-admin .
docker run -p 8080:8080 -d vue3-ting-admin
```

## 项目结构

```
vue3-ting-admin
├─ public
│  └─ favicon.ico
├─ scripts
│  └─ verify-commit-msg.mjs
├─ src
│  ├─ assets
│  │  ├─ imgs
│  │  │  ├─ default.png
│  │  │  └─ vite.png
│  │  ├─ styles
│  │  │  ├─ common.scss
│  │  │  ├─ index.scss
│  │  │  ├─ reset.scss
│  │  │  └─ variable.scss
│  │  └─ theme
│  │     ├─ index.scss
│  │     ├─ theme-dark.scss
│  │     └─ theme-light.scss
│  ├─ components
│  │  ├─ data-comp
│  │  │  ├─ count
│  │  │  │  ├─ countup-js.vue
│  │  │  │  └─ use-transition.vue
│  │  │  └─ echart
│  │  │     └─ echart-base.vue
│  │  ├─ form-comp
│  │  │  ├─ cascader
│  │  │  │  ├─ area-cascader
│  │  │  │  │  ├─ area-cascader.vue
│  │  │  │  │  ├─ china-division.d.ts
│  │  │  │  │  └─ china-divisions.data.ts
│  │  │  │  └─ other
│  │  │  ├─ input
│  │  │  │  └─ key-value.vue
│  │  │  ├─ select
│  │  │  └─ upload
│  │  ├─ layout-tool
│  │  │  ├─ msg-box
│  │  │  ├─ screen-full
│  │  │  │  └─ screen-full.vue
│  │  │  ├─ tags-view
│  │  │  │  └─ tags-view.vue
│  │  │  └─ toggle-dark
│  │  │     └─ toggle-dark.vue
│  │  └─ verify-comp
│  │     ├─ canvas-verify
│  │     │  └─ canvas-verify.vue
│  │     ├─ drag-verify
│  │     │  └─ drag-verify.vue
│  │     ├─ puzzle-verify
│  │     │  └─ puzzle-verify.vue
│  │     └─ pwd-strength
│  │        └─ strength-bar.vue
│  ├─ config
│  │  └─ constants.ts
│  ├─ directives
│  │  ├─ permission
│  │  │  └─ permissions.ts
│  │  └─ index.ts
│  ├─ global
│  │  ├─ element-icons-list.ts
│  │  ├─ register-element-icons.ts
│  │  └─ register-pinia.ts
│  ├─ pages
│  │  ├─ analysis                             # 系统总览
│  │  │  ├─ dashboard
│  │  │  │  ├─ components
│  │  │  │  │  ├─ count-card.vue
│  │  │  │  │  └─ echart-line.vue
│  │  │  │  ├─ dashboard.d.ts
│  │  │  │  ├─ dashboard.data.ts
│  │  │  │  └─ dashboard.vue
│  │  │  └─ overview
│  │  │     ├─ components
│  │  │     │  ├─ about-box.vue
│  │  │     │  └─ desc-box.vue
│  │  │     ├─ overview.d.ts
│  │  │     ├─ overview.data.ts
│  │  │     └─ overview.vue
│  │  ├─ moment                               # 动态
│  │  │  ├─ list
│  │  │  │  └─ list.vue
│  │  │  └─ main
│  │  │     └─ main.vue
│  │  ├─ reusable                             # 组件复用
│  │  │  ├─ formIdeas
│  │  │  │  ├─ components
│  │  │  │  │  ├─ data-show.vue
│  │  │  │  │  └─ form-card.vue
│  │  │  │  └─ formIdeas.vue
│  │  │  ├─ others
│  │  │  │  └─ others.vue
│  │  │  └─ verifyIdeas
│  │  │     ├─ components
│  │  │     │  ├─ behavior-card.vue
│  │  │     │  └─ pwd-card.vue
│  │  │     └─ verifyIdeas.vue
│  │  └─ system                               # 系统管理
│  │     ├─ department
│  │     │  ├─ components
│  │     │  │  ├─ department-body.vue
│  │     │  │  ├─ department-dialog.vue
│  │     │  │  └─ department-header.vue
│  │     │  └─ department.vue
│  │     ├─ menu
│  │     │  ├─ components
│  │     │  │  ├─ menu-body.vue
│  │     │  │  ├─ menu-dialog.vue
│  │     │  │  └─ menu-header.vue
│  │     │  └─ menu.vue
│  │     ├─ role
│  │     │  ├─ components
│  │     │  │  ├─ role-body.vue
│  │     │  │  ├─ role-dialog.vue
│  │     │  │  └─ role-header.vue
│  │     │  └─ role.vue
│  │     └─ user
│  │        ├─ components
│  │        │  ├─ user-body.vue
│  │        │  ├─ user-dialog.vue
│  │        │  └─ user-header.vue
│  │        └─ user.vue
│  ├─ router
│  │  ├─ analysis                             # 系统总览
│  │  │  ├─ dashboard
│  │  │  │  └─ dashboard.ts
│  │  │  └─ overview
│  │  │     └─ overview.ts
│  │  ├─ moment                               # 动态
│  │  │  ├─ list
│  │  │  │  └─ list.ts
│  │  │  └─ main
│  │  │     └─ main.ts
│  │  ├─ reusable                             # 组件复用
│  │  │  ├─ formIdeas
│  │  │  │  └─ formIdeas.ts
│  │  │  ├─ others
│  │  │  │  └─ others.ts
│  │  │  └─ verifyIdeas
│  │  │     └─ verifyIdeas.ts
│  │  ├─ system                               # 系统管理
│  │  │  ├─ department
│  │  │  │  └─ department.ts
│  │  │  ├─ menu
│  │  │  │  └─ menu.ts
│  │  │  ├─ role
│  │  │  │  └─ role.ts
│  │  │  └─ user
│  │  │     └─ user.ts
│  │  └─ index.ts
│  ├─ services
│  │  ├─ modules
│  │  │  ├─ login
│  │  │  │  └─ login.ts
│  │  │  ├─ main
│  │  │  │  ├─ entires
│  │  │  │  │  └─ main.ts
│  │  │  │  └─ system.ts # 系统管理
│  │  │  └─ demo.ts
│  │  ├─ request
│  │  │  ├─ config.ts
│  │  │  ├─ index.ts
│  │  │  └─ types.ts
│  │  └─ index.ts
│  ├─ stores
│  │  ├─ login
│  │  │  └─ login.ts
│  │  ├─ main
│  │  │  ├─ entires
│  │  │  │  └─ main.ts
│  │  │  └─ system.ts # 系统管理
│  │  ├─ demo.ts
│  │  └─ index.ts
│  ├─ types
│  │  ├─ login.d.ts
│  │  └─ system.d.ts
│  ├─ utils
│  │  ├─ cache.ts
│  │  ├─ data-format.ts
│  │  ├─ generateTree.ts
│  │  ├─ initDynamicRoutes.ts
│  │  ├─ is.ts
│  │  ├─ map-menus.ts
│  │  └─ map-path.ts
│  ├─ view
│  │  ├─ 404
│  │  │  └─ not-found.vue
│  │  ├─ demo
│  │  │  └─ demo.vue
│  │  ├─ home
│  │  │  ├─ main-container
│  │  │  │  └─ main-container.vue
│  │  │  ├─ nav-aside
│  │  │  │  └─ nav-aside.vue
│  │  │  ├─ nav-header
│  │  │  │  └─ nav-header.vue
│  │  │  └─ home.vue
│  │  └─ login
│  │     ├─ components
│  │     │  ├─ login-panel.vue
│  │     │  ├─ phone-form.vue
│  │     │  └─ pwd-form.vue
│  │     └─ login.vue
│  ├─ App.vue
│  └─ main.ts
├─ README.md
├─ auto-imports.d.ts
├─ components.d.ts
├─ env.d.ts
├─ index.html
├─ package-lock.json
├─ package.json
├─ ting-module-generate.sh
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts
```
