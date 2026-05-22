import type { RouteRecordRaw } from 'vue-router'
import LoginPage from '@/modules/auth/views/LoginPage.vue'

const authRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
]

export default authRoutes
