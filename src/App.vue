<script setup>
import { RouterLink, RouterView } from 'vue-router' 
import PWAUpdatePrompt from './components/PWAUpdatePrompt.vue'
import PWAInstallPrompt from './components/PWAInstallPrompt.vue'
</script>

<template> 
  <RouterView />
  <PWAUpdatePrompt />
  <PWAInstallPrompt />
</template>

<style scoped>
  
</style>
