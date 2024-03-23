import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import SelectedPokemon from '@/views/SelectedPokemon.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: SelectedPokemon
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router