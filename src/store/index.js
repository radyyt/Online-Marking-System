import { createApp } from 'vue'
import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      showMenu: false
    }
  },
  mutations: {
    isMenu(state){
      state.showMenu = true
    },
    noMenu(state){
      state.showMenu = false
    }
  }
})

export default store