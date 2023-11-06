import {
  getUserListApi,
  delectUserApi,
  addUserApi,
  editUserApi
} from '@/services/modules/main/system'
import { defineStore } from 'pinia'
import type { IUserList, IUserListQuery, IUserOperate } from '@/types/main/system'

const useSystemStore = defineStore('System', {
  state: () => ({
    userList: [] as IUserList[],
    userTotalCount: 0
  }),
  getters: {
    //
  },
  actions: {
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
    }
  }
})

export default useSystemStore
