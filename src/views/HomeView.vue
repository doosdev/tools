<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 카테고리별로 그룹핑된 도구들
const toolCategories = [
  {
    id: 'data-processing',
    name: '데이터 처리',
    icon: 'bx-data',
    tools: [
      {
        name: 'JSON Formatter',
        desc: 'JSON 데이터를 정렬/검증',
        icon: 'bx-code-block',
        route: '/json-formatter',
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
    ]
  },
  {
    id: 'text-tools',
    name: '텍스트 도구',
    icon: 'bx-text',
    tools: [
      {
        name: 'Regex Tester',
        desc: '정규표현식 테스트 및 디버깅',
        icon: 'bx-merge',
        route: '/regex-tester',
      },
      {
        name: 'Diff Checker',
        desc: '두 텍스트/코드의 차이 비교',
        icon: 'bx-candles',
        route: '/diff-checker',
      },
    ]
  },
  {
    id: 'converters',
    name: '포맷 변환',
    icon: 'bx-transfer',
    tools: [
      {
        name: 'Online Converters',
        desc: 'XML, CSV 등 다양한 포맷 변환',
        icon: 'bx-transfer',
        route: '/converters',
      },
    ]
  },
  {
    id: 'productivity',
    name: '생산성 도구',
    icon: 'bx-briefcase',
    tools: [
      {
        name: 'Clipboard Manager',
        desc: '복사/붙여넣기 기록 관리',
        icon: 'bx-clipboard',
        route: '/clipboard',
      },
    ]
  }
]

const activeCategory = ref('data-processing')
const isMobile = ref(false)
const isMobileMenuOpen = ref(false)

// 반응형 체크
const checkResponsive = () => {
  isMobile.value = window.innerWidth < 768
}

// 카테고리 클릭 핸들러
const selectCategory = (categoryId) => {
  activeCategory.value = categoryId
  scrollToCategory(categoryId)
}

// 카테고리로 스크롤
const scrollToCategory = (categoryId) => {
  const element = document.getElementById(`category-${categoryId}`)
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    })
  }
}

// 도구 클릭 핸들러
const goToTool = (route) => {
  router.push(route)
}

// 컴포넌트 마운트 시 반응형 체크
onMounted(() => {
  checkResponsive()
  window.addEventListener('resize', checkResponsive)
})

// 컴포넌트 언마운트 시 이벤트 리스너 제거
onUnmounted(() => {
  window.removeEventListener('resize', checkResponsive)
})
</script>

<template>
  <div class="toolbox-container" :class="{ 'mobile': isMobile }">
    <!-- 모바일 메뉴 토글 버튼 -->
    <div v-if="isMobile" class="mobile-menu-toggle">
      <el-button @click="isMobileMenuOpen = !isMobileMenuOpen" type="primary" size="large">
        <i class="bx bx-menu"></i>
      </el-button>
    </div>

    <!-- 좌측 사이드바 -->
    <div class="sidebar" :class="{ 'mobile-open': isMobileMenuOpen }">
      <div class="sidebar-header">
        <h2 class="sidebar-title">
          <i class="bx bx-toolbox"></i>
          카테고리
        </h2>
      </div>
      
      <div class="category-list">
        <div
          v-for="category in toolCategories"
          :key="category.id"
          class="category-item"
          :class="{ 'active': activeCategory === category.id }"
          @click="selectCategory(category.id)"
        >
          <i :class="`bx ${category.icon}`"></i>
          <span>{{ category.name }}</span>
          <span class="tool-count">{{ category.tools.length }}</span>
        </div>
      </div>
    </div>

    <!-- 우측 컨텐츠 영역 -->
    <div class="content-area">
      <div class="content-header">
        <h1 class="main-title">개발자 유틸리티 툴박스</h1>
        <p class="subtitle">개발에 필요한 다양한 도구들을 카테고리별로 정리했습니다</p>
      </div>

      <div class="categories-content">
        <div
          v-for="category in toolCategories"
          :key="category.id"
          :id="`category-${category.id}`"
          class="category-section"
        >
          <div class="category-header">
            <h2 class="category-title">
              <i :class="`bx ${category.icon}`"></i>
              {{ category.name }}
            </h2>
            <p class="category-desc">{{ category.tools.length }}개의 도구</p>
          </div>

          <div class="tools-grid">
            <div
              v-for="tool in category.tools"
              :key="tool.name"
              class="tool-card"
              @click="goToTool(tool.route)"
            >
              <div class="tool-icon">
                <i :class="`bx ${tool.icon}`"></i>
              </div>
              <div class="tool-info">
                <h3 class="tool-name">{{ tool.name }}</h3>
                <p class="tool-desc">{{ tool.desc }}</p>
              </div>
              <div class="tool-arrow">
                <i class="bx bx-chevron-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 모바일 오버레이 -->
    <div 
      v-if="isMobile && isMobileMenuOpen" 
      class="mobile-overlay"
      @click="isMobileMenuOpen = false"
    ></div>
  </div>
