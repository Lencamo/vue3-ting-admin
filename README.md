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

> ---> [types] ---> services ---> stores ---> views

- 页面跳转：

> ---> App.vue ---> router --> views
