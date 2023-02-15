import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue';
import HomeView from '@/views/HomeView.vue';
import InstagramView from '../views/InstagramView.vue';
import YoutubeView from '../views/YoutubeView.vue';
import AppleView from '../views/AppleView.vue';
import InstagramPost from '../components/instagram/InstagramPostDetail.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainLayout,
      children: [
        {
          path: '/',
          component: HomeView,
        },
        {
          path: '/instagram',
          name: 'instagram',
          component: InstagramView,
        },
        {
          path: '/instagram/post/:img',
          name: 'instagram post',
          component: InstagramPost,
          props: true,
        },
        {
          path: '/youtube',
          name: 'youtube',
          component: YoutubeView,
        },
        {
          path: '/apple',
          name: 'apple',
          component: AppleView,
        },
      ],
    },
  ],
});

export default router;
