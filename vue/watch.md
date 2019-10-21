```js
 created () {
   this.getList()
 }
  watch: {
    inputVal () {
      this.getList()
    }
  }
  // 利用wathch的 immediate 和 handler、
  watch : {
    inputVal:{
      handler: 'getList',
      immediate: true
    }
  }
  // deep 属性
  watch: {
    inputVal: {
      handler(newVal,oldVal){
        console.log( newVal, oldVal)
      },
      deep: true
    }
  }
  // 深度监听虽然可以监听到对象的变化,但是无法监听到具体对象里面那个属性的变化
```