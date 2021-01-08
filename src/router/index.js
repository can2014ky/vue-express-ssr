import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('../views/Home.vue');
const About = () => import('../views/About.vue');

Vue.use(Router)

// 工厂函数——创建新的路由实例
export default function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: '/about',
        name: 'about',
        component: About,
      },
    ]
  })
}
