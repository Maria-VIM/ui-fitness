import { instance } from '@/shared/utils.ts'
import type { WorkoutFormInterface } from '@/modules/personal-plan/interfaces/workout-form.interface.ts'
import type { GenerateWorkoutFormInterface } from '@/modules/personal-plan/interfaces/generated-workouts.ts'

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
    console.log(response.data)
    return response.data
  },

  async getPlans(workoutId: number) {
    const response = await instance({
      method: 'GET',
      url: `/plans/${workoutId}`,
    })
    return response.data
  },

  async createPlan(payload: {
    personalWorkoutId: number
    exerciseId: number
    sets: number
    reps: number
  }) {
    const response = await instance({
      method: 'POST',
      url: `/plans`,
      data: payload,
    })
    return response.data
  },

  async updatePlan(id: number, payload: any) {
    const response = await instance({
      method: 'PUT',
      url: `/plans/${id}`,
      data: payload,
    })
    return response.data
  },

  async deletePlan(id: number) {
    const response = await instance({
      method: 'DELETE',
      url: `/plans/${id}`,
    })
    return response.data
  },
}

export default WORKOUTS_API
