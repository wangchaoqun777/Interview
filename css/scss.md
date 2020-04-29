- 支持常规的两种注释方法
  - //双斜杠的单行注释, eg : //这是一个圆角按钮
  - /\*\*/范围注释, eg:
- 变量

```js
 // 普通变量
 $fs: 12px
 p{
   font-size: $fs; //css: font-size: 12px
 }

 // 默认变量
 $fs: 12px !default;
 p {
   font-size: $fs;
 }
 // 覆盖
 $fs: 15px;
 $fs: 12px !default;
 p {
   font-size: $fs
 }
```

- 样式继承

```js
#mian{
  p{
    font-size: 15px
  }
  >a {
    span{
      font-size: 10px
    }
  }
}
```

- 父类选择器
  #mian{
  p{
  font-size: 15px
  }

  > a{

      &:link;
      &:visited{};
      &:hover{};
      &:active{};

  }
  }

- %占位符，减少 css 无用的样式的好方法

```js
 %mr5{
   margin-right: 5px;
 }
 body{
   @extend mr5
 }
```
