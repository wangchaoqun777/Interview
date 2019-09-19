### 集合类
#### forEach 对数组的每个元素执行一次提供的函数，而且不会改变原数组
```js
[1, 2, 3, 4, 5].forEach(value => console.log(value));
```

#### map 会给原数组中的每个元素都按顺序调用一次 callback 函数。callback 每次执行后的返回值（包括 undefined）组合起来形成一个新数组

#### filter  Array.prototype.filter 过滤回调返回为false的值，每个值都保存在一个新的数组中，然后返回
```js
[1, 2, 3, 4, 5].filter(number => number >= 3);
// -> [3, 4, 5]
```
#### .reduce reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。 接受四个参数：初始值（或者上一次回调函数的返回值），当前元素值，当前索引
```js
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce((sum, number) => {
   return sum + number;
 }, 0) // -> 55
```

### 检索类
#### findIndex 找到数组中给定值的索引
```js
[1, 2, 3, 4, 5, 6, 7].findIndex(value => value === 5); // 4
```
#### find find与findIndex的唯一区别在于，它返回的是实际值，而不是索引
```js
[1, 2, 3, 4, 5, 6, 7].find(value => value === 5); // 5
```

#### .indexOf indexOf是获取给定值索引的另一种方法。然而，这一次，咱们将实际值作为参数而不是函数传递
```js
[3, 2, 3].indexOf(3); // -> 0
```
#### lastIndexOf lastIndexOf的工作方式与indexOf相同，lastIndexOf() 方法返回指定元素在数组中的最后一个的索引，如果不存在则返回 -1
```js
[3, 2, 3].lastIndexOf(3); // -> 2
```
#### .every 测试一个数组内的所有元素是否都能通过某个指定函数的测试，它返回一个布尔值。
```js
[1, 2, 3].every(value => Number.isInteger(value)); // -> true
```
#### .some
```js
[1, 2, 3, 4, 5].some(number => number === 5); // -> true
```
#### .includes 方法的工作方式类似于 some 方法，但是includes不用回调，而是提供一个参数值来比较元素。
```js
[1, 2, 3].includes(3); // -> true
```
### 扁平类
#### .flat flat方法通过可指定深度值来减少嵌套的深度。
```js
[1, 2, 3, [4, 5]].flat(1) // -> [1, 2, 3, 4, 5]
```
#### .flatMap 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 map 和 深度值1的 flat 几乎相同
```js
[1, 2, 3].flatMap(value => [value, value, value]); // [1, 1, 1, 2, 2, 2, 3, 3, 3]
```