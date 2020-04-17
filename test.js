// function test(arg) {
//   console.log(this.name)
//   console.log(arg)
// }

// test.call({name: '123'},{age:124})


// test.apply({name: '123'},[1,2,3,4])
// const min = Math.min.apply(null,[2,3,4,6,1])
// console.log(min)
// const newtest = test.bind({name: '123'},'ahahh')
// newtest()

// const p1 = new Promise((resolve,reject)=>{
//   setTimeout(()=>{
//     resolve('result')
//   },1000)
// })
// p1.then(res=>console.log(res), err=>console.log(err))

// function getCountDays(ym) {
//   var curDate = new Date(ym);
//   /* 获取当前月份 */
//   var curMonth = curDate.getMonth();
//   /* 生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
//   curDate.setMonth(curMonth + 1);
//   /* 将日期设置为0 */
//   curDate.setDate(0);
//   /* 返回当月的天数 */
//   return curDate.getDate();
// }
// console.log('time', getCountDays('2020-02'))

// const PENDING = 'pening' // 等待态
// const FULFLLED = 'fulfllED' // 执行态
// const REJECTED = 'rejected' // 拒绝态
// class MyPromise {
//   constructor (executor) {
//     this.status = PENDING
//     this._value = undefined
//     this._resolveArr = []
//     this._rejectArr = []
//     let  _resolve = (val) => {
//       const run = () => {
//         if(this.status !== PENDING) return
//           this.status = FULFLLED
//           this._value = val
//           while(this._resolveArr.length){
//             const callback = this._resolveArr.shift()
//             callback(val)
//           }
//       }
//       setTimeout(run)
//     }
  
//     let  _reject = (val) => {
//       const run = () => {
//         if(this.status !== PENDING) return
//         this.status = REJECTED
//         while(this._rejectArr.length){
//           const callback = this._rejectArr.shift()
//           callback(val)
//         }
//       }
//       setTimeout(run)
//     }
  
//     executor(_resolve,_reject)

//   }
  
//   then(resultFn,rejectFn) {

//     typeof resultFn !== 'function' ? resultFn = val => val : null
//     typeof rejectFn !== 'function' ? rejectFn = reason => {
//       throw new Error (reason instanceof Error ? reason.message: reason)
//     } : null
//     return new MyPromise((resolve, reject) => {

//       const fifulledFn = (val) => {
//         try {
//           let x = resultFn(val)
//           x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
//         } catch(err) {
//           reject(err)
//         }

//       }
      
//       const rejectedFn = val => {
//         try {
//           let x = rejectFn(val)
//           x instanceof MyPromise ? x.then(reject, resolve) : reject(x)
//         } catch(err) {
//           reject(err)
//         }
//       }
      
//       switch (this.status) {
//         case PENDING:
//           this._resolveArr.push(fifulledFn)
//           this._rejectArr.push(rejectedFn)
//           break;
//         case FULFLLED:
//           this.fifulledFn(this._value)
//           break;
//         case REJECTED:
//           this.rejectedFn(this._value)
//       }
//     })
//   }
// }
// const p2 = new MyPromise((resolve, reject) => {
//   resolve(1)          //同步executor测试
// })
// p2
//   .then(res => {
//     console.log(res)
//     return 2          //链式调用测试
//   })
//   .then()             //值穿透测试
//   .then(res => {
//     console.log(res)
//     return new MyPromise((resolve, reject) => {
//       resolve(3)      //返回Promise测试
//     })
//   })
//   .then(res => {
//     console.log(res)
//     throw new Error('reject测试')   //reject测试
//   })
//   .then(() => {}, err => {
//     console.log(err)
//   })

  function* myGenerator() {
    console.log(yield '1')  //test1
    console.log(yield '2')  //test2
    // console.log(yield '3')  //test3
  }
  const gen = myGenerator()
  gen.next()
  gen.next('test1')
  gen.next('test2')