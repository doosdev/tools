<template>
  <div class="sidebar" :class="{ 'mobile-open': isMobileMenuOpen }">
    <div class="sidebar-header">
      <h2 class="sidebar-title">
        Dev. Toolbox
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
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// props 정의
const props = defineProps({
  homeViewRef: {
    type: Object,
    default: null
  }
})

// emit 정의
const emit = defineEmits(['close-mobile-menu'])

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

// 현재 라우트에 따른 활성 카테고리 설정
const setActiveCategoryFromRoute = () => {
  const currentRoute = route.path
  for (const category of toolCategories) {
    if (category.tools.some(tool => tool.route === currentRoute)) {
      activeCategory.value = category.id
      break
    }
  }
}

// 반응형 체크
const checkResponsive = () => {
  isMobile.value = window.innerWidth < 768
}

// 카테고리 클릭 핸들러
const selectCategory = (categoryId) => {
  activeCategory.value = categoryId

  // 홈페이지가 아닌 경우 홈으로 이동 후 스크롤
  if (route.path !== '/') {
    router.push(`/?category=${categoryId}`).then(() => {
      // 라우터 이동 완료 후 스크롤
      setTimeout(() => {
        scrollToCategory(categoryId)
      }, 200)
    })
  } else {
    // 홈페이지에서는 바로 스크롤하고 하이라이트
    scrollToCategory(categoryId)
    // 하이라이트 함수 직접 호출
    highlightCategoryDirectly(categoryId)
  }

  // 모바일에서는 카테고리 클릭 시 메뉴 닫기
  if (isMobile.value) {
    isMobileMenuOpen.value = false
    // 부모 컴포넌트에 닫기 이벤트 전달
    emit('close-mobile-menu')
  }
}

// 직접 하이라이트 함수 (메인 페이지에서 사용)
const highlightCategoryDirectly = (categoryId) => {
  // HomeView의 하이라이트 함수 사용
  if (props.homeViewRef && props.homeViewRef.value) {
    props.homeViewRef.value.highlightCategory(categoryId)
  } else {
    // fallback: 직접 DOM 조작
    const element = document.getElementById(`category-${categoryId}`)
    if (element) {
      // 기존 하이라이트 제거
      const highlightedElements = document.querySelectorAll('.category-section.highlighted')
      highlightedElements.forEach(el => el.classList.remove('highlighted'))

      // 새로운 하이라이트 적용
      element.classList.add('highlighted')

      // 1.5초 후 하이라이트 제거
      setTimeout(() => {
        element.classList.remove('highlighted')
      }, 1500)
    }
  }
}

// 카테고리로 스크롤
const scrollToCategory = (categoryId) => {
  const element = document.getElementById(`category-${categoryId}`)
  if (element) {
    // 스크롤 위치 조정 (사이드바 높이만큼 위로)
    const sidebarHeight = 80 // 모바일 메뉴 버튼 높이
    const elementTop = element.offsetTop - sidebarHeight

    window.scrollTo({
      top: elementTop,
      behavior: 'smooth'
    })
  }
}

// 모바일 메뉴 토글
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// 모바일 메뉴 닫기
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  // 부모 컴포넌트에 닫기 이벤트 전달
  emit('close-mobile-menu')
}

// 컴포넌트 마운트 시 반응형 체크 및 활성 카테고리 설정
onMounted(() => {
  checkResponsive()
  setActiveCategoryFromRoute()
  window.addEventListener('resize', checkResponsive)
})

// 컴포넌트 언마운트 시 이벤트 리스너 제거
onUnmounted(() => {
  window.removeEventListener('resize', checkResponsive)
})

// 외부에서 사용할 수 있도록 메서드 노출
defineExpose({
  toggleMobileMenu,
  isMobile,
  isMobileMenuOpen
})
</script>

<style scoped>
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
  padding: 0.5rem;
}

.sidebar-header {
  padding: 24px 24px 16px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.mobile-close-btn {
  color: #64748b;
  font-size: 1.5rem;
  padding: 4px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.mobile-close-btn:hover {
  color: #1e293b;
  background: rgba(0, 0, 0, 0.05);
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
  border-radius: 5px;
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

.category-item span:not(.tool-count) {
  flex: 1;
  font-weight: 500;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tool-count {
  background: rgb(255 255 255 / 71%);
  color: #6f5c5c;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: bolder;
  width: 40px;
  text-align: center;
  flex-shrink: 0;
}

/* 모바일 스타일 */
.sidebar.mobile-open {
  transform: translateX(0);
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    top: 45px; /* 헤더 높이만큼 아래로 */
    height: calc(100vh - 45px); /* 헤더 높이만큼 높이 조정 */
  }
}
</style>
