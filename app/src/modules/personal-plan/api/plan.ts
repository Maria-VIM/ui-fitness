import { instance } from '@/shared/utils.ts'
import type { PlanInterface } from '@/modules/personal-plan/interfaces/plans/plan.interface.ts'

export const PLANS_API = {
  async getPlans(workoutId: number): Promise<PlanInterface[]> {
    const response = await instance({
      method: 'GET',
      url: `/plans/${workoutId}`,
    })
    return response.data
  },

  async getOne(personalWorkoutId: number, id: number): Promise<PlanInterface> {
    const response = await instance({
      method: 'GET',
      url: `/plans/${id}/workout/${personalWorkoutId}`,
    })
    return response.data
  },

  async createPlan(data: {
    personalWorkoutId: number
    exerciseId: number
    sets: number
    reps: number
  }) {
    const response = await instance({
      method: 'POST',
      url: `/plans`,
      data: data,
    })
    return response.data
  },

  async updatePlan(id: number, data: { sets: number; reps: number; orderIndex: number }) {
    const response = await instance({
      method: 'PUT',
      url: `/plans/${id}`,
      data: data,
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
