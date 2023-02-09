- 简单的两种 水平垂直居中

```css
.dad {
  position: relative;
}
.child {
  position: absolute;
  margin: 0 auto;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

====================== 
.dad {
  position: relative;
}
.child {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
}
```

- flex 的实现方式

```css
.dad {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

- 父容器属性
  flex-direction: column/row/row-reverse/column-reverse 主轴排列方向
  flex-wrap: nowrap/wrap/wrap-reverse 换行方式
  flex-flow: flex-direction flex-wrap 组合属性
  align-content 多行沿交叉轴对齐
  justify-content

- 位置排列 flex-start flex-end center
- 分布排列 space-between space-around

align-item

- 位置排列 flex-start flex-end center
- 基线排列 baseline
- 拉伸排列 stretch

* 子容器
  flex

align-self

- 位置排列 flex-start flex-end center
- 基线排列 baseline
- 拉伸排列 stretch

// 子元素的缩放
flex-basis 基准大小
flex-grow 扩展比例
flex-shrink 收缩比例
order 顺序
