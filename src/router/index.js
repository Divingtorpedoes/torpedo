import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import poetry from '../views/Poetry.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/poetry',
      name: 'poetry',
      component: poetry
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

  ]
})

export default router
