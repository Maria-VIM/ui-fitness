import type { RouteRecordRaw } from 'vue-router'
import AdminPage from '@/modules/adminPanel/views/AdminPage.vue'

const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    name: 'admin',
    component: AdminPage,
  },
]

export default adminRoutes
