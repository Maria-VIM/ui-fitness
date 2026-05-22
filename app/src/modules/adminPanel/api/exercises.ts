import { instance } from '@/shared/utils.ts'
import type { ExerciseFormInterface } from '@/modules/adminPanel/interfaces/exercises/exercise-form.interface.ts'

export const EXERCISE_API = {
  async get(categoryId?: number) {
    const response = await instance({
      method: 'GET',
      url: '/exercises/all',
      params: { categoryId },
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

  async create(body: ExerciseFormInterface) {
    const response = await instance({
      method: 'POST',
      url: `/exercises`,
      data: body,
    })
    return response.data
  },

  async uploadImage(body: FormData) {
    const { data } = await instance.post('/exercises/image', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  },

  async update(id: number, body: ExerciseFormInterface) {
    const response = await instance({
      method: 'PUT',
      url: `/exercises/${id}`,
      data: body,
    })
    return response.data
  },

  async addTag(id: number, categoryId: number) {
    const response = await instance({
      method: 'POST',
      url: `/exercises/${id}/categories/${categoryId}`,
    })
    return response.data
  },

  async deleteTag(id: number, categoryId: number) {
    const response = await instance({
      method: 'delete',
      url: `/exercises/${id}/categories/${categoryId}`,
    })
    return response.data
  },

  async delete(id: number) {
    const response = await instance({
      method: 'DELETE',
      url: `/exercises/${id}`,
    })
    return response.data
  },
}
