BFC 块级格式化上下文
1. 在块格式化上下文中，从包含块的顶部开始，垂直地一个接一个地排列盒子。
2. 垂直方向上的距离由margin决定，属于同一个BFC的两个相邻Box的margin会发生重叠（1.上下相邻的两个元素 2.父元素与子元素的margin发生重叠）
A. 去除margin重叠的上下元素加float属性
.top, .btm {
  width: 200px;
  height: 200px;
  float：left；
  clear: both; /* 使元素能够垂直排列 */
}

B. 消除父子margin重叠的方法：
给父元素加border
设置父元素的padding或者margin
给父元素添加overflow：hidden

C. bfc的区域不会与float的元素区域重叠
.main {
  background: deepskyblue;
  width: 400px;
  height: 400px;
  overflow: hidden;
}

bfc就是页面上的一个独立容器，容器里面的子元素不会影响外面元素。

总结：我们可以用BFC机制完成的事情
清除浮动的影响
清除margin重叠