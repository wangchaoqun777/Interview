<template>
  <el-header
    class="navbar fixed w-full h-16 top-0 leading-9 shadow z-10"
    height="56px"
  >
    <span class="mt-3 inline-block">观星数据对接平台</span>
    <el-dropdown trigger="click" @command="handleCommand" class="mt-3 float-right">
      <el-button type="text" class="text-sm">
        {{ username }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="logout">退出
          </el-dropdown-item>
      </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { logout } from '@/api'
const store = useStore()
const router = useRouter()
const handleCommand = async() => {
  const { errcode } = await logout()
  if (errcode === 0) { 
    localStorage.removeItem('token')
    router.push('/login')
  }
}
const username = computed(() => {
  const { nick_name, account_name, phone } = store.state.userInfo || {}
  return nick_name || account_name || phone || '管理员'
})
</script>

<style lang="less" scoped>
</style>
