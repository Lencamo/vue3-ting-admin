# vue3-ting-admin

This template should help get you started developing with Vue 3 in Vite.

## 1、开发环境

### -- [VSCode](https://code.visualstudio.com/)

[Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vsco) + [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig).

### -- [NVM](https://github.com/nvm-sh/nvm)

```sh
nvm install && nvm use # 匹配并使用当前项目node版本
```

## 2、项目流程

- 项目入口：

> ---> main.ts --> App.vue

- 数据流向：

> ---> services ---> [types] ---> stores ---> views

- 页面跳转：

> ---> App.vue ---> router --> views

## 3、开发新模块

&emsp;&emsp;示例：我们要在商品中心（product）下，新建一个订单管理（order）

> 为确保执行sh命令不会遇到权限问题，建议在vscode中将Git Bash设置为默认终端

```sh
sh ting-module-generate.sh product order
```
