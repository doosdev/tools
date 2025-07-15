<template>
  <div class="clipboard-manager">
    <div class="page-header">
      <el-button @click="$router.push('/')" link class="back-btn">
        <i class="bx bx-arrow-back"></i> 뒤로가기
      </el-button>
      <h1>Clipboard Manager</h1>
    </div>
    
    <div class="clipboard-container">
      <div class="input-section">
        <h3>새 항목 추가</h3>
        <el-input
          v-model="newItem"
          type="textarea"
          :rows="4"
          placeholder="클립보드에 저장할 텍스트를 입력하세요..."
        />
        <div class="action-buttons">
          <el-button type="primary" @click="addItem">
            <i class="bx bx-plus"></i> 추가
          </el-button>
          <el-button @click="clearAll">
            <i class="bx bx-trash"></i> 전체 삭제
          </el-button>
        </div>
      </div>
      
      <div class="clipboard-list">
        <h3>클립보드 기록 ({{ clipboardItems.length }}개)</h3>
        <div v-if="clipboardItems.length > 0" class="items-container">
          <div
            v-for="(item, index) in clipboardItems"
            :key="index"
            class="clipboard-item"
          >
            <div class="item-content">
              <div class="item-text">{{ item.text }}</div>
              <div class="item-time">{{ formatTime(item.timestamp) }}</div>
            </div>
            <div class="item-actions">
              <el-button @click="copyItem(item.text)" link size="small">
                <i class="bx bx-copy"></i>
              </el-button>
              <el-button @click="removeItem(index)" link size="small" color="red">
                <i class="bx bx-trash"></i>
              </el-button>
            </div>
          </div>
        </div>
        <div v-else class="empty-state">
          <i class="bx bx-clipboard empty-icon"></i>
          <p>클립보드 기록이 없습니다.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const newItem = ref('')
const clipboardItems = ref([])

onMounted(() => {
  // 로컬 스토리지에서 클립보드 항목들 불러오기
  const saved = localStorage.getItem('clipboardItems')
  if (saved) {
    clipboardItems.value = JSON.parse(saved)
  }
})

const addItem = () => {
  if (!newItem.value.trim()) {
    ElMessage.warning('텍스트를 입력해주세요.')
    return
  }
  
  const item = {
    text: newItem.value.trim(),
    timestamp: new Date().toISOString()
  }
  
  clipboardItems.value.unshift(item)
  newItem.value = ''
  saveToStorage()
  ElMessage.success('클립보드에 추가되었습니다.')
}

const removeItem = (index) => {
  clipboardItems.value.splice(index, 1)
  saveToStorage()
  ElMessage.success('항목이 삭제되었습니다.')
}

const clearAll = () => {
  clipboardItems.value = []
  saveToStorage()
  ElMessage.success('모든 항목이 삭제되었습니다.')
}

const copyItem = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    ElMessage.success('클립보드에 복사되었습니다.')
  } catch (error) {
    ElMessage.error('복사에 실패했습니다.')
  }
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleString('ko-KR')
}

const saveToStorage = () => {
  localStorage.setItem('clipboardItems', JSON.stringify(clipboardItems.value))
}
</script>

<style scoped>
.clipboard-manager {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  gap: 20px;
}

.back-btn {
  font-size: 16px;
}

.page-header h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
}

.clipboard-container {
  background: #fff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.input-section h3, .clipboard-list h3 {
  margin-bottom: 15px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.action-buttons {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

.clipboard-list {
  margin-top: 30px;
}

.items-container {
  max-height: 500px;
  overflow-y: auto;
}

.clipboard-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  margin-bottom: 10px;
  background: #fafafa;
  transition: all 0.2s;
}

.clipboard-item:hover {
  background: #f0f0f0;
  border-color: #409eff;
}

.item-content {
  flex: 1;
  margin-right: 15px;
}

.item-text {
  font-size: 14px;
  line-height: 1.4;
  color: #333;
  word-break: break-word;
  max-height: 60px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.item-time {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}

.item-actions {
  display: flex;
  gap: 5px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  opacity: 0.5;
}

@media (max-width: 768px) {
  .clipboard-container {
    padding: 20px;
  }
  
  .page-header h1 {
    font-size: 1.5rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .clipboard-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .item-content {
    margin-right: 0;
    margin-bottom: 10px;
    width: 100%;
  }
  
  .item-actions {
    align-self: flex-end;
  }
}
</style> 