</template>

<style scoped>
.toolbox-container {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.toolbox-container.mobile {
  flex-direction: column;
}

/* 사이드바 스타일 */
.sidebar {
  width: 260px;
  min-width: 260px;
  background: white;
  border-right: 1px solid #e2e8f0;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 1000;
  overflow-y: auto;
}

.sidebar-header {
  padding: 24px 24px 16px;
  border-bottom: 1px solid #e2e8f0;
}

.sidebar-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.category-list {
  padding: 16px 0;
}

.category-item {
  display: flex;
  align-items: center;
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  gap: 12px;
  min-height: 48px;
}

.category-item:hover {
  background: #f1f5f9;
}

.category-item.active {
  background: #3b82f6;
  color: white;
}

.category-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #1d4ed8;
}

.category-item i {
  font-size: 1.2rem;
  width: 24px;
  text-align: center;
  flex-shrink: 0;
}

.category-item span {
  flex: 1;
  font-weight: 500;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tool-count {
  background: rgba(255, 255, 255, 0.2);
  color: inherit;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
  flex-shrink: 0;
}

/* 컨텐츠 영역 */
.content-area {
  flex: 1;
  margin-left: 260px;
  padding: 0;
  overflow-y: auto;
}

.content-header {
  background: white;
  padding: 40px 32px 32px;
  border-bottom: 1px solid #e2e8f0;
  text-align: center;
}

.main-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 12px 0;
  letter-spacing: -1px;
}

.subtitle {
  font-size: 1.1rem;
  color: #64748b;
  margin: 0;
}

.categories-content {
  padding: 32px;
}

.category-section {
  margin-bottom: 48px;
}

.category-header {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e2e8f0;
}

.category-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.category-desc {
  color: #64748b;
  margin: 0;
  font-size: 0.95rem;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
}

.tool-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  overflow: hidden;
}

.tool-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.tool-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6;
}

.tool-card:hover::before {
  transform: scaleX(1);
}

.tool-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tool-icon i {
  font-size: 1.5rem;
  color: white;
}

.tool-info {
  flex: 1;
}

.tool-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 6px 0;
}

.tool-desc {
  color: #64748b;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.tool-arrow {
  color: #cbd5e1;
  transition: all 0.2s ease;
}

.tool-card:hover .tool-arrow {
  color: #3b82f6;
  transform: translateX(4px);
}

/* 모바일 스타일 */
.mobile-menu-toggle {
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 1001;
}

.sidebar.mobile-open {
  transform: translateX(0);
}

.toolbox-container.mobile .sidebar {
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.toolbox-container.mobile .content-area {
  margin-left: 0;
  padding-top: 80px;
}

.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

/* 반응형 그리드 */
@media (max-width: 1024px) {
  .tools-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .content-header {
    padding: 24px 20px 20px;
  }
  
  .main-title {
    font-size: 1.75rem;
  }
  
  .categories-content {
    padding: 20px;
  }
  
  .tools-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .tool-card {
    padding: 20px;
  }
  
  .category-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .content-header {
    padding: 20px 16px 16px;
  }
  
  .main-title {
    font-size: 1.5rem;
  }
  
  .categories-content {
    padding: 16px;
  }
  
  .tool-card {
    padding: 16px;
    gap: 12px;
  }
  
  .tool-icon {
    width: 40px;
    height: 40px;
  }
  
  .tool-icon i {
    font-size: 1.25rem;
  }
}
</style>
