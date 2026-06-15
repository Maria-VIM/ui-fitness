import { instance } from '@/shared/utils.ts'

export const STATES_API = {
  async getTotalSession(): Promise<number> {
    const response = await instance({
      method: 'GET',
      url: `workouts/total`,
    })

    return response.data
  },

  async getActiveTotal(): Promise<number> {
    const response = await instance({
      method: 'GET',
      url: `workouts/active/total`,
    })

    return response.data
  },

  async getTotalPlans(): Promise<number> {
    const response = await instance({
      method: 'GET',
      url: `workout/session/total`,
    })

    return response.data
  },
}
