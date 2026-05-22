import type { RouteRecordRaw } from 'vue-router'
import LibraryPage from '@/modules/library/views/LibraryPage.vue'

const libraryRoutes: RouteRecordRaw[] = [
  {
    path: '/library',
    name: 'library',
    component: LibraryPage,
  },
]

export default libraryRoutes
