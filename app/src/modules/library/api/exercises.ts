import { instance } from '@/shared/utils.ts'
import type { ExerciseInterface } from '@/modules/library/interfaces/exercises.interface.ts'

export const EXERCISE_API = {
  async get(limit: number, offset: number, categoryId?: number): Promise<ExerciseInterface[]> {
    const response = await instance({
      method: 'GET',
      url: '/exercises',
      params: {
        limit,
        offset,
        categoryId,
      },
    })
    return response.data
  },

  async getOne(id: number) {
    const response = await instance({
      method: 'GET',
      url: `/exercises/${id}`,
    })
    return response.data
  },
}
