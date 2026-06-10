export const workoutKeys = {
  all: ['workouts'] as const,
  plans: (id: number) => ['plans', id] as const,
}
