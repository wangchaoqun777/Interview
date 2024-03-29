#### SCSS

##### 1.变量

变量用来存储需要在 CSS 中复用的信息，例如颜色和字体。SASS 通过\$符号去声明一个变量。

```
$font-stack: Helvetica, sans-serif;
\$primary-color: #333;

body {
font: 100% $font-stack;
  color: $primary-color;
}
```

上面例子中变量$font-stack和$primary-color 的值将会替换所有引用他们的位置。

```
body {
  font: 100% Helvetica, sans-serif;
  color: #333; }
```

##### 嵌套

```
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

##### 引入

```
// _reset.scss
html, body, ul, ol {
  margin:  0;
  padding: 0;
}

// base.scss
@import 'reset';
body {
  font: 100% Helvetica, sans-serif;
  background-color: #efefef;
}
```

##### 混合

混合（Mixin）用来分组那些需要在页面中复用的 CSS 声明，开发人员可以通过向 Mixin 传递变量参数来让代码更加灵活，该特性在添加浏览器兼容性前缀的时候非常有用，SASS 目前使用@mixin name 指令来进行混合操作。

```
@mixin border-radius($radius) {
          border-radius: $radius;
      -ms-border-radius: $radius;
     -moz-border-radius: $radius;
  -webkit-border-radius: $radius;
}

.box {
  @include border-radius(10px);
}
```

##### 继承

// 这段代码不会被输出到最终生成的 CSS 文件，因为它没有被任何代码所继承。
%other-styles {
display: flex;
flex-wrap: wrap;
}

// 下面代码会正常输出到生成的 CSS 文件，因为它被其接下来的代码所继承。

```
%message-common {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.message {
  @extend %message-common;
}

.success {
  @extend %message-common;
  border-color: green;
}

.error {
  @extend %message-common;
  border-color: red;
}

.warning {
  @extend %message-common;
  border-color: yellow;
}
```

操作符
SASS 提供了标准的算术运算符，例如+、-、\*、/、%。在接下来的例子里，我们尝试在 aside 和 article 选择器当中对宽度进行简单的计算。
.container { width: 100%; }

```

article[role="main"] {
  float: left;
  width: 600px / 960px * 100%;
}

aside[role="complementary"] {
  float: right;
  width: 300px / 960px * 100%;
}
```
1. 动态 viewport + rem
<script>    
    var viewport = document.querySelector("meta[name=viewport]");
    //下面是根据设备像素设置viewport
    if (window.devicePixelRatio == 1) {
            viewport.setAttribute('content', 'width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no');
    }
    if (window.devicePixelRatio == 2) {
            viewport.setAttribute('content', 'width=device-width,initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no');
    }
    if (window.devicePixelRatio == 3) {
            viewport.setAttribute('content', 'width=device-width,initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no');
    }
    var docEl = document.documentElement;
    var fontsize = 10 * (docEl.clientWidth / 320) + 'px';
    docEl.style.fontSize = fontsize;

</script>

2. 
```css
.setBorderAll{
     position: relative;
       &:after{
           content:" ";
           position:absolute;
           top: 0;
           left: 0;
           width: 200%;
           height: 200%;
           transform: scale(0.5);
           transform-origin: left top;
           box-sizing: border-box;
           border: 1px solid #E5E5E5;
           border-radius: 4px;
      }
    }
    /* 将伪元素设置绝对定位，并且和父元素的左上角对齐，为了只缩放 border 1px 的粗细，而保证 border 的大小不变，将width、hegiht 设置200%，height设置为1px，然后进行在Y方向缩小0.5倍。 */
```