<template>
  <div class="json-formatter">
    <div class="page-header">
      <el-button @click="$router.push('/')" link class="back-btn">
        <i class="bx bx-arrow-back"></i> 뒤로가기
      </el-button>
      <h1>JSON Formatter & Validator</h1>
    </div>
    
    <div class="formatter-container">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="input-section">
            <h3>입력 JSON</h3>
            <el-input
              v-model="inputJson"
              type="textarea"
              :rows="15"
              placeholder="JSON 데이터를 입력하세요..."
              @input="formatJson"
            />
            <div class="action-buttons">
              <el-button type="primary" @click="formatJson">
                <i class="bx bx-code-block"></i> 포맷팅
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
            <div class="view-toggle">
              <el-radio-group v-model="viewMode" size="small">
                <el-radio-button value="tree">트리 뷰</el-radio-button>
                <el-radio-button value="text">텍스트</el-radio-button>
              </el-radio-group>
            </div>
            <div class="result-container">
              <div v-if="viewMode === 'tree' && parsedData" class="json-tree">
                <JsonTreeNode 
                  :data="parsedData" 
                  :name="'root'"
                  :level="0"
                />
              </div>
              <pre v-else-if="formattedJson" class="formatted-json">{{ formattedJson }}</pre>
              <div v-else class="placeholder">포맷팅된 JSON이 여기에 표시됩니다.</div>
            </div>
            <div class="validation-status">
              <el-tag v-if="isValid" type="success">
                <i class="bx bx-check"></i> 유효한 JSON
              </el-tag>
              <el-tag v-else-if="inputJson" type="danger">
                <i class="bx bx-x"></i> 유효하지 않은 JSON
              </el-tag>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import JsonTreeNode from '../components/JsonTreeNode.vue'

const inputJson = ref('')
const formattedJson = ref('')
const isValid = ref(false)
const parsedData = ref(null)
const viewMode = ref('tree')

const formatJson = () => {
  if (!inputJson.value.trim()) {
    formattedJson.value = ''
    isValid.value = false
    parsedData.value = null
    return
  }
  
  try {
    const parsed = JSON.parse(inputJson.value)
    formattedJson.value = JSON.stringify(parsed, null, 2)
    parsedData.value = parsed
    isValid.value = true
  } catch (error) {
    formattedJson.value = `Error: ${error.message}`
    isValid.value = false
    parsedData.value = null
  }
}

const clearInput = () => {
  inputJson.value = ''
  formattedJson.value = ''
  isValid.value = false
  parsedData.value = null
}
</script>

<style scoped>
.json-formatter {
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

.formatter-container {
  background: #fff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.input-section, .output-section {
  height: 100%;
}

.input-section h3, .output-section h3 {
  margin-bottom: 15px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.view-toggle {
  margin-bottom: 15px;
}

.action-buttons {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

.result-container {
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  min-height: 400px;
  background: #fafafa;
  padding: 15px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.5;
  overflow: auto;
}

.json-tree {
  color: #2c3e50;
}

.formatted-json {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 15px;
}

.placeholder {
  color: #999;
  text-align: center;
  padding: 50px 0;
}

.validation-status {
  margin-top: 15px;
}

@media (max-width: 768px) {
  .formatter-container {
    padding: 20px;
  }
  
  .page-header h1 {
    font-size: 1.5rem;
  }
}
</style> 