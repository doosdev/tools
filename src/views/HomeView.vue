<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const tools = [
  {
    name: 'JSON Formatter',
    desc: 'JSON 데이터를 보기 좋게 정렬/검증',
    icon: 'bx-code-block',
    route: '/json-formatter',
  },
  {
    name: 'Regex Tester',
    desc: '정규표현식 테스트 및 디버깅',
    icon: 'bx-merge',
    route: '/regex-tester',
  },
  {
    name: 'Base64 Encoder/Decoder',
    desc: 'Base64 인코딩/디코딩',
    icon: 'bx-lock-alt',
    route: '/base64',
  },
  {
    name: 'URL Encoder/Decoder',
    desc: 'URL 인코딩/디코딩',
    icon: 'bx-link',
    route: '/url-encoder',
  },
  {
    name: 'Online Converters',
    desc: 'XML, CSV 등 다양한 포맷 변환',
    icon: 'bx-transfer',
    route: '/converters',
  },
  {
    name: 'Diff Checker',
    desc: '두 텍스트/코드의 차이 비교',
    icon: 'bx-diff',
    route: '/diff-checker',
  },
  {
    name: 'Clipboard Manager',
    desc: '복사/붙여넣기 기록 관리',
    icon: 'bx-clipboard',
    route: '/clipboard',
  },
]

const goToTool = (route) => {
  router.push(route)
}
</script>

<template>
  <div class="toolbox-main">
    <h1 class="main-title">개발자 유틸리티 툴박스</h1>
    <el-row :gutter="24" justify="center">
      <el-col
        v-for="tool in tools"
        :key="tool.name"
        :xs="24" :sm="12" :md="8" :lg="6" :xl="6"
        class="tool-col"
      >
        <el-card
          shadow="hover"
          class="tool-card"
          @click="goToTool(tool.route)"
        >
          <div class="card-content">
            <i :class="`bx ${tool.icon} card-icon`"></i>
            <div class="card-title">{{ tool.name }}</div>
            <div class="card-desc">{{ tool.desc }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.toolbox-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 16px;
}
.main-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2.5rem;
  letter-spacing: -1px;
}
.tool-card {
  cursor: pointer;
  border-radius: 18px;
  transition: transform 0.18s, box-shadow 0.18s;
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 60%, #e0e7ef 100%);
  box-shadow: 0 2px 16px 0 rgba(60,60,60,0.07);
}
.tool-card:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 8px 32px 0 rgba(60,60,60,0.13);
}
.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.card-icon {
  font-size: 2.8rem;
  color: #409eff;
  margin-bottom: 6px;
}
.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 2px;
}
.card-desc {
  font-size: 0.98rem;
  color: #666;
  text-align: center;
}
@media (max-width: 600px) {
  .main-title {
    font-size: 1.5rem;
  }
  .tool-card {
    min-height: 120px;
  }
  .card-icon {
    font-size: 2rem;
  }
}
</style>
