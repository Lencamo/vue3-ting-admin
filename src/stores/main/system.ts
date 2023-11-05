import { getUserListApi } from '@/services/modules/main/system'
import { defineStore } from 'pinia'
import type { IUserList } from '@/types/main/system'

const useSystemStore = defineStore('System', {
  state: () => ({
    userList: [] as IUserList[],
    userTotalCount: 0
  }),
  getters: {
    //
  },
  actions: {
    async getUserListAction() {
      const { data: res } = await getUserListApi()
      const { list, totalCount } = res.data
      this.userList = list
      this.userTotalCount = totalCount
    }
  }
})

export default useSystemStore
