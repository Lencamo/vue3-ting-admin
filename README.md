# vue3-ting-admin

This template should help get you started developing with Vue 3 in Vite.

## 项目后期规划

- [ ] 使用koa2编写后端接口（毕竟mock接口和真实的接口还是有区别的😂）
- [ ] vue3-ting-admin 暗色主题
- [ ] 第三方授权登录
- [ ] 手机号登录功能
- [ ] [Markdown、富文本编辑器](https://github.com/baimingxuan/vue-admin-design) 页
- [ ] 瀑布流布局 页
- [ ] 大文件上传 页
- [ ] 腾讯即时通讯 页（Pinia插件实现）

## 1、开发新模块

&emsp;&emsp;示例：我们要在商品中心（product）下，新建一个订单管理（order）

- 方式1：使用脚本

```sh
sh ting-module-generate.sh product order
```

- 方式2：使用脚手架

```sh
npm install lencamo-cli -g
lencamo-cli generate product order --module ting
```

## 2、开发环境

### -- [VSCode](https://code.visualstudio.com/)

[Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vsco) + [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig).

### -- [NVM](https://github.com/nvm-sh/nvm)

```sh
nvm install && nvm use # 匹配并使用当前项目node版本
```

## 3、项目流程

- 项目入口：

> ---> main.ts --> App.vue

- 数据流向：

> ---> services ---> [types] ---> stores ---> views

- 页面跳转：

> ---> App.vue ---> router --> views ---> pages

