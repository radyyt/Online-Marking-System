import { createApp } from 'vue'
import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      username: '',
      showMenu: false
    }
  },
  mutations: {
    isMenu(state) {
      state.showMenu = true
    },
    noMenu(state) {
      state.showMenu = false
    },
    saveUsername(state,payload){
      console.log(payload.name)
      state.username = payload.name
    }
  }
})

export default store