import { createApp } from 'vue'
import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      username: '',
      showMenu: false,
      //储存已选择的单选题
      singleChoices: [],
    }
  },
  mutations: {
    isMenu(state) {
      state.showMenu = true
    },
    noMenu(state) {
      state.showMenu = false
    },
    saveUsername(state, payload) {
      console.log(payload.name)
      state.username = payload.name
    },
    saveSingleChoices(state, payload) {
      state.singleChoices = payload
      console.log(state.singleChoices)
    }
  },
  actions: {
    saveSingleChoices({commit}, payload) {
      // console.log('actions')
      commit('saveSingleChoices', payload);
    },
  }
})

export default store