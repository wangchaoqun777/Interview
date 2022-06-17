 - 异步 一段任务被分成两段，中间穿插了一个其他的任务。
 - 同步 - 即一段任务连续执行
 - 高阶函数
  - 错误优先回调函数
  ```js
  fs.readFile('wnejian', function(err,data){
    if(err) throw err;
    console.log(data)
  })
  ```
  - 异常处理
  ```js
  try{

  }catch(e){

  }
  // 异步代码时try catch不再生效
  ```
  - 生成器Generators/ yield 
    - 当你在执行一个函数的时候，你可以在某个点暂停函数的执行，并且做一些其他工作，然后再返回这个函数继续执行， 甚至是携带一些新的值，然后继续执行
    - 上面描述的场景正是JavaScript生成器函数所致力于解决的问题。当我们调用一个生成器函数的时候，它并不会立即执行， 而是需要我们手动的去执行迭代操作（next方法）。也就是说，你调用生成器函数，它会返回给你一个迭代器。迭代器会遍历每个中断点
    - next 方法返回值的 value 属性，是 Generator 函数向外输出数据；next 方法还可以接受参数，这是向 Generator 函数体内输入数据
  ```js
    function* foo () {
      var index = 0;
      while (index<2){
        yield index ++ // 暂停函数执行，并执行yield后的操作
      }
    }
    var bar = foo() // 返回的是一个迭代器
    bar.next()
    bar.next()
  ```

  - Co 是一个为Node.js和浏览器打造的基于生成器的流程控制工具，借助于Promise，你可以使用更加优雅的方式编写非阻塞代码
  - async/ await
  ```js
  async function read() {
    let template = await readFile('./template.txt');
    let data = await readFile('./data.txt');
    return template + '+' + data;
  }

  // 等同于
  function read(){
    return co(function*() {
      let template = yield readFile('./template.txt');
      let data = yield readFile('./data.txt');
      return template + '+' + data;
    });
  }
  ```
