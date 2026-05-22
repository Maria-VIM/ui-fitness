import { instance } from '@/shared/utils.ts'
import type { CategoryInterface } from '@/modules/adminPanel/interfaces/categories/category.interface.ts'
import type { CategoryFormInterface } from '@/modules/adminPanel/interfaces/categories/category-form.interface.ts'

export const CATEGORY_API = {
  async get(groupId?: number) {
    const response = await instance({
      method: 'GET',
      url: `categories`,
      params: { groupId },
    })
    return response.data
  },

  async getOne(id: number): Promise<CategoryInterface> {
    const response = await instance({
      method: 'GET',
      url: `categories/${id}`,
    })
    return response.data
  },

  async delete(id: number): Promise<CategoryInterface> {
    const response = await instance({
      method: 'DELETE',
      url: `categories/${id}`,
    })
    return response.data
  },

  async create(body: CategoryFormInterface): Promise<CategoryInterface> {
    const response = await instance({
      method: 'POST',
      url: `categories`,
      data: body,
    })
    return response.data
  },

  async update(id: number, body: CategoryFormInterface): Promise<CategoryInterface> {
    const response = await instance({
      method: 'PUT',
      url: `categories/${id}`,
      data: body,
    })
    return response.data
  },
}
