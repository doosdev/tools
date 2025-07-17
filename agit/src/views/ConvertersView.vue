<template>
  <div class="converters content-wrapper">
    <PageHeader 
      title="Online Converters" 
      back-text="뒤로가기"
      :show-back-text="false"
    />
    
    <div class="converter-container content-body">
      <el-tabs v-model="activeTab" type="border-card">
        <el-tab-pane label="XML to JSON" name="xml-to-json">
          <div class="converter-content">
            <el-row :gutter="20">
              <el-col :span="12">
                <h3>XML 입력</h3>
                <el-input
                  v-model="xmlInput"
                  type="textarea"
                  :rows="15"
                  placeholder="XML 데이터를 입력하세요..."
                />
              </el-col>
              <el-col :span="12">
                <h3>JSON 결과</h3>
                <div class="result-container">
                  <pre v-if="jsonOutput" class="output-text">{{ jsonOutput }}</pre>
                  <div v-else class="placeholder">변환된 JSON이 여기에 표시됩니다.</div>
                </div>
                <el-button v-if="jsonOutput" @click="convertXmlToJson" type="primary">
                  <i class="bx bx-transfer"></i> 변환
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="CSV to JSON" name="csv-to-json">
          <div class="converter-content">
            <el-row :gutter="20">
              <el-col :span="12">
                <h3>CSV 입력</h3>
                <el-input
                  v-model="csvInput"
                  type="textarea"
                  :rows="15"
                  placeholder="CSV 데이터를 입력하세요..."
                />
              </el-col>
              <el-col :span="12">
                <h3>JSON 결과</h3>
                <div class="result-container">
                  <pre v-if="csvJsonOutput" class="output-text">{{ csvJsonOutput }}</pre>
                  <div v-else class="placeholder">변환된 JSON이 여기에 표시됩니다.</div>
                </div>
                <el-button v-if="csvInput" @click="convertCsvToJson" type="primary">
                  <i class="bx bx-transfer"></i> 변환
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import PageHeader from '../components/PageHeader.vue'

const activeTab = ref('xml-to-json')
const xmlInput = ref('')
const jsonOutput = ref('')
const csvInput = ref('')
const csvJsonOutput = ref('')

const convertXmlToJson = () => {
  if (!xmlInput.value.trim()) {
    ElMessage.warning('XML 데이터를 입력해주세요.')
    return
  }
  
  try {
    // 간단한 XML to JSON 변환 (실제로는 더 복잡한 파서가 필요)
    ElMessage.info('XML to JSON 변환 기능은 개발 중입니다.')
  } catch (error) {
    ElMessage.error('변환 중 오류가 발생했습니다.')
  }
}

const convertCsvToJson = () => {
  if (!csvInput.value.trim()) {
    ElMessage.warning('CSV 데이터를 입력해주세요.')
    return
  }
  
  try {
    const lines = csvInput.value.trim().split('\n')
    if (lines.length < 2) {
      ElMessage.warning('CSV 데이터가 충분하지 않습니다.')
      return
    }
    
    const headers = lines[0].split(',').map(h => h.trim())
    const result = []
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim())
      const obj = {}
      headers.forEach((header, index) => {
        obj[header] = values[index] || ''
      })
      result.push(obj)
    }
    
    csvJsonOutput.value = JSON.stringify(result, null, 2)
    ElMessage.success('CSV to JSON 변환이 완료되었습니다.')
  } catch (error) {
    ElMessage.error('변환 중 오류가 발생했습니다.')
  }
}
</script>

<style scoped>
.converters {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}



.converter-container {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.converter-content h3 {
  margin-bottom: 15px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
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

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 1.5rem;
  }
}
</style> 