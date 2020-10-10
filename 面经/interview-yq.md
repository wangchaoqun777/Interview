
1. 行内元素和块级元素的区别:

行内元素 和其他行内元素在同一行进行排列的 如span img a button input l abel select textarea q strong br i em， 不能包含块级元素
块级元素 块级元素独占一行 垂直向下排列, 可通过浮动让其水平排列 div p, 可以包含行内元素和块级元素,可设置宽高
行内元素和块级元素可以相互转换，通过display属性, 不可以设置宽高，随文本内容变化

2. 怎么让行内元素有宽高:

通过属性设置宽高:
dispaly: block
display: inline-block;
通过浮动设置宽高:
float 
position

3. 怎么让一个元素隐藏
opacity: 0
dispaly: none
visibility: hidden
position: absolute

4. BFC
- 块级格式上下文 属于一种特性
  - 在BFC中从顶部开始垂直的从上直下排列盒子
  - 属于一个BFC中的盒子的margin会相互重叠
    - 消除相邻的块的重叠 float clear:both
    <html>
    <div>
      <p class="box1">123</p>
      <p class="box">234</p>
    </div>
  </html>
  <style>
    .box1{
      width: 200px;
      min-height: 20px;
      border: 1px solid red;
      float: left; *****
      clear: both  *****
    }
    .box{
      width: 100px;
      height: 100px;
      border: 1px solid green;
      float: left; *****
      clear: both  *****
    }
  </style>

  - 清除浮动的影响
    <html>
      <div>
        <div class="box1">
          <p class="box">456</p>
        </div>
      </div>
    </html>
    <style>
      .box1{
        width: 200px;
        min-height: 20px;
        border: 1px solid red;
        overflow: hidden; *****
      }
      .box{
        width: 100px;
        height: 100px;
        border: 1px solid green;
        float: left
      }
    </style>
  - 和浮动元素产生边界
    未浮动元素添加 浮动元素的宽度 + 边距距离

5. 高度塌陷怎么办
  子元素 clear: both
  父元素 overflow: auto
  父元素 也浮动
  after 伪类元素
  触发BFC
    float: left | right;
    overflow: auto | hidden | scorll;
    display: table-cell | table-caption | inline-block;
    position: fixed | absolute;

6. 数据类型有哪些
  Number String Boolean object Null undifined Symbol bigInt（大整数）

7. 内置对象是什么
  Array Object Math String Number JSON Function Date RegExp

8. nodejs 多线程发生的情况

9. v-if v-show区别

10. vue如何修改data this.$set

11. eventLoop
- 任务分为同步任务 ： 在主线程排队的任务，执行完一个才能执行下一个。
- 异步任务： 不进入主线程进入任务队列的任务
  （1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
  （2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
  （3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
  （4）主线程不断重复上面的第三步。


12. promise 和 generate async await 的区别
- promise 将原来用回调函数的异步编程方式转换成用 resolve 和 reject 触发事件
  用then和catch 捕获成功和失败的状态  将回调地狱变成了链式写法
- generate 利用迭代器原理分步调用，需要主动调用next()进行到下一步
- aync generare的语法糖， 自带状态机, await的部分返回时自动执行下一步 也不需要链式调用所以一般使用async await 但是async必须从一个promise开始，所以两者配合使用

13. webpack 分离bundiles
  优化webpack构建性能
  loader 是针对文件而言 去将文件进行转换 编译 打包 
  plugin 扩展功能 loader结束后，整个打包过程中的监听某个节点然后执行相应的任务
  A. 减少代码体积
     1. 使用 CommonsChunksPlugin 提取多个 chunk 之间的通用模块，减少总体代码体积
     2. 把部分依赖转移到cdn
     3. 一些组件库可以按需加载
  B. 减少目录检索范围 和 路径
    1. 使用loader 时，通过exclued 和 include 减少loader遍历的范围
    2. resolve.alias 可以配置 webpack 模块解析别名


自我介绍 
您好，我叫xxx，我在现在的公司是做web开发工程师。我们公司做的项目主要是和汽车行业相关的。
在技术方面负责新项目 需求评审、代码编写、优化、测试 和 老项目的维护。主要是使用vue 技术栈
其他方面负责和产品 UI 后台进行沟通和对接,也不断提升自己的业务能力，自学能力和沟通能力。
谢谢，以上是我的自我介绍。

为什么要离职
想换一下工作环境

需要总结 -- 复盘 --- 重新学习 ---组织语言
晚上看 webpack nodejs课件 并实践
不要紧张双向选择