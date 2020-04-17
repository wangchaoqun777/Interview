- Promise为我们解决了什么问题：在传统的异步编程中，如果异步之间存在依赖关系，我们就需要通过层层嵌套回调来满足这种依赖，如果嵌套层数过多，可读性和可维护性都变得很差，产生所谓“回调地狱”，而Promise将回调嵌套改为链式调用，增加可读性和可维护性

- 观察者模式简单实现
  ```js
    class MyPromise {
    constructor (executor) {
      this._resolveArr = []
      this._rejectArr = []
      let  _resolve = (val) => {
        while(this._resolveArr.length){
          const callback = this._resolveArr.shift()
          callback(val)
        }
      }
    
      let  _reject = (val) => {
        while(this._rejectArr.length){
          const callback = this._rejectArr.shift()
          callback(val)
        }
      }
    
      executor(_resolve,_reject)
    }
    then(resultFn,rejectFn) {
      this._resolveArr.push(resultFn)
      this._rejectArr.push(rejectFn)
    }
  }
  const p2 = new MyPromise((resolve,reject)=>{
    setTimeout(()=>{
      resolve('resolve')
      reject('reject')
    },1000)
  })
  p2.then((res)=> {
    console.log('tag2', res)
  },(err)=>{
    console.log('tag3', err)
  })
  ```

- 根据规范添加三种状态，将then进行包装，包装成为一个promise, 进而实现链式调用
虽然规范没有要求回调应该被放进宏任务队列还是微任务队列，但其实Promise的默认实现是放进了微任务队列，我们的实现（包括大多数Promise手动实现和polyfill的转化）都是使用setTimeout放入了宏任务队列
```js
const PENDING = 'pening' // 等待态
const FULFLLED = 'fulfllED' // 执行态
const REJECTED = 'rejected' // 拒绝态
class MyPromise {
  constructor (executor) {
    this.status = PENDING
    this._value = undefined
    this._resolveArr = []
    this._rejectArr = []
    let  _resolve = (val) => {
      const run = () => {
        if(this.status !== PENDING) return
          this.status = FULFLLED
          this._value = val
          while(this._resolveArr.length){
            const callback = this._resolveArr.shift()
            callback(val)
          }
      }
      setTimeout(run)
    }
  
    let  _reject = (val) => {
      const run = () => {
        if(this.status !== PENDING) return
        this.status = REJECTED
        while(this._rejectArr.length){
          const callback = this._rejectArr.shift()
          callback(val)
        }
      }
      setTimeout(run)
    }
  
    executor(_resolve,_reject)

  }
  
  then(resultFn,rejectFn) {

    typeof resultFn !== 'function' ? resultFn = val => val : null
    typeof rejectFn !== 'function' ? rejectFn = reason => {
      throw new Error (reason instanceof Error ? reason.message: reason)
    } : null
    return new MyPromise((resolve, reject) => {

      const fifulledFn = (val) => {
        try {
          let x = resultFn(val)
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch(err) {
          reject(err)
        }

      }
      
      const rejectedFn = val => {
        try {
          let x = rejectFn(val)
          x instanceof MyPromise ? x.then(reject, resolve) : reject(x)
        } catch(err) {
          reject(err)
        }
      }
      
      switch (this.status) {
        case PENDING:
          this._resolveArr.push(fifulledFn)
          this._rejectArr.push(rejectedFn)
          break;
        case FULFLLED:
          this.fifulledFn(this._value)
          break;
        case REJECTED:
          this.rejectedFn(this._value)
      }
    })
  }

  // - promise 的几个方法
  catch (rejectFn) {
    return this.then(undifined,rejectFn)
  }
  
  finally (callback) {
    return this.then(
      value => MyPromise.resolve(callback()).then(() => value),  
      reason => MyPromise.resolve(callback()).then(() => { throw reason })
    )
  }

  static resolve(value) {
    if(value instanceof MyPromise) return value // 根据规范, 如果参数是Promise实例, 直接return这个实例
    return new MyPromise(resolve => resolve(value))
  }
  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason))
  }
  //静态的all方法
    static all(promiseArr) {
      let index = 0
      let result = []
      return new MyPromise((resolve, reject) => {
        promiseArr.forEach((p, i) => {
          //Promise.resolve(p)用于处理传入值不为Promise的情况
          MyPromise.resolve(p).then(
            val => {
              index++
              result[i] = val
              //所有then执行后, resolve结果
              if(index === promiseArr.length) {
                resolve(result)
              }
            },
            err => {
              //有一个Promise被reject时，MyPromise的状态变为reject
              reject(err)
            }
          )
        })
      })
    static race(promiseArr) {
      return new MyPromise((resolve, reject) => {
        //同时执行Promise,如果有一个Promise的状态发生改变,就变更新MyPromise的状态
        for (let p of promiseArr) {
          MyPromise.resolve(p).then(  //Promise.resolve(p)用于处理传入值不为Promise的情况
            value => {
              resolve(value)        //注意这个resolve是上边new MyPromise的
            },
            err => {
              reject(err)
            }
          )
        }
      })
    }


}

p2
  .then(res => {
    console.log(res)
    return 2          //链式调用测试
  })
  .then()             //值穿透测试
  .then(res => {
    console.log(res)
    return new MyPromise((resolve, reject) => {
      resolve(3)      //返回Promise测试
    })
  })
  .then(res => {
    console.log(res)
    throw new Error('reject测试')   //reject测试
  })
  .then(() => {}, err => {
    console.log(err)
  })
```


  
