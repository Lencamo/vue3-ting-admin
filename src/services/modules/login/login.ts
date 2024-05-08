import { tingRequest } from '../../index.ts'

import type { IAccount } from '@/types/login.js'

export function getCodeSvgApi() {
  return tingRequest.get({
    url: '/login/codePic'
  })
}

export function pwdLoginApi(account: IAccount) {
  return tingRequest.post({
    url: '/login/pwd',
    data: account
  })
}

export function phoneLoginApi(account: any) {
  return tingRequest.post({
    url: '/login/phone',
    data: account
  })
}

// =========

export function getUserInfoApi(userId: number) {
  return tingRequest.get({
    url: `/user/details/${userId}`
  })
}

export function getUserRoleMenuApi(roleId: number) {
  return tingRequest.get({
    url: `/role/menu/${roleId}`
  })
}
