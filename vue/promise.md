####在JavaScript的世界中，所有代码都是单线程执行的。由于这个“缺陷”，导致JavaScript的所有网络操作，浏览器事件，都必须是异步执行。Promise 是异步编程的一种解决方案，比传统的解决方案(回调函数和事件)更合理和更强大。
#### 回调函数处理异步流程存在2个问题：
```js
let key, token, userId;

$.ajax({
    type: 'get',
    url: 'http://localhost:3000/apiKey',
    success: function (data) {
        key = data;
        
        $.ajax({
            type: 'get',
            url: 'http://localhost:3000/getToken',
            data: {
                key: key
            },
            success: function (data) {
                token = data.token;
                userId = data.userId;
                
                $.ajax({
                    type: 'get',
                    url: 'http://localhost:3000/getData',
                    data: {
                        token: token,
                        userId: userId
                    },
                    success: function (data) {
                        console.log('业务数据：', data);
                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
            },
            error: function (err) {
                console.log(err);
            }
        });
    },
    error: function (err) {
        console.log(err);
    }
});
```

1. 缺乏顺序性： 回调地狱导致的调试困难，和大脑的思维方式不符
2. 缺乏可信任性： 控制反转导致的一系列信任问题

#### Promise   Promise解决的是回调函数处理异步的第2个问题：控制反转。
它是一种规范，是一套处理JavaScript异步的机制。

```js

let getKeyPromise = function () {
    return new Promsie(function (resolve, reject) {
        $.ajax({
            type: 'get',
            url: 'http://localhost:3000/apiKey',
            success: function (data) {
               let key = data;
               resolve(key);         
            },
            error: function (err) {
                reject(err);
            }
        });
    });
};

let getTokenPromise = function (key) {
    return new Promsie(function (resolve, reject) {
        $.ajax({
            type: 'get',
            url: 'http://localhost:3000/getToken',
            data: {
                key: key
            },
            success: function (data) {
                resolve(data);         
            },
            error: function (err) {
                reject(err);
            }
        });
    });
};

let getDataPromise = function (data) {
    let token = data.token;
    let userId = data.userId;
    
    return new Promsie(function (resolve, reject) {
        $.ajax({
            type: 'get',
            url: 'http://localhost:3000/getData',
            data: {
                token: token,
                userId: userId
            },
            success: function (data) {
                resolve(data);         
            },
            error: function (err) {
                reject(err);
            }
        });
    });
};

getKeyPromise()
    .then(function (key) {
        return getTokenPromise(key);
    })
    .then(function (data) {
        return getDataPromise(data);
    })
    .then(function (data) {
        console.log('业务数据：', data);
    })
    .catch(function (err) {
        console.log(err);
    }); 
```
Promise可以保证以下情况:
1. 在JavaScript事件队列的当前运行完成之前，回调函数永远不会被调用
2. 通过 .then 形式添加的回调函数，甚至都在异步操作完成之后才被添加的函数，都会被调用
3. 通过多次调用 .then，可以添加多个回调函数，它们会按照插入顺序并且独立运行



ES6中的生成器（Gererator）。
迭代器原理：
```js
var str = 'hello';

// 可迭代协议使用for...of访问
typeof str[Symbol.iterator];    // 'function'

for (var s of str) {
    console.log(s);    // 分别打印 'h'、'e'、'l'、'l'、'o'
}

// 迭代器协议next方法
var iterator = str[Symbol.iterator]();

iterator.next();    // {value: "h", done: false}
iterator.next();    // {value: "e", done: false}
iterator.next();    // {value: "l", done: false}
iterator.next();    // {value: "l", done: false}
iterator.next();    // {value: "o", done: false}
iterator.next();    // {value: undefined, done: true}
```

实现异步
```js
function getKey () {
    $.ajax({
        type: 'get',
        url: 'http://localhost:3000/apiKey',
        success: function (data) {
            key = data;
            it.next(key);
        }
        error: function (err) {
            console.log(err);
        }
    });
}

function getToken (key) {
    $.ajax({
        type: 'get',
        url: 'http://localhost:3000/getToken',
        data: {
            key: key
        },
        success: function (data) {
            loginData = data;
            it.next(loginData);
        }
        error: function (err) {
            console.log(err);
        }
    });
}

function getData (loginData) {
    $.ajax({
        type: 'get',
        url: 'http://localhost:3000/getData',
        data: {
            token: loginData.token,
            userId: loginData.userId
        },
        success: function (busiData) {
            it.next(busiData);
        }
        error: function (err) {
            console.log(err);
        }
    });
}



function *main () {
    let key = yield getKey();
    let LoginData = yield getToken(key);
    let busiData = yield getData(loginData);
    console.log('业务数据：', busiData);
}

// 生成迭代器实例
var it = main();

// 运行第一步
it.next();
console.log('不影响主线程执行');
```

Async/Await
```js
let getKeyPromise = function () {
    return new Promsie(function (resolve, reject) {
        $.ajax({
            type: 'get',
            url: 'http://localhost:3000/apiKey',
            success: function (data) {
               let key = data;
               resolve(key);         
            },
            error: function (err) {
                reject(err);
            }
        });
    });
};

let getTokenPromise = function (key) {
    return new Promsie(function (resolve, reject) {
        $.ajax({
            type: 'get',
            url: 'http://localhost:3000/getToken',
            data: {
                key: key
            },
            success: function (data) {
                resolve(data);         
            },
            error: function (err) {
                reject(err);
            }
        });
    });
};

let getDataPromise = function (data) {
    let token = data.token;
    let userId = data.userId;
    
    return new Promsie(function (resolve, reject) {
        $.ajax({
            type: 'get',
            url: 'http://localhost:3000/getData',
            data: {
                token: token,
                userId: userId
            },
            success: function (data) {
                resolve(data);         
            },
            error: function (err) {
                reject(err);
            }
        });
    });
};

async function main () {
    let key = await getKeyPromise();
    let loginData = await getTokenPromise(key);
    let busiData = await getDataPromise(loginData);
    
    console.log('业务数据：', busiData);
}

main();

console.log('不影响主线程执行');
```


实现原理：可以尝试自己实现 lets Go
