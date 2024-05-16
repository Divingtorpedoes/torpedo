import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import poetry from '../views/Poetry.vue'
import drop from '../views/Drop.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/image',
      name: 'home',
      component: HomeView
    },
    {
      path: '/poetry',
      name: 'poetry',
      component: poetry
    },
    {
      path: '/drop',
      name: 'drop',
      component: drop
    },


  ]
})

export default router
