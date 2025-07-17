<template>
  <div v-if="showInstallPrompt" class="pwa-install-prompt">
    <el-card class="install-card" shadow="hover">
      <div class="install-content">
        <div class="install-icon">
          <el-icon size="24" color="#67C23A"><Download /></el-icon>
        </div>
        <div class="install-text">
          <h3>앱을 설치하세요!</h3>
          <p>홈 화면에 추가하여 더 빠르게 접근할 수 있습니다.</p>
        </div>
        <div class="install-actions">
          <el-button type="success" @click="installApp" :loading="installing">
            {{ installing ? '설치중...' : '설치하기' }}
          </el-button>
          <el-button @click="dismissInstall">나중에</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Download } from '@element-plus/icons-vue'

const showInstallPrompt = ref(false)
const installing = ref(false)
let deferredPrompt = null

// PWA 설치 가능 여부 확인
const checkInstallable = () => {
  // 이미 설치되어 있는지 확인
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return false
  }
  
  // 설치 이벤트 리스너
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    showInstallPrompt.value = true
  })
  
  // 설치 완료 이벤트
  window.addEventListener('appinstalled', () => {
    showInstallPrompt.value = false
    ElMessage.success('앱이 성공적으로 설치되었습니다!')
  })
}

// 앱 설치
const installApp = async () => {
  if (!deferredPrompt) {
    ElMessage.error('설치를 사용할 수 없습니다.')
    return
  }
  
  installing.value = true
  try {
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      ElMessage.success('설치가 시작되었습니다!')
    } else {
      ElMessage.info('설치가 취소되었습니다.')
    }
    
    deferredPrompt = null
    showInstallPrompt.value = false
  } catch (error) {
    console.error('설치 중 오류:', error)
    ElMessage.error('설치 중 오류가 발생했습니다.')
  } finally {
    installing.value = false
  }
}

// 설치 알림 닫기
const dismissInstall = () => {
  showInstallPrompt.value = false
  deferredPrompt = null
}

onMounted(() => {
  checkInstallable()
})
</script>

<style scoped>
.pwa-install-prompt {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  max-width: 400px;
  animation: slideInUp 0.3s ease-out;
}

.install-card {
  border-radius: 12px;
  border: 1px solid #e4e7ed;
}

.install-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.install-icon {
  text-align: center;
  margin-bottom: 8px;
}

.install-text h3 {
  margin: 0 0 8px 0;
  color: #303133;
  font-size: 16px;
  font-weight: 600;
}

.install-text p {
  margin: 0;
  color: #606266;
  font-size: 14px;
  line-height: 1.5;
}

.install-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

@keyframes slideInUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .pwa-install-prompt {
    bottom: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
  
  .install-actions {
    flex-direction: column;
  }
}
</style> 