import { instance } from '@/shared/utils.ts'
import type { WorkoutSessionInterface } from '@/modules/personal-plan/interfaces/passing/workout-session.interface.ts'
import type { WorkoutSessionStatisticInterface } from '@/modules/personal-plan/interfaces/passing/workout-session-statistics.interface.ts'

export const PASSING_API = {
  async startPassing(personalWorkoutId: number): Promise<WorkoutSessionInterface> {
    const response = await instance({
      method: 'POST',
      url: `/workout/passing/start/${personalWorkoutId}`,
    })

    return response.data
  },

  async endPassing(personalWorkoutId: number): Promise<WorkoutSessionInterface> {
    const response = await instance({
      method: 'POST',
      url: `/workout/passing/end/${personalWorkoutId}`,
    })

    return response.data
  },

  async setMark(id: number, mark: number): Promise<WorkoutSessionInterface> {
    const response = await instance({
      method: 'PUT',
      url: `/workout/passing/mark/${id}`,
      data: {
        mark,
      },
    })

    return response.data
  },

  async getStatistics(): Promise<WorkoutSessionStatisticInterface[]> {
    const response = await instance({
      method: 'GET',
      url: `/workout/passing/statistics`,
    })

    return response.data
  },
}
