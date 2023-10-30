import { testRequest } from '../index'

/**
 * response数据类型
 * - 【默认为any】
 */

interface IDemoData {
  code: number
  message: string
  data?: any
}

export function getDemoList() {
  return testRequest.get<IDemoData>({
    url: '/demo',

    // 3、单个请求拦截器 ✨
    interceptors: {
      requestSuccessFn: (config) => {
        console.log('单个请求拦截器')
        return config
      },
      requestFailureFn: (error) => {
        return error
      }
    }
  })
}
