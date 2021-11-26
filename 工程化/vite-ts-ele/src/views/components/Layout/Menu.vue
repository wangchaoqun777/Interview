<template>
  <el-scrollbar class="menu-scrollbar">
    <el-menu
      :default-active="active"
      :default-openeds="['dataManage']"
    >
      <el-sub-menu 
        v-for="item in routeArr"
        :key="item.name"
        :index="item.path"
      >
        <template #title>{{ item.meta?.title }}</template>
        <el-menu-item
          v-for="(item_i, index_i) in item.children"
          v-show="item_i.meta?.isMenu"
          :key="index_i"
          :index="item_i.path">
          <router-link
              tag="div"
              :to="`/admin/${item.path}/${item_i.path}`"
            >
              {{ item_i.meta?.title}}
            </router-link>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>

import { routes } from '@/router'
import { computed, ref} from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

const router = useRoute()

const routeArr = computed(()=> {
  return routes[0]['children']?.[1]['children']
})

const active = ref(router.name)

onBeforeRouteUpdate((value) => {
  active.value = value.name
})



</script>

<style lang="less" scoped>
  .menu-scrollbar {
    /deep/.el-scrollbar__wrap {
        overflow-x: hidden;
        border-right: 1px solid #dcdfe6;
    }
    a {
      color: #555;
      width: 100%;
    }
    /deep/.el-menu-item.is-active a {
      color: #409eff
    }
  }
</style>
