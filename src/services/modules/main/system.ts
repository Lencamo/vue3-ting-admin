import { tingRequest } from '@/services'

import type { IUserListQuery } from '@/types/main/system'

export function getUserListApi(listInfo: IUserListQuery) {
  return tingRequest.post({
    url: '/user/list',
    data: listInfo
  })
}

export function delectUserApi(userId: number) {
  return tingRequest.delete({
    url: `/user/${userId}`
  })
}
