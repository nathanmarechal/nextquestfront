import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomePage.vue'
import GamePage from '../views/GamePage.vue'
import CGUPage from '@/views/CGUPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homeView',
    component: HomeView
  },
  {
    path: '/game/:gameName',
    name: 'GamePage',
    component: GamePage,
    props: true
  },
  {
    path: '/CGU',
    name: 'CGU',
    component: CGUPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
