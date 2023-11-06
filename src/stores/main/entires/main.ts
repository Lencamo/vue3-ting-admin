import { getDepartmentListApi, getRoleListApi } from '@/services/modules/main/entires/main'
import { defineStore } from 'pinia'

const useMainStore = defineStore('Main', {
  state: () => ({
    roleList: [] as any,
    departmentList: [] as any
  }),
  getters: {
    //
  },
  actions: {
    async getEntireDataAction() {
      const { data: res } = await getRoleListApi()
      const { data: res2 } = await getDepartmentListApi()

      this.roleList = res.data
      this.departmentList = res2.data
    }
  }
})

export default useMainStore