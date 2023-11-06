import { getUserListApi, delectUserApi } from '@/services/modules/main/system'
import { defineStore } from 'pinia'
import type { IUserList, IUserListQuery } from '@/types/main/system'

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
    }
  }
})

export default useSystemStore
