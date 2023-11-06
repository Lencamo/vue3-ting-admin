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
