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
          <RouterView v-if="isRouterAlive"></RouterView>
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
import { computed, ref, provide, nextTick } from 'vue';
import axios from './utils/axios';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ElMessageBox, ElMessage } from 'element-plus'

const router = useRouter()
const store = useStore()
const showMenu = computed(() => store.state.showMenu)
const isMenu = () => store.commit('isMenu')
const noMenu = () => store.commit('noMenu')

//用于刷新页面
const isRouterAlive = ref(true)
const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}
provide('reload', reload)

//用于检测用户是否登录
router.beforeEach((to, from, next) => {
  const access_token = localStorage.getItem('access_token')
  const refresh_token = localStorage.getItem('refresh_token')

  if (to.path == '/login') {
    noMenu()
    // showMenu.value = false
    next()
  } else {
    // 如果token存在
    // 将token传回后台验证

    if (access_token) {
      isMenu()
      // showMenu.value = true
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
      ElMessageBox.alert('登录已失效，请重新登录', '提示', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: 'OK',
      }).then(() => {
        console.log('jump to login')
        noMenu()
        // showMenu.value = false
        next({ path: '/login' })
      })
    }
  }
})

//删除题目的函数
const deleteQuestion = (url) => {
  ElMessageBox.confirm(
    '确定要删除该题目吗？',
    '警告',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      axios.delete(url, { baseURL: '' }).then(res => {
        console.log(res)
        reload()
      })
      ElMessage({
        type: 'success',
        message: '成功删除',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}
provide('deleteQuestion', deleteQuestion)
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