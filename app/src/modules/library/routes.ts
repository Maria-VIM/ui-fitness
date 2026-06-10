import type { RouteRecordRaw } from 'vue-router'
import LibraryPage from '@/modules/library/views/LibraryPage.vue'
import ExerciseView from '@/modules/library/views/ExerciseView.vue'

const libraryRoutes: RouteRecordRaw[] = [
  {
    path: '/library',
    name: 'library',
    component: LibraryPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/library/exercise/:id',
    name: 'exercise',
    component: ExerciseView,
    meta: { requiresAuth: true },
  },
]

export default libraryRoutes
