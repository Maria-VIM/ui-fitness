import { defineStore } from 'pinia'
import { useMediaQuery } from '@vueuse/core'

export const useUiStore = defineStore('ui', () => {
  const is_mobile = useMediaQuery('(max-width: 1000px)')
  return { is_mobile }
})
