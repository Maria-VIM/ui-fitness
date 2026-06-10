import router from '@/router'
import { useAuthStore } from '@/modules/auth/store'

export function setupAuthRouter() {
  router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()
    if (!authStore.user) {
      await authStore.checkAuth()
    }
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      next('/auth?name=login')
    } else if (to.path === '/auth' && to.query.name === 'login' && authStore.isAuthenticated) {
      next('/personal')
    } else {
      next()
    }
  })
}
