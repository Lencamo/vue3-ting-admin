import { defineStore } from 'pinia'

import {
  pwdLoginApi,
  getUserInfoApi,
  getUserRoleMenuApi
} from '../../services/modules/login/login.ts'

import type { IAccount } from '@/types/login/login.ts'
import { localCache } from '@/utils/cache.ts'
import { LOGIN_TOKEN } from '@/config/constants.ts'

const useloginStore = defineStore('login', {
  state: () => ({
    token: (localCache.getCache(LOGIN_TOKEN) ?? '') as string,
    userInfo: {} as any,
    userRoleMenu: [] as any
  }),
  getters: {
    //
  },
  actions: {
    async pwdLoginAction(account: IAccount) {
      // 1、密码登录
      const { data: res } = await pwdLoginApi(account)
      // console.log(res.data)

      const userId = res.data.id
      const username = res.data.username
      this.token = res.data.token

      // 2、token缓存
      localCache.setCache(LOGIN_TOKEN, this.token)

      // ====

      // 1、根据userId获取当前用户的详细信息（包含role信息）
      const { data: res2 } = await getUserInfoApi(userId)
      // console.log(res2)

      const roleId = res2.data.role.id
      this.userInfo = res2.data

      // 2、根据roleId获取当前用户的权限菜单树（菜单栏）
      const { data: res3 } = await getUserRoleMenuApi(roleId)
      // console.log(res3)

      this.userRoleMenu = res3.data
    }
  }
})

export default useloginStore
