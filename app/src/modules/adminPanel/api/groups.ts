import { instance } from '@/shared/utils.ts'
import type { GroupFormInterface } from '@/modules/adminPanel/interfaces/groups/group-form.interface.ts'
import type { GroupInterface } from '@/modules/adminPanel/interfaces/groups/group.interface.ts'

export const GROUP_API = {
  async get(): Promise<GroupInterface[]> {
    const response = await instance({
      method: 'GET',
      url: '/groups',
    })
    return response.data
  },

  async getOne(id: number): Promise<GroupInterface> {
    const response = await instance({
      method: 'GET',
      url: `/groups/${id}`,
    })
    return response.data
  },

  async delete(id: number): Promise<GroupInterface> {
    const response = await instance({
      method: 'DELETE',
      url: `/groups/${id}`,
    })
    return response.data
  },

  async create(body: GroupFormInterface): Promise<GroupInterface> {
    const response = await instance({
      method: 'POST',
      url: '/groups',
      data: body,
    })
    return response.data
  },

  async update(id: number, body: GroupFormInterface): Promise<GroupInterface> {
    const response = await instance({
      method: 'PUT',
      url: `/groups/${id}`,
      data: body,
    })
    return response.data
  },
}
