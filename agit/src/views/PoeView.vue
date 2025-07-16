<template>
  <div class="poe-container">
    <div class="content-header">
      <h1 class="page-title">
        <i class="bx bx-brain"></i>
        Poe
      </h1>
      <p class="page-description">Quora의 Poe AI 챗봇 플랫폼</p>
    </div>

    <div class="content-body">
      <el-card class="chat-card">
        <div class="chat-interface">
          <div class="chat-messages" ref="messagesContainer">
            <div
              v-for="(message, index) in messages"
              :key="index"
              :class="['message', message.role]"
            >
              <div class="message-content">
                <div class="message-text">{{ message.content }}</div>
                <div class="message-time">{{ formatTime(message.timestamp) }}</div>
              </div>
            </div>
          </div>

          <div class="chat-input">
            <el-input
              v-model="inputMessage"
              type="textarea"
              :rows="3"
              placeholder="메시지를 입력하세요..."
              @keydown.enter.ctrl="sendMessage"
            />
            <div class="input-actions">
              <el-button
                type="primary"
                :loading="isLoading"
                @click="sendMessage"
              >
                <i class="bx bx-send"></i>
                전송
              </el-button>
              <el-button @click="clearMessages">
                <i class="bx bx-trash"></i>
                대화 초기화
              </el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'

const messages = ref([
  {
    role: 'assistant',
    content: '안녕하세요! 저는 Poe입니다. 무엇을 도와드릴까요?',
    timestamp: new Date()
  }
])

const inputMessage = ref('')
const isLoading = ref(false)
const messagesContainer = ref(null)

const sendMessage = async () => {
  if (!inputMessage.value.trim() || isLoading.value) return

  // 사용자 메시지 추가
  messages.value.push({
    role: 'user',
    content: inputMessage.value,
    timestamp: new Date()
  })

  const userMessage = inputMessage.value
  inputMessage.value = ''
  isLoading.value = true

  // 스크롤을 맨 아래로
  await nextTick()
  scrollToBottom()

  // 시뮬레이션된 응답 (실제로는 API 호출)
  setTimeout(() => {
    messages.value.push({
      role: 'assistant',
      content: `죄송합니다. 이는 데모 버전입니다. 실제 Poe API 연동이 필요합니다.\n\n입력하신 메시지: "${userMessage}"`,
      timestamp: new Date()
    })
    isLoading.value = false
    
    nextTick(() => {
      scrollToBottom()
    })
  }, 1000)
}

const clearMessages = () => {
  messages.value = [
    {
      role: 'assistant',
      content: '대화가 초기화되었습니다. 무엇을 도와드릴까요?',
      timestamp: new Date()
    }
  ]
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const formatTime = (timestamp) => {
  return new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(timestamp)
}

onMounted(() => {
  scrollToBottom()
})
</script>

<style scoped>
.poe-container {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.content-header {
  text-align: center;
  margin-bottom: 32px;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.page-description {
  font-size: 1.1rem;
  color: #64748b;
  margin: 0;
}

.chat-card {
  height: calc(100vh - 200px);
  min-height: 500px;
}

.chat-interface {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  margin-bottom: 16px;
}

.message {
  margin-bottom: 16px;
  display: flex;
}

.message.user {
  justify-content: flex-end;
}

.message.assistant {
  justify-content: flex-start;
}

.message-content {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 12px;
  position: relative;
}

.message.user .message-content {
  background: #6366f1;
  color: white;
}

.message.assistant .message-content {
  background: white;
  color: #1e293b;
  border: 1px solid #e2e8f0;
}

.message-text {
  margin-bottom: 4px;
  white-space: pre-wrap;
  line-height: 1.5;
}

.message-time {
  font-size: 0.75rem;
  opacity: 0.7;
}

.chat-input {
  border-top: 1px solid #e2e8f0;
  padding-top: 16px;
}

.input-actions {
  display: flex;
  gap: 12px;
  margin-top: 12px;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .poe-container {
    padding: 16px;
  }
  
  .chat-card {
    height: calc(100vh - 150px);
  }
  
  .message-content {
    max-width: 85%;
  }
}
</style> 