import { GetItemsType, instance, APIResponseType } from './api'

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10, term: string = '', friend: null | boolean = null) {
    return instance
      .get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
      .then((res) => res.data)
  },

  unfollow(id: number) {
    return instance.delete(`follow/${id}`).then((res) => res.data) as Promise<ResponseType>
  },

  follow(id: number) {
    return instance.post<ResponseType>(`follow/${id}`).then((res) => res.data)
  },
}
