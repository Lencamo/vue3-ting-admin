import 'normalize.css'
import './assets/css/index.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.ts'
import pinia from './stores/index.ts'
import registerIcons from './global/register-element-icons.ts'

import useloginStore from './stores/login/login'
const loginStore = useloginStore()

const app = createApp(App)

app.use(pinia) // 重点：必须放在router注册之前
loginStore.dynamicRoutesCacheAction() // 动态路由-防刷新处理

app.use(router)
app.use(registerIcons)

app.mount('#app')
