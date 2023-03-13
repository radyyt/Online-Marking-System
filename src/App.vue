<template>
  <div class="layout">
    <el-container class="container">
      <RouterView></RouterView>
    </el-container>
  </div>
</template>

<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter()
const store = useStore()

//用于检测用户是否登录
router.beforeEach((to, from, next) => {
  console.log("beforeEach")
  const refresh_token = localStorage.getItem('refresh_token')
  const expired_time = localStorage.getItem('expired_time')
  const current = Date.parse(new Date().getTime)

  //如果token未过期
  if (to.next = '/login') {
    next()
  } else {
    if (expired_time > current) {
      next()
    } else if (refresh_token) {
      axios.post('token/refresh/', {
        refresh: refresh_token,
      }).then(res => {
        const next_expired_time = Date.parse(res.headers.date) + 1800000
        localStorage.setItem('access_token', res.data.access)
        localStorage.setItem('expired_time', next_expired_time)
        localStorage.removeItem('refresh_token')
      }).catch(() => {
        localStorage.clear()
      })
    } else {
      localStorage.clear()
      console.log('no token')
      next({ path: '/login' })
    }
  }
})
</script>

<style scoped>
.layout {
  min-height: 100vh;
}

.container {
  height: 100vh;
}
</style>