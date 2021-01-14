export default {
  namespaced: true,
  state: {
    items: null
  },
  mutations: {
    setItem (state, item) {
      state.items = item
    }
  },
  actions: {
    fetchItem ({ commit }, item) {
      commit('setItem', item)
    }
  }
}
