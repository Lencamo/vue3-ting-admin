import { Icon } from '@iconify/vue'
import type { App } from 'vue'

// 全局注册 Iconify 图标组件
const registerIcons = (app: App<Element>) => {
  app.component('svgIcon', Icon)
}

export default registerIcons
