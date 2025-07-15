<template>
  <div class="regex-tester">
    <div class="page-header">
      <el-button @click="$router.push('/')" link class="back-btn">
        <i class="bx bx-arrow-back"></i> 뒤로가기
      </el-button>
      <h1>Regex Tester</h1>
    </div>
    
    <div class="tester-container">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="input-section">
            <h3>정규표현식</h3>
            <el-input
              v-model="regexPattern"
              placeholder="정규표현식을 입력하세요 (예: [a-z]+)"
              @input="testRegex"
            />
            <div class="regex-options">
              <el-checkbox v-model="flags.global">Global (g)</el-checkbox>
              <el-checkbox v-model="flags.ignoreCase">Ignore Case (i)</el-checkbox>
              <el-checkbox v-model="flags.multiline">Multiline (m)</el-checkbox>
            </div>
            
            <h3>테스트 텍스트</h3>
            <el-input
              v-model="testText"
              type="textarea"
              :rows="10"
              placeholder="테스트할 텍스트를 입력하세요..."
              @input="testRegex"
            />
          </div>
        </el-col>
        
        <el-col :span="12">
          <div class="result-section">
            <h3>결과</h3>
            <div class="result-container">
              <div v-if="isValidRegex" class="matches">
                <div v-if="matches.length > 0">
                  <h4>매칭 결과 ({{ matches.length }}개)</h4>
                  <div v-for="(match, index) in matches" :key="index" class="match-item">
                    <span class="match-text">{{ match }}</span>
                  </div>
                </div>
                <div v-else class="no-matches">
                  매칭되는 결과가 없습니다.
                </div>
              </div>
              <div v-else class="invalid-regex">
                <el-tag type="danger">
                  <i class="bx bx-x"></i> 유효하지 않은 정규표현식
                </el-tag>
                <div class="error-message">{{ regexError }}</div>
              </div>
            </div>
            
            <div class="regex-info">
              <h4>정규표현식 정보</h4>
              <div class="info-item">
                <strong>패턴:</strong> <code>/{{ regexPattern }}/{{ activeFlags }}</code>
              </div>
              <div class="info-item">
                <strong>플래그:</strong> {{ activeFlags || '없음' }}
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const regexPattern = ref('')
const testText = ref('')
const matches = ref([])
const isValidRegex = ref(true)
const regexError = ref('')
const flags = ref({
  global: true,
  ignoreCase: false,
  multiline: false
})

const activeFlags = computed(() => {
  const active = []
  if (flags.value.global) active.push('g')
  if (flags.value.ignoreCase) active.push('i')
  if (flags.value.multiline) active.push('m')
  return active.join('')
})

const testRegex = () => {
  if (!regexPattern.value.trim()) {
    matches.value = []
    isValidRegex.value = true
    return
  }
  
  try {
    const regex = new RegExp(regexPattern.value, activeFlags.value)
    matches.value = testText.value.match(regex) || []
    isValidRegex.value = true
    regexError.value = ''
  } catch (error) {
    isValidRegex.value = false
    regexError.value = error.message
    matches.value = []
  }
}
</script>

<style scoped>
.regex-tester {
  max-width: 1400px;
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

.tester-container {
  background: #fff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.input-section h3, .result-section h3 {
  margin-bottom: 15px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.regex-options {
  margin: 15px 0 25px 0;
  display: flex;
  gap: 20px;
}

.result-container {
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  min-height: 300px;
  background: #fafafa;
  padding: 15px;
  margin-bottom: 20px;
}

.matches h4 {
  margin-bottom: 15px;
  color: #409eff;
}

.match-item {
  background: #e1f3ff;
  border: 1px solid #b3d8ff;
  border-radius: 4px;
  padding: 8px 12px;
  margin-bottom: 8px;
}

.match-text {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  color: #2c3e50;
}

.no-matches {
  color: #999;
  text-align: center;
  padding: 50px 0;
}

.invalid-regex {
  text-align: center;
  padding: 20px;
}

.error-message {
  margin-top: 10px;
  color: #f56c6c;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.regex-info {
  background: #f8f9fa;
  border-radius: 6px;
  padding: 15px;
}

.regex-info h4 {
  margin-bottom: 10px;
  color: #333;
}

.info-item {
  margin-bottom: 8px;
}

.info-item code {
  background: #e4e7ed;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

@media (max-width: 768px) {
  .tester-container {
    padding: 20px;
  }
  
  .page-header h1 {
    font-size: 1.5rem;
  }
  
  .regex-options {
    flex-direction: column;
    gap: 10px;
  }
}
</style> 