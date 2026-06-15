import type { RouteRecordRaw } from 'vue-router'
import PlanPage from '@/modules/personal-plan/views/PlanPage.vue'
import WorkoutView from '@/modules/personal-plan/views/WorkoutView.vue'
import WorkoutPassingView from '@/modules/personal-plan/views/WorkoutPassingView.vue'

const personalPlanRoutes: RouteRecordRaw[] = [
  {
    path: '/personal',
    name: 'personal',
    component: PlanPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/personal/workout/:id',
    name: 'oneWorkout',
    component: WorkoutView,
    meta: { requiresAuth: true },
  },
  {
    path: '/personal/workout/:id/passing',
    name: 'oneWorkoutPassing',
    component: WorkoutPassingView,
    meta: { requiresAuth: true },
  },
]

export default personalPlanRoutes
