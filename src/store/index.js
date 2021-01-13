import Vue from 'vue'
import Vuex from 'vuex'
import modules from './loadModules'

Vue.use(Vuex)

export default function createStore () {
  return new Vuex.Store({
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
    },
    modules
  })
}
