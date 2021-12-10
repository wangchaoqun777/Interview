# 正则表达式是匹配模式，要么匹配字符，要么匹配位置
## 字符匹配
- 模糊匹配
 - 横向模糊匹配 /ab{2,5}c/g
  ```js
    var regex = /ab{2,5}c/g;
    var string = "abc abbc abbbc abbbbc abbbbbc abbbbbbc";
    console.log( string.match(regex) ); 
    // => ["abbc", "abbbc", "abbbbc", "abbbbbc"]

  ```
 - 纵向模糊匹配 /a[012]c/g
  ```js
  var regex = /a[123]b/g;
  var string = "a0b a1b a2b a3b a4b";
  console.log( string.match(regex) ); 
  // => ["a1b", "a2b", "a3b"]

  ```
- 字符组
  - 范围字符组 [0-9] [a-z] [A-Z]
  - 排除组 [^abc]
  - 简写字符组
    - \d [0-9]  表示是一位数字
    - \D [^0-9] 表示除数字外的任意字符
    - \w [0-9a-zA-Z] 表示数字、大小写字母和下划线
    - \W [^0-9a-zA-Z] 非单词字符
    - \s [ \t\v\b\r\f] 表示空白符，包括空格、水平制表符、垂直制表符、换行符、回车符、换页符
    - \S [^\t\v\b\r\f] 非空白符
    - . 通配符 [\d\D] 通配符，表示几乎任意字符。换行符、回车符、行分隔符和段分隔符除外
  - 量词
    - {m, n} 出现 m 到 n 次
    - {m,} 表示至少出现m次。
    - {m} 等价于{m,m}，表示出现m次。
    - ? 等价于 {0, 1} 表示出现或者不出现
    - + 等价于 {1, } 表示出现至少一次
    - * 等价于 {0, } 表示出现任意次，有可能不出现。
    - 以上规则加 (reg + ? 惰性匹配尽可能少的匹配) 
  ```js
    var regex = /\d{2,5}?/g;
    var string = "123 1234 12345 123456";
    console.log( string.match(regex) ); 
    // => ["12", "12", "34", "12", "34", "12", "34", "56"]
  ```
  - 多选 (惰性)
    ```js
    var regex = /goodbye|good/g;
    var string = "goodbye";
    console.log( string.match(regex) ); 
    // => ["goodbye"]

    ```
## 位置匹配
  - ^ $ 匹配开头和结尾
  - /b /B 匹配单词/w的边界 匹配非单词的边界
  ```js
    var result = "[JS] Lesson_01.mp4".replace(/\b/g, '#');
    console.log(result); 
    // => "[#JS#] #Lesson_01#.#mp4#"

  ```
  - (?=p) (?!p) 为p前面的位置/除了p前面的位置
  ```js
    var result = "12345678".replace(/(?!^)(?=\d{3}$)/g, ',')
    console.log(result); 
    // => "12345,678"

  ```

- 括号
  - 分组  /(ab)+/g
  - 分支 /a | b/ 或的作用
  - 反向引用 \1 \2 \3 引用前面的分组 开括号为一个分组

- 回溯
  - 其中退到之前的某一步这一过程，我们称为“回溯”

- 操作符的优先级
  1.转义符 \
  2.括号和方括号 (...)、(?:...)、(?=...)、(?!...)、[...]
  3.量词限定符 {m}、{m,n}、{m,}、?、*、+
  4.位置和序列 ^ 、$、 \元字符、 一般字符
  5. 管道符（竖杠）|

- 验证 search test mathch exec
- 提取 search test mathch exec replace
- 替换 replace




var reg =  /^[0-9a-zA-Z]+([\.\-_]*[0-9a-zA-Z]+)*@([0-9a-zA-Z]+[\-_]*[0-9a-zA-Z]+\.)+[0-9a-zA-Z]{2,6}$/  qc邮箱