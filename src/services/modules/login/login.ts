import { renRequest } from '../../index.ts'

import type { IAccount } from '@/types/login/login.ts'

export function getCodeSvgApi() {
  return renRequest.get({
    url: '/login/codePic'
  })
}

export function pwdLoginApi(account: IAccount) {
  return renRequest.post({
    // url: '/login/pwd',
    url: '/login',
    data: account
  })
}

export function phoneLoginApi(account: any) {
  return renRequest.post({
    url: '/login/phone',
    data: account
  })
}
