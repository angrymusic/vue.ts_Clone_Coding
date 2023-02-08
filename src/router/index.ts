import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import HomeView from '@/views/HomeView.vue'
import InstagramView from '../views/InstagramView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainLayout,
      children: [
        {
          path: '',
          component: HomeView,
        },
        {
          path: '/instagram',
          name: 'instagram',
          component: InstagramView,
        },
      ],
    },
  ],
})

export default router
