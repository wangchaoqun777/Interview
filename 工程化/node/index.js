// const http = require('http')
const path = require('path')
// http.createServer((req, response)=>{
//   response.writeHead(200);
//   response.end();
// }).listen(3000)
// console.log(path.extname('/path/example/index.js'))

// process.stdin.setEncoding('utf8')

// process.stdin.on('readable', () => {
//   let chunk
//   // 使用循环确保我们读取所有的可用数据。
//   while ((chunk = process.stdin.read()) !== null) {
//     if (chunk === '\n') {
//       process.stdin.emit('end')
//       return
//     }
//     process.stdout.write(`收到数据: ${chunk}`)
//   }
// })

// process.stdin.on('end', () => {
//   process.stdout.write('结束监听')
// })
// const http = require('http')
// /**
//  * @param {Object} req 是一个http.IncomingMessag实例
//  * @param {Object} res 是一个http.ServerResponse实例
//  */
// const server = http.createServer((req, res) => {
//   // console.log(req.headers)
//   // res.end(`Hello Nodejs`)
//   res.writeHead(200, { 'Content-Type': 'image/jpg' })
//   const r = require('fs').createReadStream('./kobe.png')
//   r.pipe(res)
// })

// server.listen(3000)
// const readline = require('readline')

// const rl = readline.createInterface({
//   //  监听的可读流
//   input: process.stdin,
//   //  逐行读取（Readline）数据要写入的可写流
//   output: process.stdout
// })

// rl.question('你如何看待 null-cli ？', answer => {
//   console.log(`感谢您的宝贵意见：${answer}`)
//   rl.close()
// })

// const doSomething = () => console.log('测试')
// const measureDoingSomething = () => {
//   console.time('doSomething()')
//   //做点事，并测量所需的时间。
//   doSomething()
//   console.timeEnd('doSomething()')
// }
// measureDoingSomething()

const Stream = reqiure('stream')
const readableStream = new Stream.Readable()
readableStream._read = 