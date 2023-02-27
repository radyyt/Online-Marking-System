<template>
  <div class="layout">
    <el-container class="container">
      <RouterView></RouterView>
    </el-container>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter()
const store = useStore()

router.beforeEach((to, from, next) => {
  console.log('checking...')
  if (to.path == '/login') {
    next()
  } else {
    if (store.state.isLogin == 1) {
      next()
    } else {
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