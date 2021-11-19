1. Array.from() 将伪数组对象或可遍历对象转换为真数组
2. Array.of(v1,v2,v3) 将一系列的值转换为数组
3. find（） 参数为回调函数，所有数组成员一次执行该回调函数
4. findIndex() 返回第一个符合条件的数组成员的位置
5. includes() 返回一个布尔值,表示某个数组是否包含给定的值
6. 数组实例的 
    - entries()
      for(let [index, val] of arr.entries()) {
        console.log(index,val)
      }
    - keys()
      for (let index of arr.keys()) {
        console.log(index)
      }
    - values()
      for (let val of arr.values()) {
        console.log(val)
      }

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
// 使用class这个关键词定义一个类,基于这个类创建实例以后会自动执行constructor方法,此方法可以用来初始化
Class MathFun {
  constructor(x,y) {
    this.x = x
    this.y = y
  }
  // 在类里面添加静态的方法可以使用static这个关键词，静态方法就是不需要实例化类就能使用的方法
  static add1 (a,b){
      return a+b;
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
    super(name) //  有extend就必须要有super，它代表父类的构造函数，即Animal中的constructor 通过super可以调用prototype上的属性或方法
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
9. flat() // 扁平化
```js
const arr = [1, [1,2], [1,2,3]]
arr.flat(Infinity) // [1,1,2,1,2,3]
```

10. 递归 （对于树状结构处理采用递归）
```js
const arr = [1, [1,2], [1,2,3]]
function flat(arr) {
  let result = []
  for(const item of arr){
    item instanceof Array ? result.concat(flat(item)) : result.push(item)
  }
  return result
}
// reduce 裂变
function flat(arr) {
  return arr.reduce((prev, cur) => {
    return prev.concat(cur instanceof Array ? flat(cur) : cur)
  }, [])
}

flat(arr)
```

11. 字符串新方法
 - includes() 返回布尔值 表示是否找到了参数字符串
 - startsWith() 表示参数字符串是否在源字符串的头部
 - endsWith() 表示参数字符串是否在源字符串的尾部
 ```js
  var s = 'zfpx';
  s.startsWith('z') // true
  s.endsWith('x') // true
  s.includes('p') // true
  // 第二个参数，表示开始搜索的位置 endsWith的行为与其他两个方法有所不同。它针对前n个字符
  console.log(s.endsWith('f',2)); // true
  console.log(s.includes('f',2)); // false
 ```

 12. 展开操作符
 ```js
 //传入参数
  print([1,2,3]);
  print(...[1,2,3]);
// 可以替代concat
  var arr3 = arr1.concat(arr2);
  var arr4 = [...arr1, ...arr2]
// 可以替代apply
  var m1 = Math.max.apply(null, [8, 9, 4, 1]);
  var m2 = Math.max(...[8, 9, 4, 1]);
//类数组的转数组
  function max(a,b,c) {
    console.log(Math.max(...arguments));
  }
 ```

 13. 剩余操作符
 ```js
 let rest = function(a,...rest){
      console.log(a,rest);
  }
  rest(1,2,3)
```