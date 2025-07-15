<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import Layout from './components/Layout.vue'
import PWAUpdatePrompt from './components/PWAUpdatePrompt.vue'
import PWAInstallPrompt from './components/PWAInstallPrompt.vue'

// HomeView 참조
const homeViewRef = ref(null)
</script>

<template>
  <Layout :home-view-ref="homeViewRef">
    <RouterView ref="homeViewRef" />
  </Layout>
  <PWAUpdatePrompt />
  <PWAInstallPrompt />
</template>

<style scoped>

</style>
