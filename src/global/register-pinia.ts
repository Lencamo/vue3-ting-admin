import type { App } from 'vue'

import pinia from '@/stores/index.ts'
import useloginStore from '@/stores/login/login.ts'

const registerPinia = (app: App<Element>) => {
  app.use(pinia)

  const loginStore = useloginStore()
  loginStore.routesCacheAction() // 防刷新处理
}

export default registerPinia
