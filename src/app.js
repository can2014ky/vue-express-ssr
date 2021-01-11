import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import createStore from './store'
import { sync } from 'vuex-router-sync'

// 工厂函数——创建新的应用程序实例
export default function createApp () {
  const router = createRouter()
  const store = createStore()
  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router }
}
