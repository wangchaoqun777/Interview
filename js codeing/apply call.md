#### call
1. 解决var作用域问题
```js
var bottle = [
  {name: 'an', age: '24'},
  {name: 'anGe', age: '12'}
];

for (var i = 0; i < bottle.length; i++) {
  // 匿名函数
  (function (i) { 
    setTimeout(() => {
      // this 指向了 bottle[i]
      console.log('#' + i  + ' ' + this.name + ': ' + this.age); 
    }, 1000)
  }).call(bottle[i], i);
  // 调用 call 方法，同时解决了 var 作用域问题
}
```

2. 绑定上下文
```js
function sayWord() {
  var talk = [this.name, 'say', this.word].join(' ');
  console.log(talk);
}

var bottle = {
  name: 'bottle', 
  word: 'hello'
};

// 使用 call 将 bottle 传递为 sayWord 的 this
sayWord.call(bottle); 
// bottle say hello
```

#### apply 
1. 配合内置函数找出最大最小值
```js
/* 找出数组中最大/小的数字 */
let numbers = [5, 6, 2, 3, 7]
/* 应用(apply) Math.min/Math.max 内置函数完成 */

let max = Math.max.apply(null, numbers) 
/* 基本等同于 Math.max(numbers[0], ...) 或 Math.max(5, 6, ..) */

let min = Math.min.apply(null, numbers)

console.log('max: ', max)
// max: 7
console.log('min: ', min)
// min: 2

等同于：
/* 代码对比： 用简单循环完成 */
let numbers = [5, 6, 2, 3, 7]
let max = -Infinity, min = +Infinity
for (var i = 0; i < numbers.length; i++) {
  if (numbers[i] > max)
    max = numbers[i]
  if (numbers[i] < min) 
    min = numbers[i]
}

console.log('max: ', max)
// max: 7
console.log('min: ', min)
// min: 2

// 当数据量较大时，由于js引擎参数限制
function minOfArray(arr) {
  var min = Infinity
  var QUANTUM = 32768 // JavaScript 核心中已经做了硬编码  参数个数限制在65536

  for (var i = 0, len = arr.length; i < len; i += QUANTUM) {
    var submin = Math.min.apply(null, arr.slice(i, Math.min(i + QUANTUM, len)))
    min = Math.min(submin, min)
  }
  return min
}
var min = minOfArray([5, 6, 2, 3, 7])
// max 同样也是如此
```
2. 函数转移

```js
let wrapper = function() {
  return anotherFunction.apply(this, arguments);
};
// wrapper 通过 anotherFunction.apply 获得了上下文 this 和 anotherFunction 的参数并返回其结果。
```

#### bind

