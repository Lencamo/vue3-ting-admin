import { tingRequest } from '@/services'

export function getRoleListApi() {
  return tingRequest.get({
    url: '/role/list'
  })
}

export function getDepartmentListApi() {
  return tingRequest.get({
    url: '/department/list'
  })
}
