import axios, { CancelTokenSource } from 'axios'
import Request, { httpErrorMessage } from './utils/axios'
import BaseError from './utils/utils'
import { ElMessage, ElMessageBox } from 'element-plus'
import router from './router'
import store from './store'

const { CancelToken } = axios

let cToken: CancelTokenSource
const confirmTokens: CancelTokenSource[] = []

router.beforeEach((to, from, next) => {
  cToken && cToken.cancel()
  cToken = CancelToken.source()
  if (confirmTokens.length > 0) {
    return ElMessageBox.confirm('有正在进行的请求，确定要取消请求并离开吗？', '提示').then(
      () => {
        while (confirmTokens.length > 0) {
          const token = confirmTokens.pop()
          token && token.cancel()
        }
        next()
      },
      // () => {}
    )
  }
  next()
})

const request = new Request({
  baseURL: process.env.NODE_ENV === 'development' ? '/proxy-prefix' : '',
  timeout: 20 * 1e3,
  response(resData, res) {
    const index = confirmTokens.findIndex((item) => item.token === res.config.cancelToken)
    if (index >= 0) {
      confirmTokens.splice(index, 1)
    }

    if (resData) {
      const { errcode, data, message } = resData
      // const message = typeof msg === 'string' && msg ? msg : '发生了一点错误'
      if (typeof errcode === 'number') {
        if (errcode === 0 || res.headers.success === 'true') {
          if (res.config.tip) {
            ElMessage({
              type: 'success',
              message,
            })
          }
          return res
        }
        if (errcode === 403 || (data && data.reload)) {
          // store.commit('user/logout')
        }
        if (errcode !== 0 ) {
          ElMessage({
            type: 'error',
            message,
          })
        }
        const err = new BaseError(message, resData)
        return Promise.reject(err)
      }
      return res
    }
  },
  onError(error, options) {
    if (options && !options.silent) {
      const { status } = error.response || {}
      const message = (typeof status === 'number' && httpErrorMessage[status]) || error.message
      message &&
        ElMessage({
          type: 'error',
          message,
        })
    }
    if (error.status === 419) {
      router.replace('/login')
    }
  },
})

request.addRequestInterceptor((config) => {
  const token = store.getters['token']

  // config.data = JSON.stringify(config.data)
  config.headers = {
    'Content-Type': 'application/json',
    'X-CSRF-TOKEN': token,
    'X-Requested-With': 'XMLHttpRequest'
  }

  if (config.cancel) {
    try {
      const tokenSource = CancelToken.source()
      const token = config.cancel(tokenSource)
      if (token) {
        config.cancelToken = token
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }

  // 设置请求未完成时阻止页面跳转并提示
  if (!config.cancelToken && config.confirm) {
    const _token = CancelToken.source()
    confirmTokens.push(_token)
    config.cancelToken = _token.token
  }

  // 设置全局的页面跳转取消请求
  if (!config.cancelToken && cToken) {
    config.cancelToken = cToken.token
  }
  return config
})

export default request
