import { getDepartmentListApi, getRoleListApi } from '@/services/modules/main/entires/main'
import { generateDepartmentListToTree } from '@/utils/generateTree'
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

      // 转换为树形结构
      this.departmentList = generateDepartmentListToTree(res2.data, null)
    }
  }
})

export default useMainStore
