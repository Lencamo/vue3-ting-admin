import { tingRequest } from '@/services'

export function getUserListApi() {
  return tingRequest.post({
    url: '/user/list',
    data: {
      offset: 0,
      size: 10
    }
  })
}
