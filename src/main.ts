import 'normalize.css'
import './assets/styles/index.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/theme/index.scss'

import { createApp } from 'vue'
import App from './App.vue'
import registerPinia from './global/register-pinia.ts'
import router from './router/index.ts'
import registerIcons from './global/register-element-icons.ts'
import registerDirective from './directives/index.ts'

const app = createApp(App)

app.use(registerPinia) // 重点：必须放在router注册之前
app.use(router)
app.use(registerIcons)
app.use(registerDirective)

app.mount('#app')
