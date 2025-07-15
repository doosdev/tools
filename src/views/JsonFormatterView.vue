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
              :rows="26"
              placeholder="JSON 데이터를 입력하세요..."
              @input="formatJson"
              :style="{ fontSize: '12px', lineHeight: '16px' }"
            />
            <div class="action-buttons">
              <el-button type="primary" @click="formatJson">
                <i class="bx bx-code-block"></i> 포맷팅
              </el-button>
              <el-button type="success" @click="formatJsonWithDecode">
                <i class="bx bx-link"></i> 포맷팅 + URL 디코딩
              </el-button>
              <el-button @click="clearInput">
                <i class="bx bx-trash"></i> 지우기
              </el-button>
            </div>
          </div>
        </el-col>
        
        <el-col :span="12">
          <div class="output-section">
            <h3>결과
                <div class="validation-status">
                    <el-tag v-if="isValid" type="success">
                        <i class="bx bx-check"></i> 유효한 JSON
                    </el-tag>
                    <el-tag v-else-if="inputJson" type="danger">
                        <i class="bx bx-x"></i> 유효하지 않은 JSON
                    </el-tag>
                </div> 
            </h3>
            <div class="view-toggle">
              <el-radio-group v-model="viewMode" size="small">
                <el-radio-button value="tree">트리 뷰</el-radio-button>
                <el-radio-button value="text">텍스트</el-radio-button>
              </el-radio-group>
              <div class="copy-section">
                <el-button 
                    v-if="viewMode === 'tree' && parsedData" 
                    @click="expandAll" 
                    type="warning"
                    size="small"
                >
                    <i class="bx bx-expand-alt"></i> 전체 펼치기
                </el-button>
                <el-button 
                    v-if="viewMode === 'tree' && parsedData" 
                    @click="collapseAll" 
                    type="warning"
                    size="small"
                >
                    <i class="bx bx-collapse-alt"></i> 전체 접기
                </el-button>
                <el-button 
                    v-if="formattedJson || (viewMode === 'tree' && parsedData)" 
                    @click="copyResult" 
                    type="info"
                    size="small"
                >
                    <i class="bx bx-copy"></i> 결과 복사
                </el-button>
                </div>
            </div> 
            
            <div class="result-container">
              <div v-if="viewMode === 'tree' && parsedData" class="json-tree">
                <JsonTreeNode 
                  :data="parsedData" 
                  :name="'root'"
                  :level="0"
                  :global-expanded="globalExpanded"
                />
              </div>
              <pre v-else-if="formattedJson" class="formatted-json">{{ formattedJson }}</pre>
              <div v-else class="placeholder">포맷팅된 JSON이 여기에 표시됩니다.</div>
            </div>
            
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import JsonTreeNode from '../components/JsonTreeNode.vue'

const inputJson = ref('')
const formattedJson = ref('')
const isValid = ref(false)
const parsedData = ref(null)
const viewMode = ref('tree')
const globalExpanded = ref(true) // 전체 펼치기/접기 상태를 저장할 참조

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

const formatJsonWithDecode = () => {
  if (!inputJson.value.trim()) {
    formattedJson.value = ''
    isValid.value = false
    parsedData.value = null
    return
  }
  
  try {
    const parsed = JSON.parse(inputJson.value)
    const decoded = decodeUrlInObject(parsed)
    formattedJson.value = JSON.stringify(decoded, null, 2)
    parsedData.value = decoded
    isValid.value = true
  } catch (error) {
    formattedJson.value = `Error: ${error.message}`
    isValid.value = false
    parsedData.value = null
  }
}

const decodeUrlInObject = (obj) => {
  if (typeof obj === 'string') {
    // 문자열이 URL 인코딩된 것인지 확인하고 디코딩
    try {
      if (obj.includes('%')) {
        return decodeURIComponent(obj)
      }
      return obj
    } catch {
      return obj
    }
  } else if (Array.isArray(obj)) {
    return obj.map(item => decodeUrlInObject(item))
  } else if (obj !== null && typeof obj === 'object') {
    const decoded = {}
    for (const [key, value] of Object.entries(obj)) {
      decoded[key] = decodeUrlInObject(value)
    }
    return decoded
  }
  return obj
}

const clearInput = () => {
  inputJson.value = ''
  formattedJson.value = ''
  isValid.value = false
  parsedData.value = null
}

const copyResult = async () => {
  try {
    let textToCopy = ''
    
    if (viewMode.value === 'tree' && parsedData.value) {
      // 트리 뷰 모드일 때는 포맷팅된 JSON 텍스트로 복사
      textToCopy = JSON.stringify(parsedData.value, null, 2)
    } else if (formattedJson.value) {
      // 텍스트 뷰 모드일 때는 포맷팅된 JSON 그대로 복사
      textToCopy = formattedJson.value
    }
    
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy)
      ElMessage.success('결과가 클립보드에 복사되었습니다.')
    }
  } catch (error) {
    ElMessage.error('복사에 실패했습니다.')
  }
}

const expandAll = () => {
  globalExpanded.value = true
}

const collapseAll = () => {
  globalExpanded.value = false
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
  display: flex;
  justify-content: space-between; 
}

.view-toggle { 
    justify-content: space-between;
    display: flex;
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
  line-height: 16px;
  font-size: 12px;
}

.placeholder {
  color: #999;
  text-align: center;
  padding: 50px 0;
}

.copy-section { 
  display: flex;
  justify-content: flex-end;
  gap: 8px;
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