import { defineStore } from 'pinia'

import { pwdLoginApi } from '../../services/modules/login/login.ts'

import type { IAccount, IMeta } from '@/types/login/login.ts'
import { localCache } from '@/utils/cache.ts'
import { LOGIN_TOKEN } from '@/config/constants.ts'

import { initStaticRoutes } from '@/utils/initStaticRoutes.ts'

const useloginStore = defineStore('login', {
  state: () => ({
    id: '',
    username: '',
    token: '',
    routeMetas: [] as IMeta[]
  }),
  getters: {
    //
  },
  actions: {
    async pwdLoginAction(account: IAccount) {
      // 1、登录
      const { data: res } = await pwdLoginApi(account)
      // 结果
      // console.log(res.data)

      if (!res.code) {
        this.id = res.data.id
        this.username = res.data.username
        this.token = res.data.token

        // 2、token缓存
        localCache.setCache(LOGIN_TOKEN, this.token)

        // 3、本地静态路由-批量注册
        const routeMetas = initStaticRoutes()
        this.routeMetas = routeMetas
      } else {
        ElMessage.error(res.message)
      }
    },

    routesCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)

      // 确保当前已经login
      if (token) {
        // 使用缓存数据
        this.token = token

        // 根据缓存-复原路由
        const routeMetas = initStaticRoutes()
        this.routeMetas = routeMetas
      }
    }
  }
})

export default useloginStore
