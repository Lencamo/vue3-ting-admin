import { tingRequest } from '@/services'

import type { IUserListQuery, IUserOperate } from '@/types/main/system'

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

export function addUserApi(user: IUserOperate) {
  return tingRequest.post({
    url: `/user`,
    data: user
  })
}

export function editUserApi(userId: number, user: IUserOperate) {
  return tingRequest.patch({
    url: `/user/${userId}`,
    data: user
  })
}
