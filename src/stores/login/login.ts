import { defineStore } from 'pinia'

import { pwdLoginApi } from '../../services/modules/login/login.ts'

import type { IAccount, IMeta } from '@/types/login/login.ts'
import { localCache } from '@/utils/cache.ts'
import { LOGIN_TOKEN } from '@/config/constants.ts'

import type { RouteRecordRaw } from 'vue-router'
import router from '@/router/index.ts'

const useloginStore = defineStore('login', {
  state: () => ({
    id: '',
    username: '',
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    localRoutes: [] as RouteRecordRaw[],
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

        // =======

        // 1、获取 nav-side 数据
        let localRoutes: RouteRecordRaw[] = []

        const modules: Record<string, any> = import.meta.glob('../../router/nav-side.ts', {
          eager: true,
          import: 'default'
        })

        for (const key in modules) {
          // console.log(modules[key])
          localRoutes.push(...modules[key])
        }
        this.localRoutes = localRoutes

        // 2、本地路由注册、视图渲染
        let routeMetas: IMeta[] = []

        localRoutes.forEach((route) => {
          // console.log(route)
          // 视图数据
          const meta = { ...(route.meta as unknown as IMeta), url: route.path }
          console.log(meta)
          routeMetas.push(meta)

          // 批量注册
          router.addRoute('main', route)
        })
        this.routeMetas = routeMetas
      } else {
        ElMessage.error(res.message)
      }
    }
  }
})

export default useloginStore
