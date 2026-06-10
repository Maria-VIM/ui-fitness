import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from '@/modules/auth/routes'
import libraryRoutes from '@/modules/library/routes'
import personalPlanRoutes from '@/modules/personal-plan/routes'
import adminRoutes from '@/modules/adminPanel/routes.ts'
import homeRoutes from '@/modules/home/routes.ts'

const router = createRouter({
  history: createWebHistory('wellness'),
  routes: [...authRoutes, ...libraryRoutes, ...personalPlanRoutes, ...adminRoutes, ...homeRoutes],
})

export default router
