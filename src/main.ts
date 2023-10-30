import 'normalize.css'
import './assets/css/index.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.ts'
import pinia from './stores/index.ts'
import registerIcons from './global/register-element-icons.ts'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(registerIcons)

app.mount('#app')
