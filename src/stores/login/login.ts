import { defineStore } from 'pinia'

import {
  pwdLoginApi,
  getUserInfoApi,
  getUserRoleMenuApi
} from '../../services/modules/login/login.ts'

import type { IAccount } from '@/types/login/login.ts'
import { localCache } from '@/utils/cache.ts'
import {
  LOGIN_TOKEN,
  LOGIN_USER_INFO,
  LOGIN_ROLE_MENU,
  LOGIN_ROLE_PERMISSION
} from '@/config/constants.ts'

import { initDynamicRoutes } from '@/utils/initDynamicRoutes.ts'
import useMainStore from '../main/entires/main.ts'
import { mapMenuToPermission } from '@/utils/map-menus.ts'

const useloginStore = defineStore('login', {
  state: () => ({
    token: '' as string,
    userInfo: {} as any,
    userRoleMenu: [] as any,
    userRolePermission: [] as string[]
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

      // 登录时获取roles、departments备用
      const mainStore = useMainStore()
      mainStore.getEntireDataAction()

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

      // 3、根据权限菜单树 生成 permissions数组
      const permissions = mapMenuToPermission(this.userRoleMenu)

      this.userRolePermission = permissions

      // permissions数组 缓存
      localCache.setCache(LOGIN_ROLE_PERMISSION, this.userRolePermission)

      // =======

      // 根据菜单-动态生成路由
      initDynamicRoutes(this.userRoleMenu)
    },

    dynamicRoutesCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache(LOGIN_USER_INFO)
      const userRoleMenu = localCache.getCache(LOGIN_ROLE_MENU)
      const userRolePermission = localCache.getCache(LOGIN_ROLE_PERMISSION)

      // 确保当前已经login
      if (token && userInfo && userRoleMenu) {
        // 刷新时重新获取roles、departments
        const mainStore = useMainStore()
        mainStore.getEntireDataAction()

        // 使用缓存数据
        this.token = token
        this.userInfo = userInfo
        this.userRoleMenu = userRoleMenu
        this.userRolePermission = userRolePermission

        // 根据缓存-动态复原路由
        initDynamicRoutes(this.userRoleMenu)
      }
    }
  }
})

export default useloginStore
