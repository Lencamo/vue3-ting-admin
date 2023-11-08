import { tingRequest } from '@/services'

import type { IUserListQuery, IUserOperate } from '@/types/main/system'

// ===================
// ==== 用户管理
// ===================

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

// ===================
// ==== 部门管理
// ===================

export function getDepartmentListApi(listInfo: any) {
  return tingRequest.post({
    url: '/department/list',
    data: listInfo
  })
}

export function delectDepartmentApi(departmentId: number) {
  return tingRequest.delete({
    url: `/department/${departmentId}`
  })
}

export function addDepartmentApi(department: any) {
  return tingRequest.post({
    url: `/department`,
    data: department
  })
}

export function editDepartmentApi(departmentId: number, department: any) {
  return tingRequest.patch({
    url: `/department/${departmentId}`,
    data: department
  })
}
