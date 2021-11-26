<template>
    <div class="relative w-full h-full overflow-hidden flex justify-center items-center">
      <el-card
        shadow="always"
        class="w-3/12 text-center relative"
      >
      <template #header>
        <div>
          <span class="title">管理平台</span>
        </div>
      </template>
      <el-form
        :model="params"
        :rules="rules"
        ref="loginForm"
        hide-required-asterisk
      >
        <el-form-item
          prop="username"
        >
          <el-input
            v-model="params.username"
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item
          prop="password"
        >
          <el-input
            v-model="params.password"
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            class="w-full"
            type="primary"
            @click="handleLogin()"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="copyright absolute bottom-10 text-center w-full text-xs text-white">Copyright© {{ year }} 北京光速斑马数据科技有限公司, all rights reserved |
      <a href="https://beian.miit.gov.cn" style="color: #ffffff"> 京ICP备17036596号-1</a>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { login } from '@/api'
  import { ElMessage } from 'element-plus'
  import { useStore } from 'vuex'
  import md5 from 'js-md5'
  import ColorAnimateViaGl from "@/views/admin/login/colorAnimateViaGl.vue";
  const store = useStore()
  const router = useRouter()
  const year = ref(0)
  const params = reactive({
    username: '',
    password: ''
  })
  const rules = {
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }]
  }

  const loginForm = ref(null)

  const handleLogin = () => {
    let values: any = loginForm.value
    values.validate(async(valid: boolean) => {
    if (!valid) return router.push('/login')
    await store.dispatch('update_token')
    try {
      const { errcode, message }:any = await login({
        ...params,
        password: md5(md5(params.password))
      })
      if (!errcode) {
        router.push('/admin/dataManage/demandList')
      } else {
        ElMessage.error(message)
      }
    } catch (error:any) {
      error && error.message && ElMessage.error(error.message)
    }
    })
  }

  year.value = new Date().getFullYear()
</script>
