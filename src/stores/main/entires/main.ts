import {
  getGlobalDepartmentListApi,
  getGlobalMenuListApi,
  getGlobalRoleListApi
} from '@/services/modules/main/entires/main'
import { generateListToTree } from '@/utils/generateTree'
import { defineStore } from 'pinia'

const useMainStore = defineStore('Main', {
  state: () => ({
    globalRoleList: [] as any,
    globalDepartmentList: [] as any,
    globalMenuList: [] as any,

    originalMenuList: [] as any // 供tags-view使用
  }),
  getters: {
    //
  },
  actions: {
    async getEntireDataAction() {
      const { data: res } = await getGlobalRoleListApi()
      const { data: res2 } = await getGlobalDepartmentListApi()
      const { data: res3 } = await getGlobalMenuListApi()

      this.globalRoleList = res.data
      this.originalMenuList = res3.data

      // console.log(this.globalRoleList)

      // 转换为树形结构
      this.globalDepartmentList = generateListToTree(res2.data, null)

      // 转换为树形结构
      this.globalMenuList = generateListToTree(res3.data, null)
    }
  }
})

export default useMainStore
