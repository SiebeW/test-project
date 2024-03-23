import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import SelectedPokemon from '@/views/SelectedPokemon.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: SelectedPokemon
  },
  {
    path: '/pokemon/:id',
    component: SelectedPokemon
  }
]
// 404: Not Found
// https://router.vuejs.org/guide/essentials/dynamic-matching

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router