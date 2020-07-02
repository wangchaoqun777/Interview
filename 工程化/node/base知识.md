process.argv[0] : 返回启动 Node.js 进程的可执行文件所在的绝对路径
process.argv[1] : 为当前执行的 JavaScript 文件路径
process.argv.splice(2) : 移除前两者后，剩余的元素为其他命令行参数(也就是我们自定义部分)

**dirname: 总是返回被执行的 js 所在文件夹的绝对路径
**filename: 总是返回被执行的 js 的绝对路径
process.cwd(): 总是返回运行 node 命令时所在的文件夹的绝对路径

path.dirname()： 返回 path 的目录名
path.join()：所有给定的 path 片段连接到一起，然后规范化生成的路径
path.resolve()：方法会将路径或路径片段的序列解析为绝对路径，解析为相对于当前目录的绝对路径，相当于 cd 命令

fs 模块主要用于文件的读写、移动、复制、删除、重命名等操作。

url.parse：可以将一个 url 的字符串解析并返回一个 url 的对象
url.format:将传入的 url 对象编程一个 url 字符串并返回
