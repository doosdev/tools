<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, inject } from 'vue'
import Layout from './components/Layout.vue'
import PWAUpdatePrompt from './components/PWAUpdatePrompt.vue'
import PWAInstallPrompt from './components/PWAInstallPrompt.vue'

// HomeView 참조를 Layout에 전달
const homeViewRef = inject('homeViewRef')
</script>

<template>
  <Layout>
    <RouterView ref="homeViewRef" />
  </Layout>
  <PWAUpdatePrompt />
  <PWAInstallPrompt />
</template>

<style scoped>

</style>
