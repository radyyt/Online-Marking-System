<template>
  <div class="common-layout">
    <el-container v-if="showMenu">
      <el-aside width="200px" class="common-aside">
        <CommonAside />
      </el-aside>
      <el-container>
        <el-header class="common-header">
          <CommonHeader />
        </el-header>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
    <el-container v-else>
      <RouterView></RouterView>
    </el-container>
  </div>
</template>

<script setup>
import CommonHeader from './components/CommonHeader.vue';
import CommonAside from './components/CommonAside.vue';
import { computed } from 'vue'
import axios from 'axios';  
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter()
const store = useStore()
const showMenu = computed(() => store.state.showMenu)
const isMenu = () => store.commit('isMenu')
const noMenu = () => store.commit('noMenu')

  //用于检测用户是否登录
  router.beforeEach((to, from, next) => {
    const access_token = localStorage.getItem('access_token')
    const refresh_token = localStorage.getItem('refresh_token')

    if (to.path  == '/login') {
      noMenu()
      next()
    } else {
      // 如果token存在
      // 将token传回后台验证

      if (access_token) {
        isMenu()
        next()
      } else if (refresh_token) {
        axios.post('token/refresh/', {
          refresh: refresh_token,
        }).then(res => {
          localStorage.setItem('access_token', res.data.access)
          localStorage.removeItem('refresh_token')
        }).catch(() => {
          localStorage.clear()
        })
      } else {
        localStorage.clear()
        console.log('no token')
        noMenu()
        next({ path: '/login' })
      }
    }
  })
</script>

<style scoped>
.common-layout {
  min-height: 100vh;
}

.common-aside {
  width: 200px;
  height: 100vh;
  background-color: #545c64;
}

.common-header {
  border-bottom: 1px solid #e9e9e9;
}
</style>