import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/json-formatter',
      name: 'json-formatter',
      component: () => import('../views/JsonFormatterView.vue'),
    },
    {
      path: '/regex-tester',
      name: 'regex-tester',
      component: () => import('../views/RegexTesterView.vue'),
    },
    {
      path: '/base64',
      name: 'base64',
      component: () => import('../views/Base64View.vue'),
    },
    {
      path: '/url-encoder',
      name: 'url-encoder',
      component: () => import('../views/UrlEncoderView.vue'),
    },
    {
      path: '/converters',
      name: 'converters',
      component: () => import('../views/ConvertersView.vue'),
    },
    {
      path: '/diff-checker',
      name: 'diff-checker',
      component: () => import('../views/DiffCheckerView.vue'),
    },
    {
      path: '/clipboard',
      name: 'clipboard',
      component: () => import('../views/ClipboardView.vue'),
    },
  ],
})

export default router
