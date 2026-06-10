import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { workoutKeys } from './queryKeys'
import WORKOUTS_API from '@/modules/personal-plan/api/workouts.ts'

export const useWorkouts = () => {
  return useQuery({
    queryKey: workoutKeys.all,
    queryFn: WORKOUTS_API.getAll,
  })
}

export const usePlans = (workoutId: number) => {
  return useQuery({
    queryKey: workoutKeys.plans(workoutId),
    queryFn: () => WORKOUTS_API.getPlans(workoutId),
    enabled: !!workoutId,
  })
}

export const useCreatePlan = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: WORKOUTS_API.createPlan,
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: workoutKeys.plans(vars.personalWorkoutId) })
    },
  })
}

export const useUpdatePlan = (workoutId: number) => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: any) => WORKOUTS_API.updatePlan(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: workoutKeys.plans(workoutId) })
    },
  })
}

export const useDeletePlan = (workoutId: number) => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: WORKOUTS_API.deletePlan,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: workoutKeys.plans(workoutId) })
    },
  })
}
