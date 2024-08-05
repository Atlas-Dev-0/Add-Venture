import { createRouter, createWebHistory } from 'vue-router'
import game from '../views/AddVenture.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'game',
      component: game
    },
  ]
})

export default router
