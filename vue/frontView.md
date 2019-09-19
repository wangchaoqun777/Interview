#### _nth-of-type 与 nth-child 的区别_
nth-of-type 匹配父元素中第n个某种类型的子元素
nth-child 匹配父元素中第n个子元素且是某种类型的子元素
#### _typeof 检测各种数据类型的结果_
```javascript
console.log(typeof NaN) //number
console.log(typeof true) //boolean
console.log(typeof Symbol(1)) //symbol
console.log(typeof undefined) //undefined
console.log(typeof "") //string

console.log(typeof null) //object
console.log(typeof []) //object
console.log(typeof {}) //object
```
#### _BFC、IFC以及 使用场景_
BFC 隔离的布局块

#### _map 与 forEach 的区别_
map 会返回一个新数组，而forEach 不会

#### _移动端适配_
rem适配
#### _rem适配，怎么做_    

#### _Array数组的api every some filter reduce map_ 
- filter
  filter 的返回结果是 传递的函数返回为true的元素
- every 
  every 当每个元素经过函数全部返回true的时候返回true，否则返回false
- some 
  some 当每个元素经过函数存在返回true的结果就返回true 都没有返回true返回false
- reduce
  累加器返回累加的结果
- map
  map 的返回结果是 传递的函数返回的结果的集合
- forEach 遍历集合  没有返回元素
#### 解构赋值

#### _HTTPS 加密方式 有对称加密吗_
协商完成之后生成一个对称加密的秘钥，协商过程中使用的是非对称加密
#### _安全 xss csrf_ 
- xss 跨站脚本注入
    - 存储型xss
      将数据库中已经存在的能够执行xss攻击的数据返回给浏览器，如果数据未经转义校验等处理，直接由浏览器执行，就会被攻击
    - 反射性xss
      将用户输入的或者用户发送到后端的数据，如果后端没有校验浏览器发送过来的数据，并且又将其返回给客户端，那么就会被攻击
    - DOM-xss
      用户直接在页面上的输入框或者地址栏里面注入一些可执行的代码，就会被攻击
    - 防御
      需要对输入输出的数据以及防止cookie被劫持
- csrf 跨站请求伪造
    - 一般是通过获取用户的cookie来伪装成用户来执行一些攻击
    - 防御手段
      - 验证码
      - 使用token
      - 对referer进行检查
  

#### React 组件类型
* 纯组件（pureComponent）
    ```javascript
      import {PureComponent} from "react";
      class HelloComponent extends PureComponent{
          render(){
              return <div > aaa</div>
          }
      }
    ```
    - 内部自动实现shouldComponentUpdate
        纯组件的内部会自动比较props 和 state 如果没有发生变化  组件不会重新渲染，
    - 纯组件的比较只是浅比较，如果是易变数据需要使用不同的引用，
* 无状态组件 
    ```JSX
    function HelloComponent(props){
        return <p >{props.name}</p>
    }
    ```
    - 组件不会被实例化，整体渲染的性能能够得到提升
    - 组件内部没办法访问this
    - 组件无法使用生命周期方法
    - 无状态组件只能访问输入的props 同样的props渲染出的组件是一致的，没有副作用
* ES5 React.createClass();
    - 所有的方法都会绑定this
    - mixin不够自然、直观，不如extends React.Component直观
    - 在创建组件时配置组件的属性信息(propTypes\defaultProps)是作为组件实例的属性来配置的
    - 组件的状态通过getInitialState方法来配置组件相关的状态
* ES6 extends React.Component
    - 类组件的中的方法内部的this 需要自己绑定 可以再构造函数中绑定，也可以在调用的时候绑定，也可以使用箭头函数绑定
    - 在创建组件时配置组件的属性信息(propTypes\defaultProps)时是作为组件类的属性，不是组件实例的属性，也就是类的静态属性（static）来配置的。
