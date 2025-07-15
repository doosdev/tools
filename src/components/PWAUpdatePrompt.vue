<template>
  <div v-if="needRefresh" class="pwa-update-prompt">
    <el-alert
      title="새로운 버전이 사용 가능합니다"
      description="최신 기능을 사용하려면 페이지를 새로고침하세요."
      type="info"
      :closable="false"
      show-icon
    >
      <template #default>
        <div class="update-actions">
          <el-button type="primary" size="small" @click="updateServiceWorker">
            <i class="bx bx-refresh"></i> 새로고침
          </el-button>
          <el-button size="small" @click="closePrompt">
            <i class="bx bx-x"></i> 나중에
          </el-button>
        </div>
      </template>
    </el-alert>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { registerSW } from 'virtual:pwa-register'

const needRefresh = ref(false)
const updateSW = ref(null)

onMounted(() => {
  updateSW.value = registerSW({
    onNeedRefresh() {
      needRefresh.value = true
    },
    onOfflineReady() {
      console.log('PWA가 오프라인에서 사용 가능합니다.')
    },
  })
})

const updateServiceWorker = async () => {
  if (updateSW.value) {
    await updateSW.value()
    needRefresh.value = false
  }
}

const closePrompt = () => {
  needRefresh.value = false
}
</script>

<style scoped>
.pwa-update-prompt {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
}

.update-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

@media (max-width: 768px) {
  .pwa-update-prompt {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
}
</style> 