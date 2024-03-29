BFC 块级格式化上下文

1. 在块格式化上下文中，从包含块的顶部开始，垂直地一个接一个地排列盒子。
2. 垂直方向上的距离由 margin 决定，属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠（1.上下相邻的两个元素 2.父元素与子元素的 margin 发生重叠）
   A. 去除 margin 重叠的上下元素加 float 属性
   .top, .btm {
        width: 200px;
        height: 200px;
        float：left；
        clear: both; /_ 使元素能够垂直排列 _/
   }

    B. 消除父子 margin 重叠的方法：
        给父元素加 border
        设置父元素的 padding 或者 margin
        给父元素添加 overflow：hidden

    C. bfc 的区域不会与 float 的元素区域重叠
        .main {
            background: deepskyblue;
            width: 400px;
            height: 400px;
            overflow: hidden;
        }

bfc 就是页面上的一个独立容器，容器里面的子元素不会影响外面元素。

总结：我们可以用 BFC 机制完成的事情
清除浮动的影响
清除 margin 重叠

满足下列条件之一就可触发 BFC

根元素，即 HTML 元素；
浮动元素：float 除 none 以外的值；
定位元素：position (absolute、fixed)；
display 为 inline-block, table-cell, table-caption, flex, inline-flex；
overflow 除了 visible 以外的值 (hidden、auto、scroll)。

简单来说就是，BFC是一个完全独立的空间（布局环境），让空间里的子元素不会影响到外面的布局。那么怎么使用BFC呢，BFC可以看做是一个CSS元素属性
怎样触发BFC

BFC的规则
BFC就是一个块级元素，块级元素会在垂直方向一个接一个的排列
BFC就是页面中的一个隔离的独立容器，容器里的标签不会影响到外部标签
垂直方向的距离由margin决定， 属于同一个BFC的两个相邻的标签外边距会发生重叠
计算BFC的高度时，浮动元素也参与计算

