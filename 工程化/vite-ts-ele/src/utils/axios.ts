import { Ref } from 'vue'
import axios, { AxiosInstance, AxiosRequestConfig, CancelTokenSource, CancelToken, AxiosResponse } from 'axios'

export const httpErrorMessage: Record<number, string> = {
  400: '请求错误',
  401: '未授权，请登录',
  403: '拒绝访问',
  404: '请求地址出错',
  408: '请求超时',
  500: '服务器内部错误',
  501: '服务未实现',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP版本不受支持',
}

interface RequestConfig<T = any> extends AxiosRequestConfig {
  cancel?(token: CancelTokenSource): CancelToken
  loading?: Ref<boolean>
  response?: (data: T, value: RequestResponse) => T | Promise<T>
  tip?: boolean
  onError?(error: any, options?: RequestConfig): void
  silent?: boolean
  confirm?: boolean
}

interface RequestResponse<T = any> extends AxiosResponse<T> {
  config: RequestConfig<T>
}

type RequestInterceptorsCallback<T = any, R = RequestConfig<T>> = (v: R) => R | Promise<R>

type ResponseInterceptorsCallback<T = any, R = RequestResponse<T>> = (v: R) => R | Promise<R>

type RequestFactoryMethod<T> = (url: string, params?: any, options?: AxiosRequestConfig) => Promise<T>

export default class Request {
  instance: AxiosInstance
  config: RequestConfig
  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    this.config = config
    this.init()
  }

  private create<T>(fn: RequestFactoryMethod<T>, url: string, params?: any, options?: RequestConfig) {
    const { loading } = Object.assign({}, options)
    if (loading) {
      loading.value = true
    }
    return fn(url, params, options).then(
      (res) => {
        if (loading) {
          loading.value = false
        }
        return res
      },
      (error) => {
        if (loading) {
          loading.value = false
        }
        if (!axios.isCancel(error)) {
          if (this.config.onError) {
            this.config.onError(error, options)
          }
          return Promise.reject(error)
        }
      }
    )
  }

  get<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: RequestConfig) {
    return this.create<R>(
      (url: string, params?: any, options?: AxiosRequestConfig) => {
        return this.instance.get(url, { params, ...options })
      },
      url,
      data,
      config
    )
  }

  delete<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: RequestConfig) {
    return this.create<R>(
      (url: string, params?: any, options?: AxiosRequestConfig) => {
        return this.instance.delete(url, { params, ...options })
      },
      url,
      data,
      config
    )
  }

  post<T = any, R = AxiosResponse<T>>(url: string, data?: any, options?: RequestConfig) {
    return this.create<R>(this.instance.post, url, data, options)
  }

  put<T = any, R = AxiosResponse<T>>(url: string, data?: any, options?: RequestConfig) {
    return this.create<R>(this.instance.put, url, data, options)
  }

  patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, options?: RequestConfig) {
    return this.create<R>(this.instance.patch, url, data, options)
  }

  addRequestInterceptor(onFulfilled: RequestInterceptorsCallback) {
    this.instance.interceptors.request.use(onFulfilled)
    return this
  }

  addResponseInterceptor(onFulfilled?: ResponseInterceptorsCallback) {
    this.instance.interceptors.response.use(onFulfilled)
    return this
  }

  private init() {
    this.instance.interceptors.response.use(
      (res) => {
        if (this.config.response) return this.config.response(res.data, res)
        return res
      },
      async (error: any) => {
        const response = error.response
        const config = error.config
        const [RETRY_COUNT, RETRY_DELAY] = [3, 1000]

        if (config && RETRY_COUNT) {
          // 设置用于跟踪重试计数的变量
          config.__retryCount = config.__retryCount || 0

          // 检查是否已经把重试的总数用完
          if (config.__retryCount >= RETRY_COUNT) {
            return Promise.reject(response || { message: error.message })
          }

          // 增加重试计数
          config.__retryCount++

          // 创造新的Promise来处理指数后退
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY || 1))

          return this.instance(config)
        }

        return Promise.reject(response || { message: error.message })
      }
    )
  }
}
