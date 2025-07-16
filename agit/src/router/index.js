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
    {
      path: '/chatgpt',
      name: 'chatgpt',
      component: () => import('../views/ChatGPTView.vue'),
    },
    {
      path: '/claude',
      name: 'claude',
      component: () => import('../views/ClaudeView.vue'),
    },
    {
      path: '/gemini',
      name: 'gemini',
      component: () => import('../views/GeminiView.vue'),
    },
    {
      path: '/poe',
      name: 'poe',
      component: () => import('../views/PoeView.vue'),
    },
  ],
})

export default router
