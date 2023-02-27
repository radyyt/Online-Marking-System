import { createApp } from 'vue'
import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      //0--未登录、1--已登录
      isLogin: 0
    }
  },
  mutations: {
    login (state) {
      state.isLogin = 1
    }
  }
})

export default store