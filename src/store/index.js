import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      username: '',
      showMenu: false,
      subjects: [
        { value: 0, label: '语文' },
        { value: 1, label: '数学' },
        { value: 2, label: '英语' },
      ],
      //已选择的题目
      selected: [],
      selectedExamId: undefined
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
    saveSelected(state, payload) {
      state.selected = payload
    },
    saveSelectedExamId(state, payload) {
      state.selectedExamId = payload
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