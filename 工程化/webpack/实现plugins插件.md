一个webpack plugin由一下几个步骤组成：

一个JavaScript类函数。
在函数原型 (prototype)中定义一个注入compiler对象的apply方法。
apply函数中通过compiler插入指定的事件钩子,在钩子回调中拿到compilation对象
使用compilation操纵修改webapack内部实例数据。
异步插件，数据处理完后使用callback回调

```js
class MyPlugin {
    constructor(options) {
        this.options = options
        this.externalModules = {}
    }

    apply(compiler) {
        var reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)|(\/\*\*\*\*\*\*\/)/g
        compiler.hooks.emit.tap('CodeBeautify', (compilation)=> {
            Object.keys(compilation.assets).forEach((data)=> {
                let content = compilation.assets[data].source() // 欲处理的文本
                content = content.replace(reg, function (word) { // 去除注释后的文本
                    return /^\/{2,}/.test(word) || /^\/\*!/.test(word) || /^\/\*{3,}\//.test(word) ? "" : word;
                });
                compilation.assets[data] = {
                    source(){
                        return content
                    },
                    size(){
                        return content.length
                    }
                }
            })
        })
    }
}
module.exports = MyPlugin
```
### 参考
[内含tapable详解+webpack流程](https://juejin.cn/post/6844903713312604173)