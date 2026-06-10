import type { RouteRecordRaw } from 'vue-router'
import HomePage from '@/modules/home/views/HomePage.vue'

const homeRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: HomePage,
    meta: { requiresAuth: true },
  },
]

export default homeRoutes
