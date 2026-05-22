import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)

import './shared/styles/base.css'

app.use(createPinia())
app.use(VueQueryPlugin)
app.use(router)

app.mount('#app')
