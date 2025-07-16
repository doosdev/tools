<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { toolCategories } from '../data/toolCategories.js'

const router = useRouter()

// 도구 클릭 핸들러
const goToTool = (route) => {
  router.push(route)
}

// 하이라이트 관련 상태
const highlightedCategory = ref(null)
const highlightTimeout = ref(null)

// 하이라이트 효과 적용
const highlightCategory = (categoryId) => {
  // 기존 하이라이트 제거
  if (highlightedCategory.value) {
    const prevElement = document.getElementById(`category-${highlightedCategory.value}`)
    if (prevElement) {
      prevElement.classList.remove('highlighted')
    }
  }

  // 새로운 하이라이트 적용
  highlightedCategory.value = categoryId
  const element = document.getElementById(`category-${categoryId}`)
  if (element) {
    element.classList.add('highlighted')

    // 애니메이션 완료 후 클래스 제거 (1.5초)
    if (highlightTimeout.value) {
      clearTimeout(highlightTimeout.value)
    }
    highlightTimeout.value = setTimeout(() => {
      element.classList.remove('highlighted')
      highlightedCategory.value = null
    }, 1500)
  }
}

// URL 파라미터에서 카테고리 확인
const checkUrlForCategory = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const category = urlParams.get('category')
  if (category) {
    // URL 파라미터 제거
    window.history.replaceState({}, document.title, window.location.pathname)
    // 하이라이트 적용
    setTimeout(() => {
      highlightCategory(category)
    }, 100)
  }
}

// 컴포넌트 마운트 시 URL 파라미터 확인
onMounted(() => {
  checkUrlForCategory()
})

// 컴포넌트 언마운트 시 타이머 정리
onUnmounted(() => {
  if (highlightTimeout.value) {
    clearTimeout(highlightTimeout.value)
  }
})

// 전역으로 하이라이트 함수 노출 (Sidebar에서 사용)
defineExpose({
  highlightCategory
})
</script>

<template>
  <div class="home-container">
    <div class="content-header">
      <h1 class="main-title">DOO Dev. Collection <span class="sub-logo">픞</span></h1>
      <p class="subtitle">개발에 필요한 도구/기술 들을 정리했습니다</p>
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
</template>

<style scoped>

.home-container {
  width: 100%;
}

.content-header {
  background: white;
  padding: 40px 32px 32px;
  border-bottom: 1px solid #e2e8f0;
  text-align: center;
}
.sub-logo {
    background: #000;
    border-radius: 3px;
    color: #fff;
    display: inline-block;
    width: 42px;
    height: 42px;
    line-height: 37px;
    vertical-align: initial;
    padding: 1px;
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
  transition: all 0.3s ease;
  border-radius: 12px;
  padding: 20px;
  margin: 0 -20px 48px -20px;
}

.category-section.highlighted {
  position: relative;
  overflow: hidden;
}

.category-section.highlighted::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%);
  animation: fadeBlink 1.5s ease-in-out;
  z-index: 0;
  pointer-events: none;
  border-radius: 12px;
}

@keyframes fadeBlink {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
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
  background: linear-gradient(90deg, #05093b, #8b5cf6);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.tool-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-color: #05093b;
}

.tool-card:hover::before {
  transform: scaleX(1);
}

.tool-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #05093b, #8b5cf6);
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
  color: #05093b;
  transform: translateX(4px);
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
  .sub-logo {
    background: #000;
    border-radius: 3px;
    color: #fff;
    display: inline-block;
    width: 33px;
    height: 33px;
    line-height: 32px;
    vertical-align: top;
    padding: 1px;
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

  .sub-logo {
    background: #000;
    border-radius: 3px;
    color: #fff;
    display: inline-block;
    width: 33px;
    height: 33px;
    line-height: 32px;
    vertical-align: middle;
    padding: 1px;
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
