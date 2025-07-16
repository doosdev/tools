<template>
  <div class="url-encoder">
    <PageHeader 
      title="URL Encoder/Decoder" 
      back-text="뒤로가기"
      :show-back-text="false"
    />
    
    <div class="tool-container">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="input-section">
            <h3>입력</h3>
            <el-input
              v-model="inputText"
              type="textarea"
              :rows="12"
              placeholder="URL을 인코딩/디코딩할 텍스트를 입력하세요..."
            />
            <div class="action-buttons">
              <el-button type="primary" @click="encode">
                <i class="bx bx-link"></i> 인코딩
              </el-button>
              <el-button type="success" @click="decode">
                <i class="bx bx-unlink"></i> 디코딩
              </el-button>
              <el-button @click="clearInput">
                <i class="bx bx-trash"></i> 지우기
              </el-button>
            </div>
          </div>
        </el-col>
        
        <el-col :span="12">
          <div class="output-section">
            <h3>결과</h3>
            <div class="result-container">
              <pre v-if="outputText" class="output-text">{{ outputText }}</pre>
              <div v-else class="placeholder">결과가 여기에 표시됩니다.</div>
            </div>
            <div class="copy-section">
              <el-button v-if="outputText" @click="copyToClipboard" type="info">
                <i class="bx bx-copy"></i> 복사
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import PageHeader from '../components/PageHeader.vue'

const inputText = ref('')
const outputText = ref('')

const encode = () => {
  if (!inputText.value.trim()) {
    ElMessage.warning('입력 텍스트를 입력해주세요.')
    return
  }
  
  try {
    outputText.value = encodeURIComponent(inputText.value)
    ElMessage.success('인코딩이 완료되었습니다.')
  } catch (error) {
    ElMessage.error('인코딩 중 오류가 발생했습니다.')
  }
}

const decode = () => {
  if (!inputText.value.trim()) {
    ElMessage.warning('입력 텍스트를 입력해주세요.')
    return
  }
  
  try {
    outputText.value = decodeURIComponent(inputText.value)
    ElMessage.success('디코딩이 완료되었습니다.')
  } catch (error) {
    ElMessage.error('유효하지 않은 URL 인코딩 형식입니다.')
  }
}

const clearInput = () => {
  inputText.value = ''
  outputText.value = ''
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(outputText.value)
    ElMessage.success('클립보드에 복사되었습니다.')
  } catch (error) {
    ElMessage.error('복사에 실패했습니다.')
  }
}
</script>

<style scoped>
.url-encoder {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}



.tool-container {
  background: #fff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.input-section h3, .output-section h3 {
  margin-bottom: 15px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.action-buttons {
  margin-top: 15px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.result-container {
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  min-height: 300px;
  background: #fafafa;
  padding: 15px;
  margin-bottom: 15px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.5;
  overflow: auto;
}

.output-text {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #2c3e50;
}

.placeholder {
  color: #999;
  text-align: center;
  padding: 50px 0;
}

.copy-section {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .tool-container {
    padding: 20px;
  }
  
  .page-header h1 {
    font-size: 1.5rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style> 