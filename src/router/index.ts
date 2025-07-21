import { createRouter, createWebHistory } from 'vue-router'
import Galeria from '../views/Galery.vue'
import All from '../views/All.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: All,
  },
  {
    path: '/galeria',
    name: 'galeria',
    component: Galeria,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
