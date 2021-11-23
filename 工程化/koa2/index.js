// 创建kkb
const http = require('http')
const context = require('context.js')
const request = require('request.js')
const response = require('response.js')


class KKB {

  constructor () {
    this.middlewares = []
  }

  listen (...args) {
    const server = http.createServer(async(req,res)=>{
      const ctx = createContext(req,res)
      const fn = compose(this.middlewares)
      fn(ctx)
      res.end(ctx.body)
    })
    server.listen(...args)
  }

  compose (middlewares) {
    return function(ctx) {
      return dispatch(0)
      function dispatch(i) {
        let fn = middlewares[i]
        if(!fn) {
          return Promise.resolve()
        }
        return Promise.resolve(fn(ctx, function next(){
          return dispatch(i+1)
        }))
      } 
    }
  }

  //构建上下文,把res和req都挂载到ctx之上，并且在ctx.req和ctx.request.req同时保存
  createContext(req,res){ 
    const ctx = Object.create(context);
    ctx.request=Object.create(request)
    ctx.response=Object.create(response);
    ctx.req =ctx.request.req=req;
    ctx.res=ctx.response.res=res;
    return ctx;
  }

  use (middleware) {
    this.middlewares = middleware
  }
}

moudle.exports = KKB

// 调用 app.js
const KKB = require('./kkb.js')
const app = new KKB()

app.use((ctx)=> {
  ctx.body = 'hello koa2'
})
app.listen(3000, () => {
  console.log('监听')
})