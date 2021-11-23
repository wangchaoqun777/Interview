1. 同样的团队是对express的封装 
2. 
```js
   const Koa = reqiue("Koa")
   const app = new Koa()
   app.use((ctx)=> {

   }).listen(3000)
```
手写koa 参考index.js 核心原理对 context 中间件的封装(整合中间件通过传递next函数递归执行)
