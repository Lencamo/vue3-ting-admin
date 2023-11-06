export interface IUserList {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  departmentName: string
  roleId: number
  roleName: string
  createAt: string
  updateAt: string
}

export interface IUserListQuery {
  offset: number
  size: number
}
