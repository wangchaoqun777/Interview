# webpack打包原理

 - 观察打包后的文件
  - 将require替换成为 __webpack_require__ 实现模块化
  - 将代码都缓存在 installedMoudules 里
  - 代码以对象形式传进来，文件名为key，value是包裹的代码字符串