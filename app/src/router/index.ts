import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from '@/modules/auth/routes'
import libraryRoutes from '@/modules/library/routes'
import personalPlanRoutes from '@/modules/personal-plan/routes'
import adminRoutes from '@/modules/adminPanel/routes.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...authRoutes, ...libraryRoutes, ...personalPlanRoutes, ...adminRoutes],
})

export default router
