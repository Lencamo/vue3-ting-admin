# vue3-ting-admin

&emsp;&emsp;vue3-ting-admin 是一个基于 vue3 + Element Plus 的、可以快速开发的、轻量级的RBAC权限管理系统基础模板。

&emsp;&emsp;本项目提供了多套项目模板，可以根据自己的需求选择不同的模板。项目还可以配合个人脚手架 lencmo-cli，快速获取项目模板，快速开发新模块。

## 产生原因

&emsp;&emsp;作为前端开发者我仅仅想要一个轻量级的RBAC基础权限管理系统（最好携带接口文档或者node接口），不修改调整组件库默认样式或做过的的样式调整，集成了基础项目初始化所需要的一些功能即可。而市面上的很多权限管理系统大多不满足我的要求：

- 项目样式纵横于整个项目，不利用项目风格调整
- 功能太过于丰富，普通前端开发者入门门槛极高
- 权限管理过于强大复杂，且后端往往采用Java
- ……

## 在线预览

- [vercel 预览](https://vue3-ting-admin.vercel.app/)
- [本地启动预览](http://localhost:5173)

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

## 打包部署

1. 使用github CICD自动部署

```sh
npm run deploy
```

2. 使用docker部署

```sh
docker build -t vue3-ting-admin .
docker run -p 8080:8080 -d vue3-ting-admin
```

## 项目使用

- 自动导入、自动注册组件

```ts

```

- svg图标组件快捷使用

```ts

```

- 根据不同需求，选择不同的模板

```ts
lencamo-cli generate project-name
```

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

## 项目结构

```
├── public
├── src
│   ├── assets
│   ├── components
│   ├── config
│   ├── directives
│   ├── filters
│   ├── icons
│   ├── locales
│   ├── mock
│   ├── plugins
│   ├── router
│   ├── services
│   ├── styles
│   ├── store
│   ├── utils
│   ├── views
│   ├── App.vue
│   ├── main.ts
│   └── shims-vue.d.ts
├── .editorconfig
├── .env.development
├── .env.production
├── .env.staging
├── .eslintrc.js
├── .gitignore
├──  babel.config.js
├──  package.json
├──  package-lock.json
├──  README.md
├──  tsconfig.json
└──  vue.config.js
```
