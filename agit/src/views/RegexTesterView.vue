<template>
  <div class="regex-tester content-wrapper">
    <PageHeader 
      title="Regex Tester" 
      back-text="뒤로가기"
      :show-back-text="false"
    />
    
    <div class="tester-container content-body">
      <el-tabs v-model="activeTab" type="border-card" class="regex-tabs">
        <el-tab-pane label="정규식 테스터" name="tester">
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
                      <i class="bx bx bx-x"></i> 유효하지 않은 정규표현식
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
        </el-tab-pane>
        
        <el-tab-pane label="자주 사용하는 정규식" name="common">
          <div class="common-regex">
            <h3>폼 입력 검증 정규식</h3>
            <el-row :gutter="20">
              <el-col :span="8" v-for="(item, index) in commonRegexes" :key="index">
                <el-card class="regex-card" shadow="hover">
                  <template #header>
                    <div class="card-header">
                      <i :class="item.icon"></i>
                      <span>{{ item.name }}</span>
                    </div>
                  </template>
                  <div class="regex-content">
                    <div class="regex-pattern">
                      <code>{{ item.pattern }}</code>
                    </div>
                    <div class="regex-description">
                      {{ item.description }}
                    </div>
                    <div class="regex-examples">
                      <strong>예시:</strong>
                      <ul>
                        <li v-for="example in item.examples" :key="example">
                          {{ example }}
                        </li>
                      </ul>
                    </div>
                    <el-button 
                      type="primary" 
                      size="small" 
                      @click="useRegex(item.pattern)"
                      class="use-btn"
                    >
                      <i class="bx bx bx-copy"></i> 사용하기
                    </el-button>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PageHeader from '../components/PageHeader.vue'

const activeTab = ref('tester')
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

const commonRegexes = ref([
  {
    name: '이메일',
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    description: '이메일 주소 형식을 검증합니다.',
    examples: ['user@example.com', 'test.email@domain.co.kr'],
    icon: 'bx bx-envelope'
  },
  {
    name: '전화번호',
    pattern: '^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$',
    description: '한국 휴대폰 번호 형식을 검증합니다.',
    examples: ['010-1234-5678', '01012345678'],
    icon: 'bx bx-phone'
  },
  {
    name: '비밀번호',
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
    description: '영문 대소문자, 숫자, 특수문자 포함 8자 이상',
    examples: ['Password123!', 'MyPass@word1'],
    icon: 'bx bx-lock-alt'
  },
  {
    name: '한글 이름',
    pattern: '^[가-힣]{2,4}$',
    description: '한글 이름 2-4자리를 검증합니다.',
    examples: ['김철수', '이영희', '박민수'],
    icon: 'bx bx-user'
  },
  {
    name: '주민등록번호',
    pattern: '^\\d{6}-?[1-4]\\d{6}$',
    description: '주민등록번호 형식을 검증합니다.',
    examples: ['123456-1234567', '1234561234567'],
    icon: 'bx bx-id-card'
  },
  {
    name: 'URL',
    pattern: '^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$',
    description: 'HTTP/HTTPS URL 형식을 검증합니다.',
    examples: ['https://www.example.com', 'http://localhost:3000'],
    icon: 'bx bx-link'
  },
  {
    name: '숫자만',
    pattern: '^[0-9]+$',
    description: '숫자로만 구성된 문자열을 검증합니다.',
    examples: ['123', '456789'],
    icon: 'bx bx-hash'
  },
  {
    name: '영문만',
    pattern: '^[a-zA-Z]+$',
    description: '영문자로만 구성된 문자열을 검증합니다.',
    examples: ['hello', 'WORLD', 'Test'],
    icon: 'bx bx-font'
  },
  {
    name: '한글만',
    pattern: '^[가-힣]+$',
    description: '한글로만 구성된 문자열을 검증합니다.',
    examples: ['안녕하세요', '한글테스트'],
    icon: 'bx bx-font'
  }
])

const useRegex = (pattern) => {
  regexPattern.value = pattern
  activeTab.value = 'tester'
  testRegex()
}

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
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.regex-tabs {
  border: none;
}

.common-regex h3 {
  margin-bottom: 20px;
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
}

.regex-card {
  margin-bottom: 20px;
  transition: transform 0.2s;
}

.regex-card:hover {
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.card-header i {
  font-size: 18px;
  color: #409eff;
}

.regex-content {
  padding: 10px 0;
}

.regex-pattern {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 8px 12px;
  margin-bottom: 10px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
  word-break: break-all;
}

.regex-description {
  color: #666;
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 1.4;
}

.regex-examples {
  margin-bottom: 15px;
}

.regex-examples ul {
  margin: 5px 0;
  padding-left: 20px;
}

.regex-examples li {
  font-size: 13px;
  color: #555;
  margin-bottom: 2px;
}

.use-btn {
  width: 100%;
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