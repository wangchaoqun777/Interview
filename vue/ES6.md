### 1.对象重新复值
```js
let dataCon = []
dataArr.map(data => {
  let obj = {}
  Object.assign(obj,data)
  obj['playName'] = '玩游戏'
  dataCon.push(obj)
})
```

### 2.为对象添加属性
```js
class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
  }
}
上面方法通过Object.assign方法，将x属性和y属性添加到Point类的对象实例

保持继承链进行clone
function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}
```
### 3. 5种遍历对象的属性
（1）. for...in
 for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

 (2). Object.keys(obj)
 Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）

 (3). Object.getOwnPropertyNames(obj)
 Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）。

 (4).Object.getOwnPropertySymbols(obj)
 Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性。

 (5). Reflect.ownKeys(obj)
 Reflect.ownKeys返回一个数组，包含对象自身的所有属性，不管是属性名是 Symbol 或字符串，也不管是否可枚举。
```js
Reflect.ownKeys({[Symbol()]:0, 10:0, 2:0, a:0})
// ['2', '10', 'b', 'a', Symbol()]
```
(6). Object.keys(obj)
```js
var obj = { foo: "bar", baz: 42 };

Object.keys(obj)

// ["foo", "baz"]
```
(7).Object.values
```js
var obj = { foo: "bar", baz: 42 };

Object.values(obj)

// ["bar", 42]
```

(8).Object.entries(boj)

```js
var obj = { foo: 'bar', baz: 42 };

Object.entries(obj)

// [ ["foo", "bar"], ["baz", 42] ]
// 遍历对象的属性
let obj = { one: 1, two: 2 };

for (let [k, v] of Object.entries(obj)) {

console.log(`${JSON.stringify(k)}: ${JSON.stringify(v)}`);

}
```
