import { defineStore } from 'pinia'
import { AUTH_API } from '@/modules/auth/api/auth.ts'
import router from '@/router/index.ts'
import type { LoginFormInterface } from '@/modules/auth/interfaces/login-form.interface.ts'
import type { LoginUserInterface } from '@/modules/auth/interfaces/LoginUserInterface.ts'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loading: false,
    user: null as LoginUserInterface | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.user?.isAdmin,
  },
  actions: {
    async login(body: LoginFormInterface): Promise<boolean> {
      try {
        this.loading = true
        await AUTH_API.logIn(body)
        const user = await this.getCurrentUser()
        return !!user
      } catch (error) {
        this.user = null
        return false
      } finally {
        this.loading = false
      }
    },
    async logout() {
      try {
        this.loading = true
        await AUTH_API.logOut()
        this.user = null
        await router.replace('/auth?name=login')
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async getCurrentUser(): Promise<LoginUserInterface | null> {
      try {
        const user = await AUTH_API.getUserInfo()
        this.user = user
        return user
      } catch (error) {
        this.user = null
        return null
      }
    },
    async checkAuth() {
      return await this.getCurrentUser()
    },
  },
})
