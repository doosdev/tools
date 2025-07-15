<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
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
