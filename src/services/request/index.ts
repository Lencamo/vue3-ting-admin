import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'

import type { RenRequestConfig } from './types'

class RenRequest {
  instance: AxiosInstance

  constructor(config: RenRequestConfig) {
    this.instance = axios.create(config)

    // 1、全局拦截器✨
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // console.log('全局响应拦截器')
        return response
      },
      (error: any) => {
        return error
      }
    )

    // 接入局部拦截功能
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  // 接入单个请求拦截功能
  request<T = any>(config: RenRequestConfig<T>) {
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config) // 成功请求拦截器返回的是一个新的config
    }

    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((response) => {
          if (config.interceptors?.responseSuccessFn) {
            response = config.interceptors.responseSuccessFn(response) // 成功响应拦截器返回的是一个新的response
          }
          resolve(response)
        })
        .catch((error: any) => {
          if (config.interceptors?.responseFailureFn) {
            error = config.interceptors.responseFailureFn(error)
          }
          reject(error)
        })
    })
  }

  get<T = any>(config: RenRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: RenRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: RenRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: RenRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default RenRequest
