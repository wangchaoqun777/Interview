- 新 API Vue.observable 手动打造一个 Vuex

```js
 - 创建 store
 import Vue from 'vue'

  // 通过Vue.observable创建一个可响应的对象
  export const store = Vue.observable({
    userInfo: {},
    roleIds: []
  })

  // 定义 mutations, 修改属性
  export const mutations = {
    setUserInfo(userInfo) {
      store.userInfo = userInfo
    },
    setRoleIds(roleIds) {
      store.roleIds = roleIds
    }
  }

  - 在组件中引用
  <template>
    <div>
      {{ userInfo.name }}
    </div>
  </template>
  <script>
  import { store, mutations } from '../store'
  export default {
    computed: {
      userInfo() {
        return store.userInfo
      }
    },
    created() {
      mutations.setUserInfo({
        name: '子君'
      })
    }
  }
  </script>

```
