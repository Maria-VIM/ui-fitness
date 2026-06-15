import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)
import './shared/styles/base.css'
import { setupAuthRouter } from '@/modules/auth/router-setup.ts'
import { useAuthStore } from '@/modules/auth/store'

app.use(createPinia())
app.use(VueQueryPlugin)
app.use(router)

const authStore = useAuthStore()
await authStore.checkAuth()

setupAuthRouter()

app.mount('#app')
