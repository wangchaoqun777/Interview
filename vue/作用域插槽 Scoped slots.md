#### Scoped slots就像常规插槽一样，但是它能够将参数从子组件传递到父组件/消费者
scoped slots就像是给组件传递了一个能够接收数据并返回Html的回调函数。
通过向子组件里面slot元素增加props,将参数传递给父组件。父组件通过解构destructuring slot-scope里面接收的属性数据来获得这些参数。
```js
<template>
  <li v-for="link in links">
    <slot name="link" 
      :link="link"
    >
    </slot>
  </li>
</template>

<links-list>
  <a slot="link"
    slot-scope="{ link }"
    :href="link.href"
    >
    {{ link.title}}
  </a>
</links-list>
```

#### binding Bindings是一系列属性或者监听事件的集合，通过使用v-bind或者v-on，绑定到特定的元素中。
```js
<template>
  <li v-for="link in links">
    <slot name="link" 
      :link="link"
      :bookreamrk="bookreamrk"
      :bookmarkButtonAttrs="{
        style: [ link.bookmared ? { dispaly: none } : {}]
      }"
      :bookmarkButtonEvents="{
        click: () => bookmark(link)
      }"
    >
    </slot>
  </li>
</template>

<links-list>
  <div slot="link"
    slot-scope="{ link, bookmarkButtonAttrs, bookmarkButtonEvents }"
    >
    <a :href="link.href">
     {{ link.title}}
    </a>
    <button
      v-bind="bookmarkButtonAttrs"
      v-on="bookmarkButtonEvents"
    >
     Bookmark
    </button>
  </div>
</links-list>
```

[链接](https://juejin.im/post/5c2d7030f265da613a54236f "https://juejin.im/post/5c2d7030f265da613a54236f")

将一个组件拆分成一个视图组件和一个函数式组件是非常有用的一种模式，可以使代码复用更容易，但并不是每次都值得这样做。
如果有以下这类情况，可以考虑使用这种模式：

 - 你打算构建一个库，并且希望用户可以自定义组件的外观
 - 在你的项目中有很多功能相似但布局不一样的组件

 总结： 
  视图代码和业务逻辑分离只是一种降低代码耦合，进而增加代码健壮性的一种手段，其深层次的就是组件应该符合高内聚、低耦合的思想，其它符合这种思想的手段还有像控制反转（IOC）、发布订阅模式等等，我觉得代码越往后写越应该培养这种意识，否则简简单单的写写业务代码，以完成需求而写代码，提升进步会比较慢。

