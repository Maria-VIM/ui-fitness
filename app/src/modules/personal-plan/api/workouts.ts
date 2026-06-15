import { instance } from '@/shared/utils.ts'
import type { WorkoutFormInterface } from '@/modules/personal-plan/interfaces/workouts/workout-form.interface.ts'
import type { GenerateWorkoutFormInterface } from '@/modules/personal-plan/interfaces/workouts/generated-workouts.interface.ts'

const WORKOUTS_API = {
  async get() {
    const response = await instance({
      method: 'GET',
      url: '/workouts',
    })
    return response.data
  },

  async delete(id: number) {
    const response = await instance({
      method: 'DELETE',
      url: `/workouts/${id}`,
    })
    return response.data
  },

  async create(body: WorkoutFormInterface) {
    const response = await instance({
      method: 'POST',
      url: '/workouts',
      data: body,
    })
    return response.data
  },

  async createGenerated(body: GenerateWorkoutFormInterface) {
    const response = await instance({
      method: 'POST',
      url: '/workouts/generated',
      data: body,
    })
    return response.data
  },

  async getAll() {
    const response = await instance({
      method: 'GET',
      url: '/workouts',
    })
    return response.data
  },
}

export default WORKOUTS_API
