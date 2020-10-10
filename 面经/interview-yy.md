介绍下自己的项目
  - 以蜂巢为例子
   评估员到店进行在微信端答题 --- 在前台上传录音等文件  --- 复核员在前台进行复核经过nlp分析后的语音及问卷
    - 蜂巢前后台
      - 前台 优化组件按需加载 dll 样式抽离 
       - 各项管理功能的列表展示
       - 日志管理的echarts图表展示  将各种图形封装为单独的组件通过传参展示不同的数据
       - 录音录像上传 大文件上传 oss *  
          - 需要设置cors的跨域 
            - orings *
            - head *
            - methosd put post get head delete
            - expose headers Etag x-oss-request-id
          - 收集错误日志
          - 设置超时时间在 multipartUpload 中的设置不起作用，需要初始化的配置中
          - 断点续传 
            - localstorage 缓存问题指什么
            - 断点指针保存在indexedDB 非关系型数据库，储存空间比localStorage 和 cookie 4kb 通过事务操作
       - 问卷复核 父子间传值 ¥、$attr $listener $emit prop
       - 下载报告 egg生成pdf * puppeter page
       - 录音文件播放 资源 
    - 中台系统
      - 

自己主导的项目
  技术难点
  vue-cli 怎么搭建的 单页面 多页面 国际化
  webpack *
  国际化 i8n

技术亮点
  - 文件上传
  - 如何实现
  - 遇到了哪些问题
  - 为什么使用indexDB
  - 尝试了几种方式
      前端分片上传后台三台服务器无法拼接
- 对于跨项目的优势
  组件复用

自己搭建监控的成果
  - 主动搭建 怎么搭建 效果


回答有问题 ---- 那么一定要有解决方案 遇到了什么问题如何解决

1. 语雀-M
2. 日志-我
3. 项目精华
4. 珠峰框架


- vue react 差别
  - 原理上vue通过数据劫持 Object.definePrototy()中的getter 和 setter通过发布订阅模式监听值得变化, 双向数据绑定。
  - react 通过setState() 修改数据

  - 组件通信上 父子间通过props   跨级间通过React.context  provide/inject

  - 插值 循环渲染 条件渲染 react以原声js语法来实现  vue通过各种指令

  - 性能上React组件更新从根组件往子组件逐层渲染， vue是通过wacher数据通过diff算法更新

react生命周期
  mount

  constructor
  componentWillMount
  render
  componentDidMount

  update
  
  shouldComponentUpdate
  componentWillUpdate
  render
  componentDidUpdate

  unmount
  
  componentWillUnmount


  优化react 性能
    - 减少渲染节点的量， 不在render函数内进行大量的计算
    - 减少不必要的嵌套
    - 减少setState的次数
    - 大量列表时使用虚拟列表
    - 利用好生命周期不必要更新的组件shouldCompnentUpdate 函数返回false