import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      username: '',
      showMenu: false,
      //储存已选择的单选题
      choice: [],
      subjective: [],
      subjects: [
        { value: 0, label: '语文' },
        { value: 1, label: '数学' },
        { value: 2, label: '英语' },
      ]
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
    saveChoice(state, payload) {
      state.choice = payload
      console.log(state.choice)
    },
    saveSubjective(state, payload) {
      state.subjective = payload
      console.log(state.subjective)
    },
  },
  actions: {
    saveChoice({ commit }, payload) {
      // console.log('actions')
      commit('saveChoice', payload)
    },
    saveSubjective({ commit }, payload) {
      commit('saveSubjective', payload)
    }
  }
})

export default store