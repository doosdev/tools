<template>
  <div v-if="showInstallPrompt" class="pwa-install-prompt">
    <el-alert
      title="앱 설치"
      description="홈 화면에 추가하여 더 빠르게 접근하세요."
      type="success"
      :closable="false"
      show-icon
    >
      <template #default>
        <div class="install-actions">
          <el-button type="success" size="small" @click="installPWA">
            <i class="bx bx-download"></i> 설치
          </el-button>
          <el-button size="small" @click="dismissInstallPrompt">
            <i class="bx bx-x"></i> 나중에
          </el-button>
        </div>
      </template>
    </el-alert>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showInstallPrompt = ref(false)
const deferredPrompt = ref(null)

onMounted(() => {
  // PWA 설치 이벤트 리스너
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e
    showInstallPrompt.value = true
  })

  // 이미 설치된 경우 프롬프트 숨기기
  if (window.matchMedia('(display-mode: standalone)').matches) {
    showInstallPrompt.value = false
  }
})

const installPWA = async () => {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt()
    const { outcome } = await deferredPrompt.value.userChoice
    if (outcome === 'accepted') {
      console.log('PWA가 설치되었습니다.')
    }
    deferredPrompt.value = null
    showInstallPrompt.value = false
  }
}

const dismissInstallPrompt = () => {
  showInstallPrompt.value = false
  deferredPrompt.value = null
}
</script>

<style scoped>
.pwa-install-prompt {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
}

.install-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

@media (max-width: 768px) {
  .pwa-install-prompt {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
}
</style> 