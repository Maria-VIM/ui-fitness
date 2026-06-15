export interface WorkoutSessionInterface {
  id: number
  personalWorkoutId: number
  startedAt: string
  endedAt: string | null
  mark: number | null
}
