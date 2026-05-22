import { instance } from '@/shared/utils.ts'

export const CATEGORY_API = {
  async get(groupId?: number) {
    const response = await instance({
      method: 'GET',
      url: `categories`,
      params: { groupId },
    })
    return response.data
  },
}
