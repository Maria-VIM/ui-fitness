import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from '@/modules/auth/routes'
import libraryRoutes from '@/modules/library/routes'
import personalPlanRoutes from '@/modules/personal-plan/routes'
import adminRoutes from '@/modules/adminPanel/routes.ts'
import homeRoutes from '@/modules/home/routes.ts'
import sharedRoutes from '@/shared/routes.ts'

const router = createRouter({
  history: createWebHistory('wellness'),
  routes: [
    ...authRoutes,
    ...libraryRoutes,
    ...personalPlanRoutes,
    ...adminRoutes,
    ...homeRoutes,
    ...sharedRoutes,
  ],
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next('/home')
  } else {
    next()
  }
})

export default router
