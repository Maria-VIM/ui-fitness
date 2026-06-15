import type { RouteRecordRaw } from 'vue-router'
import VimSidebar from '@/shared/components/VimSidebar.vue'

const sharedRoutes: RouteRecordRaw[] = [
  {
    path: '/404',
    name: 'notFound',
    component: VimSidebar,
  },
]

export default sharedRoutes