* 高阶组件
  HOC,接收一个组件作为输入，返回一个组件（装饰器）
  常见用法
  - 属性代理
    - 更改props,抽象state,通过refs访问组件实例，封装样式、布局
  - 反向继承
    - 劫持被继承的class的render函数，进行修改，过滤后返回新的内容（super.render(),super,Fn()）
  - react-redux的connect就是一个高阶组件，connect通过函数参数mapStateToProps,从全局store中取出当前组件的state,并把state装换成当前组件的props。同时mapDispatchToProps把当前组件用到的action
    以props的形式传递给当前组件，connect并不会修改输入的组件，只是返回了一个经过connect包装后的新组件。
  - react-router 中的withRouter也是一个高阶组件，通过withRouter包装过之后的组件可以在props中获取location,history,router对象
* 受控组件
* mixin 
  mixin是OOP（面向对象编程）的一种实现，其作用是为了复用共有的代码，将共有的代码抽离出来，然后通过mixin该对象来达到代码复用，mixin只在creatClass
  中支持，在React.Component中可以使用HOC进行替代

#### React 优化总结
- 1.尽可能使用无状态组件（函数组件，内部没有state）
- 2.使用React.memo 来纯化函数组件（无状态组件）
- 3.使用PureComponent 来减少无效的渲染（浅比较，shallowEquals,搭配immutableJS）
- 4.使用shouldComponentUpdate来减少无效的渲染
- 5. 使用React.lazy，Suspense来延迟加载组件
- 6. 使用key来标记列表项
- 7. 避免使用内联对象，匿名函数
- 8. 避免反复卸载，挂载组件
- 9. 使用React.Fragment包裹没有父容器的多个dom
- 10. 首屏loading
#### webpack原理
webpack 的流程主要分成主要的五部分
- 初始化配置参数
- 绑定事件钩子回调
- 确定Entry逐一遍历
- 使用loader编译文件
- 输出文件

webpack就是一条工作线，需要经过一系列流程的处理才能将我们的源代码转换成输出文件。
webpack上的每一个步骤的职责都是单一的，一些流程需要依赖上一个步骤的处理结果，plugins就是插入到生产线上的一个功能，在特定的时机
对生产线上的资源进行处理。webpack使用tapable来组织这条生产线，webpack在处理的过程中会广播事件，通知到每一个订阅了该事件的插件
插件只需要监听他们需要监听的事件即可，就能加入到这条生产线上，去改变生产线的运作。

- webpack会读取你的config文件，初始化本次构建的配置参数，并且执行配置文件中的插件实例化语句，生成compiler 传入到plugin
的apply方法中，（plugin必须要有一个apply方法）为webpack的事件流挂上钩子
- 然后webpack会读取配置中的entry,递归的遍历所有的入口文件
- webpack接下来就开始compilation过程，会依次进入每一个入口文件，先使用用户配置好的loader对文件内容进行编译，然后我们可以从
传入事件回调的compilation中拿到module的resource\loaders等信息，之后再将编译好的文件上会用acorn解析成AST抽象语法树，分析文件的
依赖关系，逐个拉取依赖模块并重复上述过程，最终将模块中的require语法替换为__webpack_require__来模拟模块化操作
-emit阶段，所有的文件编译以及转化已经完成，包含了最终输出的资源，我们可以在传入时间回调的compilation.assets上拿到所需要的数据，
其中包含了即将输出的资源、代码块chunk等等信息


#### 如何提高webpack的编译速度
 - 1.使用speed-measure-webpack-plugin来构建打点，查看webpack过程中每一步所需的时间。
````javascript
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
 
const smp = new SpeedMeasurePlugin();
 
module.exports = smp.wrap(YourWebpackConfig);
````
基本上执行时间大部分都消耗在js css loader以及对这两类代码的压缩以及编译上，
因为在对代码进行编译压缩的时候都需要将源代码编译成AST，然后再将AST转化为我们想要的代码
- 2.缓存
  所以我们可以对一部分的loader进行缓存，一些loader可以直接支持缓存，
- 3.多核happypack
  使用happypck对文件进行并行编译，分开处理js和css 文件
- 4.抽离
  抽离一些公共组件单独打包，平时不动，定时进行更新
- 5.拆分
- 6.提升构建体验

#### webpack常见的loader和plugins
-uglifyjs-webpack-plugin
-optimize-css-assets-webpack-plugin


#### 提取url参数为object的函数
#### 一个数组分成两个要求两个数组之后的加和差值最小
#### 多列布局要求每一列的高度为其子元素最高的高度
#### cdn

 