<template>
  <div v-if="showUpdatePrompt" class="pwa-update-prompt">
    <el-card class="update-card" shadow="hover">
      <div class="update-content">
        <div class="update-icon">
          <el-icon size="24" color="#409FF">
            <Refresh />
          </el-icon>
        </div>
        <div class="update-text">
          <h3>새로운 업데이트가 있습니다!</h3>
          <p>최신 버전으로 업데이트하여 새로운 기능을 사용해보세요.</p>
        </div>
        <div class="update-actions">
          <el-button type="primary" @click="updateApp" :loading="updating">
            {{ updating ? '업데이트 중...' : '지금 업데이트' }}
          </el-button>
          <el-button @click="dismissUpdate">나중에</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { registerSW } from 'virtual:pwa-register'
import { ElMessage } from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'

const showUpdatePrompt = ref(false)
const updating = ref(false)

// PWA 업데이트 감지 및 처리
const checkForUpdates = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.getRegistration()
      if (registration) {
        // 업데이트 확인
        await registration.update()
        
        // 업데이트 이벤트 리스너
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              showUpdatePrompt.value = true
            }
          })
        })
      }
    } catch (error) {
      console.error('PWA 업데이트 확인 중 오류:', error)
    }
  }
}

// 앱 업데이트
const updateApp = async () => {
  updating.value = true
  try {
    const registration = await navigator.serviceWorker.getRegistration()
    if (registration && registration.waiting) {
      // 새 서비스 워커에게 업데이트 메시지 전송
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
      
      // 페이지 새로고침
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }
  } catch (error) {
    console.error('업데이트 중 오류:', error)
    ElMessage.error('업데이트 중 오류가 발생했습니다.')
  } finally {
    updating.value = false
  }
}

// 업데이트 알림 닫기
const dismissUpdate = () => {
  showUpdatePrompt.value = false
}

onMounted(() => {
  checkForUpdates()
  
  // 서비스 워커 메시지 리스너
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'RELOAD_PAGE') {
        window.location.reload()
      }
    })
  }
})
</script>

<style scoped>
.pwa-update-prompt {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  max-width: 400px;
  animation: slideIn 0.3s ease-out;
}

.update-card {
  border-radius: 12px;
  border: 1px solid #e4e7ed;
}

.update-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.update-icon {
  text-align: center;
  margin-bottom: 8px;
}

.update-text h3 {
  margin: 0 0 8px 0;
  color: #303133;
  font-size: 16px;
  font-weight: 600;
}

.update-text p {
  margin: 0;
  color: #606266;
  font-size: 14px;
  line-height: 1.5;
}

.update-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .pwa-update-prompt {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
  
  .update-actions {
    flex-direction: column;
  }
}
</style> 