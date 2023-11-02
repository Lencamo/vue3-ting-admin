import { defineStore } from 'pinia'

import { pwdLoginApi } from '../../services/modules/login/login.ts'

import type { IAccount } from '@/types/login/login.ts'
import { localCache } from '@/utils/cache.ts'
import { LOGIN_TOKEN } from '@/config/constants.ts'

const useloginStore = defineStore('login', {
  state: () => ({
    id: '',
    username: '',
    token: localCache.getCache(LOGIN_TOKEN) ?? ''
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
      this.id = res.data.id
      this.username = res.data.username
      this.token = res.data.token

      // 2、token缓存
      localCache.setCache(LOGIN_TOKEN, this.token)
    }
  }
})

export default useloginStore
