import { createRouter, createWebHistory } from 'vue-router'
import Galeria from '../views/Galery.vue'
import Home from '../views/All.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/galeria', component: Galeria }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
