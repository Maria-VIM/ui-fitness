import {instance} from "@/shared/utils.ts";

export const GROUP_API = {
  async get() {
    const response = await instance({
      method: 'GET',
      url: '/groups',
    })
    return response.data;
  }
}
