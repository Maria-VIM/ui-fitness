import type { RouteRecordRaw } from 'vue-router'
import PlanPage from '@/modules/personal-plan/views/PlanPage.vue'

const personalPlanRoutes: RouteRecordRaw[] = [
  {
    path: '/personal',
    name: 'personal',
    component: PlanPage,
  },
]

export default personalPlanRoutes
