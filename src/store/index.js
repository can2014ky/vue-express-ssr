import Vue from 'vue'
import Vuex from 'vuex'
import modules from './loadModules'

Vue.use(Vuex)

export default function createStore () {
  return new Vuex.Store({
    modules
  })
}
