import RenRequest from './request/index'
import { BASE_URL, TIMEOUT } from './request/config'
import { localCache } from '@/utils/cache.ts'
import { LOGIN_TOKEN } from '@/config/constants.ts'

export const testRequest = new RenRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,

  // 2、局部拦截器✨
  interceptors: {
    requestSuccessFn: (config) => {
      // console.log('局部请求拦截器')
      return config
    },
    requestFailureFn: (error) => {
      return error
    }
  }
})

export * from './modules/demo.ts'

// ==============

export const tingRequest = new RenRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,

  interceptors: {
    requestSuccessFn: (config) => {
      // console.log(config)

      // 拦截api请求，并上传token验证
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        config.headers.Authorization = 'Bearer' + token
      }

      return config
    }
  }
})
