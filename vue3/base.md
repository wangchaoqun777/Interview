
- vue3  只支持到IE11

- vue2 与 vue3 的区别
  - Object.defineProperty(数组和属性删除拦截不了)  proxy(reactive) value setter (ref)
  - vue-cli vite2
  - Option Api Composition Api(可以抽离公共方法)
  - style :global color: v-bind(color)
  - createApp() 创建多个实例
  相比于 Vue2 使用的 Object.defineProperty，Vue3 不需要提前递归收集依赖，初始化的速度更快；
  Vue2 收集依赖的过程中会产生很多的 Dep 对象，Vue3 可以节省这部分的内存开销；
  Vue2 无法监听数组、对象的动态添加、删除，需要通过 $set、$delete，增加学习成本；
  Vue2 无法监听 Set、Map，只能处理普通对象。
- vueUse 工具库

- defineEmits defineProps 
- v-model 实现
  ```js
  let props = defineProps({
    modelValue: Number
  })
 let emits = defineEmits(['update:modelValue'])
  ```
- <transtion> 动画组建
  ```vue
    <template>
        <span class="dustbin">
          🗑
        </span>
    <div class="animate-wrap">
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="animate" v-show="animate.show">
                📋
            </div>
        </transition>
    </div>
    </template>

    <script setup>

    let animate = reactive({
      show:false,
      el:null
    })
    function beforeEnter(el){
          let dom = animate.el
          let rect = dom.getBoundingClientRect()
          let x = window.innerWidth - rect.left - 60
          let y = rect.top - 10
          el.style.transform = `translate(-${x}px, ${y}px)`
    }
    function enter(el,done){
          document.body.offsetHeight
          el.style.transform = `translate(0,0)`
          el.addEventListener('transitionend', done)
    }
    function afterEnter(el){
          animate.show = false
          el.style.display = 'none'
    }
    function removeTodo(e,i){
      animate.el = e.target
      animate.show = true
      todos.value.splice(i,1)
    }
    </script>
    <style>
    .animate-wrap .animate{
        position :fixed;
        right :10px;
        top :10px;
        z-index: 100;
        transition: all 0.5s linear;
    }
    </style>
  ```

  - 全家桶
    - vuex 公用版本的ref 
      - mutation 同步修改state (公共数据都通过mutation 所以可以devtool可以监控的到)
      - action 异步修改state, 通过 commit('mutation')
      - dispath(`action`)
       ```js
          // vuex-mini
          import { inject, reactive } from 'vue'

          const STORE_KEY = '__store__'
          function useStore() {
            return inject(STORE_KEY)
          }
          function createStore(options) {
            return new Store(options)
          }
          class Store {
            constructor(options) {
              this._state = reactive({
                data: options.state()
              })
              this._mutations = options.mutations
            }
            get state() { 
              return this._state.data 
            } 
            commit = (type, payload) => { 
              const entry = this._mutations[type] entry && entry(this.state, payload) 
            }
            // main.js入口处app.use(store)的时候，会执行这个函数 
            install(app) { 
              app.provide(STORE_KEY, this) 
            }
          }
          export { createStore, useStore }
       ```
      - vueRouter
      // vueRouter-mini
      ```js
        import {ref,inject} from 'vue'
        const ROUTER_KEY = '__router__'

        function createRouter(options){
            return new Router(options)
        }

        function useRouter(){
            return inject(ROUTER_KEY)
        }
        function createWebHashHistory(){
            function bindEvents(fn){
                window.addEventListener('hashchange',fn)
            }
            return {
                bindEvents,
                url:window.location.hash.slice(1) || '/'
            }
        }
        class Router{
            constructor(options){
                this.history = options.history
                this.routes = options.routes
                this.current = ref(this.history.url)

                this.history.bindEvents(()=>{
                    this.current.value = window.location.hash.slice(1)
                })
            }
            install(app){
                app.provide(ROUTER_KEY,this)
            }
        }

        export {createRouter,createWebHashHistory,useRouter}

        //使用
        import {
            createRouter,
            createWebHashHistory,
        } from './grouter/index'
        const router = createRouter({
          history: createWebHashHistory(),
          routes
        })
      ```
  - 性能检查
  Performance 页面则用来调试网页性能。Lighthouse 是 Google 官方开发的插件 debugger vue devTool
  ```js
  window.onerror = function(e){
      console.log(['https://stackoverflow.com/search?q=[js]+'+e])
  }
  ```

 - jsx （h函数） tempalte 生成虚拟dom vue3可以标记区分动态和静态的属性使虚拟dom的diff计算更快， 函数也增加了cache缓存。 vue3没有this的黑盒对ts更加友好

 - vue3 中ts的类型 node_modules/@vue/reactivity/dist/reactivity.d.ts

 - 性能优化
  dns-prefetch 网络请求优化
  压缩文件大小 精灵图
  图片懒加载
  路由懒加载 将不同页面的代码分开打包
  执行 npm install 操作来安装插件 rollup-plugin-visualizer