import RenRequest from './request/index'
import { BASE_URL, TIMEOUT } from './request/config'

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
  timeout: TIMEOUT
})
