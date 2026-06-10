import type { RouteRecordRaw } from 'vue-router'
import PlanPage from '@/modules/personal-plan/views/PlanPage.vue'
import WorkoutView from '@/modules/personal-plan/views/WorkoutView.vue'

const personalPlanRoutes: RouteRecordRaw[] = [
  {
    path: '/personal',
    name: 'personal',
    component: PlanPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/workout/:id',
    name: 'oneWorkout',
    component: WorkoutView,
    meta: { requiresAuth: true },
  },
]

export default personalPlanRoutes
