<template>
  <el-container class="h-full pt-16">
    <Navbar />
    <el-aside
      width="200px"
    >
      <Menu />
    </el-aside>
    <el-container>
      <el-main>
        <div>
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Navbar from './Navbar.vue'
import Menu from './Menu.vue'
</script>

<style lang="less" scoped>
</style>
