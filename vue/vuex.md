#### state:定义存贮数据的仓库 ,可通过this.$store.state 或mapState访问
#### getter:获取 store 值,可认为是 store 的计算属性,可通过this.$store.getter 或
       mapGetters访问
#### mutation:同步改变 store 值,为什么会设计成同步,因为mutation是直接改变 store 值,
         vue 对操作进行了记录,如果是异步无法追踪改变.可通过mapMutations调用
#### action:异步调用函数执行mutation,进而改变 store 值,可通过 this.$dispatch或mapActions
       访问
#### modules:模块,如果状态过多,可以拆分成模块,最后在入口通过...解构引入
