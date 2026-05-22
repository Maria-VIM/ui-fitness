import { instance } from '@/shared/utils.ts'

export const EXERCISE_API = {
  async get(categoryId?: number) {
    const response = await instance({
      method: 'GET',
      url: '/exercises',
      params: { categoryId },
    })
    return response.data
  },
}
