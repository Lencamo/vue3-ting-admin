import {
  getUserListApi,
  delectUserApi,
  addUserApi,
  editUserApi,
  getDepartmentListApi,
  delectDepartmentApi,
  addDepartmentApi,
  editDepartmentApi,
  getMenuListApi,
  editMenuApi
} from '@/services/modules/main/system'
import { defineStore } from 'pinia'
import type {
  IDepartmentList,
  IMenuList,
  IUserList,
  IUserListQuery,
  IUserOperate
} from '@/types/main/system'
import { generateListToTree } from '@/utils/generateTree'

const useSystemStore = defineStore('System', {
  state: () => ({
    userList: [] as IUserList[],
    userTotalCount: 0,

    departmentList: [] as IDepartmentList[],
    departmentTotalCount: 0,

    menuList: [] as IMenuList[],
    menuTotalCount: 0
  }),
  getters: {
    //
  },
  actions: {
    // 1、用户管理
    async getUserListAction(listInfo: IUserListQuery) {
      const { data: res } = await getUserListApi(listInfo)
      const { list, totalCount } = res.data
      this.userList = list
      this.userTotalCount = totalCount
    },

    async delectUserAction(userId: number) {
      const { data: res } = await delectUserApi(userId)
      // console.log(res)

      // 更新列表
      this.getUserListAction({ offset: 0, size: 5 })
    },

    async addUserAction(user: IUserOperate) {
      const { data: res } = await addUserApi(user)
      // console.log(res)

      // 更新列表
      this.getUserListAction({ offset: 0, size: 5 })
    },

    async editUserAction(userId: number, user: IUserOperate) {
      const { data: res } = await editUserApi(userId, user)
      // console.log(res)

      // 更新列表
      this.getUserListAction({ offset: 0, size: 5 })
    },

    // 2、部门管理
    async getDepartmentListAction(listInfo?: any) {
      const { data: res } = await getDepartmentListApi(listInfo)
      const { list, totalCount } = res.data
      this.departmentList = listInfo ? list : generateListToTree(list, null)
      this.departmentTotalCount = totalCount
    },

    async delectDepartmentAction(departmentId: number) {
      const { data: res } = await delectDepartmentApi(departmentId)
      // console.log(res)

      // 更新列表
      this.getDepartmentListAction()
    },

    async addDepartmentAction(department: any) {
      const { data: res } = await addDepartmentApi(department)
      // console.log(res)

      // 更新列表
      this.getDepartmentListAction()
    },

    async editDepartmentAction(departmentId: number, department: any) {
      const { data: res } = await editDepartmentApi(departmentId, department)
      // console.log(res)

      // 更新列表
      this.getDepartmentListAction()
    },

    // 3、菜单管理
    async getMenuListAction(listInfo?: any) {
      const { data: res } = await getMenuListApi(listInfo)
      const { list, totalCount } = res.data
      this.menuList = listInfo ? list : generateListToTree(list, null)
      this.menuTotalCount = totalCount
    },

    async editMenuAction(menuId: number, menu: any) {
      const { data: res } = await editMenuApi(menuId, menu)
      // console.log(res)

      // 更新列表
      this.getMenuListAction()
    }
  }
})

export default useSystemStore
