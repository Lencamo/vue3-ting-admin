import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { App } from 'vue'

// 批量全局注册element-plus图标组件
const registerIcons = (app: App<Element>) => {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}

export default registerIcons
