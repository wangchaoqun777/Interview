1. Array.from() 将伪数组对象或可遍历对象转换为真数组
2. Array.of(v1,v2,v3) 将一系列的值转换为数组
3. find（） 参数为回调函数，所有数组成员一次执行改回调函数
4. findIndex() 返回第一个符合条件的数组成员的位置
5. includes() 返回一个布尔值,表示某个数组是否包含给定的值
6. 数组实例的 entries()，keys() 和 values()

7. class 实现构造函数
```js

function MathFun (x, y) {
  this.x = x
  this.y = y
}
MathFun.prototype.add = function () {
  return this.x + this.y
}

var m = new MathFun(1, 2)
console.log(m.add())

Class MathFun {
  constructor(x,y) {
    this.x = x
    this.y = y
  }
  add () {
    return this.x + this.y
  }
}
const m = new MathFun(1,2)
console.log(m.add())
// 其实这两者本质是一样的，只不过是语法糖写法上有区别。所谓语法糖是指计算机语言中添加的某种语法，这种语法对语言的功能没有影响，但是更方便程序员使用
```

8. 如何实现继承
```js
// 传统继承
  function Animal () {
    this.eat = function(){
      console.log('this is eat ')
    }
  }

  function Dog () {
    this.bark = function () {
      console.log('this is bark ')
    }
  }

  Dog.prototype = new Animal
  var hashiqi = new Dog
  hashiqi.eat()
  hashiqi.bark()

// es6 继承

Class Animal {
  constructor (name) {
    this.name = name
  }
  eat () {
    console.log('this is eat ')
  }
}
Class Dog extends Animal {
  constructor(name) {
    super(name) //  有extend就必须要有super，它代表父类的构造函数，即Animal中的constructor
    this.name = name
  }
  bark () {
    console.log('this is bark ')
  }
}
const dog = new Dog()
dog.eat()
dog.bark()
```