###1. slot的常见用法
``` js
设置插槽
<a
  v-bind:href="url"
  class="nav-link"
>
  <slot></slot>
</a>

应用
<navigation-link url="/profile">
  Your Profile
</navigation-link>
```

###2. 具名插槽 （拥有具体名称的插槽，应用时可以根据名称像不同的插槽塞入内容）
```js
设置插槽
<div class="container">
  <header>
    <slot name="slotone"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="slottwo"></slot>
  </footer>
</div>

应用
<base-layout>
  <template slot="slotone">
    <h1>this is slot1</h1>
  </template>
  <template slot="slottwo">
    <h1>this is slot2</h1>
  </template>
 </base-layout>
```
###3. 作用域插槽
```js
有的时候你希望提供的组件，带有一个可以从自组件获取数据的可复用的插槽。
设置插槽
<ul>
  <li
    v-for="todo in todos"
    v-bind:key="todo.id"
  >
    <!-- 我们为每个 todo 准备了一个插槽，-->
    <!-- 将 `todo` 对象作为一个插槽的 prop 传入。-->
    <slot v-bind:todo="todo">
      <!-- 回退的内容 -->
      {{ todo.text }}
    </slot>
  </li>
</ul>

应用
<todo-list v-bind:todos="todos">
  <!-- 将 `slotProps` 定义为插槽作用域的名字 -->
  <template slot-scope="slotProps">
    <!-- 为待办项自定义一个模板，-->
    <!-- 通过 `slotProps` 定制每个待办项。-->
    <span v-if="slotProps.todo.isComplete">✓</span>
    {{ slotProps.todo.text }}
  </template>
</todo-list>
```

 - 新的简写形式
```js
  <template>
    <<base-table>
      <template #row="{item}">

      </template>
    </base-table>
  </template>
```