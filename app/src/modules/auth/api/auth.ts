import { instance } from '@/shared/utils.ts'
import type { LoginFormInterface } from '@/modules/auth/interfaces/login-form.interface.ts'
import type { RegistrationFormInterface } from '@/modules/auth/interfaces/registration-form.interface.ts'

export const AUTH_API = {
  async logIn(body: LoginFormInterface) {
    const response = await instance({
      method: 'POST',
      url: `auth/login`,
      data: body,
    })
    return response.data
  },
  async createAccount(body: RegistrationFormInterface) {
    const response = await instance({
      method: 'POST',
      url: `users`,
      data: body,
    })
    return response.data
  },
  async logOut() {
    const response = await instance({
      method: 'POST',
      url: `auth/logout`,
    })
    return response.data
  },
  async getUserInfo() {
    const response = await instance({
      method: 'GET',
      url: `auth/user`,
    })
    console.log(response)
    return response.data
  },
  async sendConfirmCodeAgain(email: string) {
    const response = await instance({
      method: 'POST',
      url: `verification`,
      params: { email },
    })
    console.log(response)
    return response.data
  },

  async confirmAccount(email: string, code: string) {
    const response = await instance({
      method: 'PUT',
      url: `verification`,
      params: { email, code },
    })
    console.log(response)
    return response.data
  },
}
