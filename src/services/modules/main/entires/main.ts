import { tingRequest } from '@/services'

export function getGlobalRoleListApi() {
  return tingRequest.get({
    url: '/role/list'
  })
}

export function getGlobalDepartmentListApi() {
  return tingRequest.get({
    url: '/department/list'
  })
}

export function getGlobalMenuListApi() {
  return tingRequest.get({
    url: '/menu/list'
  })
}
