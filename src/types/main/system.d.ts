// ===================
// ==== 用户管理
// ===================

export interface IUserList {
  id: number
  name: string
  realname: string
  cellphone: string
  enable: number
  departmentId: number
  departmentName: string
  roleId: number
  roleName: string
  createAt: string
  updateAt: string
}

export interface IQueryInfo {
  name?: string
  realname?: string
  cellphone?: string
  enable?: number
  createAt?: string
}

export interface IUserListQuery extends IQueryInfo {
  offset: number
  size: number
}

export interface IUserOperate {
  name: string
  realname: string
  cellphone: string
  roleId: number
  departmentId: number
  password: string
}

// ===================
// ==== 部门管理
// ===================

export interface IDepartmentList {
  id: number
  name: string
  leader: string
  parentId: number
  enable: number
  createAt: string
  updateAt: string
}

// ===================
// ==== 菜单管理
// ===================

export interface IMenuList {
  id: number
  name: string
  type: number
  icon: string
  url: string
  sort: number
  permission: null
  createAt: string
  updateAt: string
}

// ===================
// ==== 角色管理
// ===================

export interface IRoleList {
  id: number
  name: string
  intro: string
  createAt: string
  updateAt: string
  menuList?: any
}
