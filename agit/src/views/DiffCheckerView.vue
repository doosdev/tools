<template>
  <div class="diff-checker">
    <div class="page-header">
      <el-button @click="$router.push('/')" link class="back-btn">
        <i class="bx bx-arrow-back"></i> 뒤로가기
      </el-button>
      <h1>Diff Checker</h1>
    </div>
    
    <div class="diff-container">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="text-section">
            <h3>텍스트 A</h3>
            <el-input
              v-model="textA"
              type="textarea"
              :rows="15"
              placeholder="첫 번째 텍스트를 입력하세요..."
              @input="compareTexts"
            />
          </div>
        </el-col>
        
        <el-col :span="12">
          <div class="text-section">
            <h3>텍스트 B</h3>
            <el-input
              v-model="textB"
              type="textarea"
              :rows="15"
              placeholder="두 번째 텍스트를 입력하세요..."
              @input="compareTexts"
            />
          </div>
        </el-col>
      </el-row>
      
      <div class="diff-result">
        <h3>차이점 비교</h3>
        <div class="result-container">
          <div v-if="diffResult" class="diff-content">
            <div v-for="(line, index) in diffResult" :key="index" :class="getDiffClass(line)">
              {{ line.text }}
            </div>
          </div>
          <div v-else class="placeholder">
            두 텍스트를 입력하면 차이점이 여기에 표시됩니다.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const textA = ref('')
const textB = ref('')
const diffResult = ref([])

const compareTexts = () => {
  if (!textA.value.trim() && !textB.value.trim()) {
    diffResult.value = []
    return
  }
  
  const linesA = textA.value.split('\n')
  const linesB = textB.value.split('\n')
  
  const result = []
  const maxLength = Math.max(linesA.length, linesB.length)
  
  for (let i = 0; i < maxLength; i++) {
    const lineA = linesA[i] || ''
    const lineB = linesB[i] || ''
    
    if (lineA === lineB) {
      result.push({ text: lineA, type: 'same' })
    } else {
      if (lineA) {
        result.push({ text: `- ${lineA}`, type: 'removed' })
      }
      if (lineB) {
        result.push({ text: `+ ${lineB}`, type: 'added' })
      }
    }
  }
  
  diffResult.value = result
}

const getDiffClass = (line) => {
  return {
    'diff-line': true,
    'diff-same': line.type === 'same',
    'diff-added': line.type === 'added',
    'diff-removed': line.type === 'removed'
  }
}
</script>

<style scoped>
.diff-checker {
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

.diff-container {
  background: #fff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.text-section h3, .diff-result h3 {
  margin-bottom: 15px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.diff-result {
  margin-top: 30px;
}

.result-container {
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  min-height: 300px;
  background: #fafafa;
  padding: 15px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.5;
  overflow: auto;
}

.diff-content {
  white-space: pre-wrap;
}

.diff-line {
  padding: 2px 0;
}

.diff-same {
  color: #666;
}

.diff-added {
  background: #f0f9ff;
  color: #059669;
  border-left: 3px solid #10b981;
  padding-left: 10px;
}

.diff-removed {
  background: #fef2f2;
  color: #dc2626;
  border-left: 3px solid #ef4444;
  padding-left: 10px;
}

.placeholder {
  color: #999;
  text-align: center;
  padding: 50px 0;
}

@media (max-width: 768px) {
  .diff-container {
    padding: 20px;
  }
  
  .page-header h1 {
    font-size: 1.5rem;
  }
}
</style> 