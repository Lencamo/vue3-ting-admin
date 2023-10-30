import type { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

interface Rennterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: any) => InternalAxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (config: T) => T
  responseFailureFn?: (err: any) => any
}
export interface RenRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: Rennterceptors<T>
}
