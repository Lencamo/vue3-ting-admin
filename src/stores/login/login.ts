import { defineStore } from 'pinia'

import {
  pwdLoginApi,
  getUserInfoApi,
  getUserRoleMenuApi
} from '../../services/modules/login/login.ts'

import type { IAccount } from '@/types/login/login.ts'
import { localCache } from '@/utils/cache.ts'
import { LOGIN_TOKEN, LOGIN_USER_INFO, LOGIN_ROLE_MENU } from '@/config/constants.ts'

import { initDynamicRoutes } from '@/utils/initDynamicRoutes.ts'

const useloginStore = defineStore('login', {
  state: () => ({
    token: '' as string,
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

      const userId = res.data.id
      const username = res.data.username
      this.token = res.data.token

      // 2、token缓存
      localCache.setCache(LOGIN_TOKEN, this.token)

      // =======

      // 1、根据userId获取当前用户的详细信息（包含role信息）
      const { data: res2 } = await getUserInfoApi(userId)

      const roleId = res2.data.role.id
      this.userInfo = res2.data

      // userInfo 缓存
      localCache.setCache(LOGIN_USER_INFO, this.userInfo)

      // 2、根据roleId获取当前用户的权限菜单树（菜单栏）
      const { data: res3 } = await getUserRoleMenuApi(roleId)

      this.userRoleMenu = res3.data

      // 权限菜单树 缓存
      localCache.setCache(LOGIN_ROLE_MENU, this.userRoleMenu)

      // =======

      // 根据菜单-动态生成路由
      initDynamicRoutes(this.userRoleMenu)
    },

    dynamicRoutesCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache(LOGIN_USER_INFO)
      const userRoleMenu = localCache.getCache(LOGIN_ROLE_MENU)

      // 确保当前已经login
      if (token && userInfo && userRoleMenu) {
        // 使用缓存数据
        this.token = token
        this.userInfo = userInfo
        this.userRoleMenu = userRoleMenu

        // 根据缓存-动态复原路由
        initDynamicRoutes(this.userRoleMenu)
      }
    }
  }
})

export default useloginStore
