import { ElMessage } from 'element-plus'
// import { IMessageOptions } from 'element-plus/lib/el-message/src/types'

/**
 * 判断数据类型方法
 */
export const [isArray, isString, isObject, isNumber, isFunction, isDate, isUndefined, isNull, isRegExp, isSymblo, isBigInt] = [
  'Array',
  'String',
  'Object',
  'Number',
  'Function',
  'Date',
  'Undefined',
  'Null',
  'RegExp',
  'Symblo',
  'BigInt',
].map((name) => (value: any) => Object.prototype.toString.call(value) === `[object ${name}]`)

type VoidFunction = () => void

export const alertMessage = (() => {
  const queue: VoidFunction[] = []
  let closed = true
  return (message = '', type:any, delay = 2000) => {
    if (!message) return
    const callback = () => {
      closed = false
      setTimeout(() =>
        ElMessage({
          type,
          message,
          duration: delay,
          onClose() {
            closed = true
            if (queue.length > 0) {
              const fn = queue.shift()
              fn && fn()
            }
          },
        })
      )
    }

    if (closed) {
      callback()
    } else {
      queue.push(callback)
    }
  }
})()

/**
 * 格式化分页数据
 * 用于接口分页数据，防止分页的数据格式问题导致js报错
 */
export function formatList(data: any) {
  const result = {
    list: [] as any[],
    total: 0,
  }
  if (data) {
    if (Array.isArray(data.list)) {
      result.list = data.list
    }
    if (typeof data.total === 'number') {
      result.total = data.total
    }
  }
  return result
}

export function delay(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000)
  })
}

export const isTest = process.env.NODE_ENV !== 'production' || /test/.test(window.location.hostname)

export const HOST = isTest ? 'https://testmaxgw.zebra-c.com/' : 'https://maxgw.zebra-c.com/'

class BaseError extends Error {
  constructor(message: string, raw?: any) {
    super(message)
    this.name = new.target.name
    this.raw = raw
    if (typeof (Error as any).captureStackTrace === 'function') {
      (Error as any).captureStackTrace(this, new.target)
    }
    if (typeof Object.setPrototypeOf === 'function') {
      Object.setPrototypeOf(this, new.target.prototype)
    } else {
      (this as any).__proto__ = new.target.prototype
    }
  }
  raw?: any
}

export default BaseError

