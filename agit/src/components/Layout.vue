<template>
  <div class="layout-container" :class="{ 'mobile': isMobile }">
    <!-- 모바일 헤더 툴바 -->
    <div v-if="isMobile" class="mobile-header">
      <div class="mobile-header-content">
        <div class="mobile-header-left">
          <el-button
            v-if="!isMobileMenuOpen"
            @click="toggleSidebar"
            class="mobile-menu-btn"
          >
            <i class="bx bx-menu"></i>
          </el-button>
          <!-- 모바일 닫기 버튼 -->
          <el-button
            v-if="isMobileMenuOpen"
            @click="closeSidebar"
            class="mobile-menu-btn"
          >
            <i class="bx bx-x"></i>
          </el-button>
        </div>
        <div class="mobile-header-center">
          <h1 class="mobile-header-title">
            <i class="bx bx-toolbox"></i>
            VMV.KR
          </h1>
        </div>
        <div class="mobile-header-right">
          <div class="mobile-header-right-item">
            <el-button
              class="mobile-menu-btn"
            >
              <i class="bx bx-search" :style="{ opacity: 0 }"></i>
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 사이드바 -->
    <Sidebar ref="sidebarRef" :home-view-ref="props.homeViewRef" @close-mobile-menu="closeSidebar" />

    <!-- 메인 컨텐츠 영역 -->
    <div class="main-content" :class="{ 'with-sidebar': !isMobile }">
      <slot />
    </div>

    <!-- 모바일 오버레이 -->
    <div
      v-if="isMobile && isMobileMenuOpen"
      class="mobile-overlay"
      @click="closeSidebar"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Sidebar from './Sidebar.vue'

// props 정의
const props = defineProps({
  homeViewRef: {
    type: Object,
    default: null
  }
})

const sidebarRef = ref(null)
const isMobile = ref(false)
const isMobileMenuOpen = ref(false)

// 반응형 체크
const checkResponsive = () => {
  isMobile.value = window.innerWidth < 768
}

// 사이드바 토글
const toggleSidebar = () => {
  if (sidebarRef.value) {
    sidebarRef.value.toggleMobileMenu()
    isMobileMenuOpen.value = sidebarRef.value.isMobileMenuOpen
  }
}

// 사이드바 닫기
const closeSidebar = () => {
  if (sidebarRef.value) {
    sidebarRef.value.isMobileMenuOpen = false
    isMobileMenuOpen.value = false
  }
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

<style scoped>
.layout-container {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.layout-container.mobile {
  flex-direction: column;
}

/* 모바일 헤더 툴바 */
.mobile-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1001;
}

.mobile-header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 16px;
}

.mobile-header-left {
  display: flex;
  align-items: center;
}

.mobile-header-center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.mobile-header-right {
  display: flex;
  align-items: center;
}

.mobile-menu-btn {
  font-size: 1.5rem;
  padding: 6px;
  border: none;
  background: transparent;
  color: #1e293b;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.mobile-menu-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #05093b;
}

.mobile-menu-btn i {
  margin-right: 0px;
}


.mobile-header-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 메인 컨텐츠 영역 */
.main-content {
  flex: 1;
  padding: 0;
  overflow-y: auto;
}

.main-content.with-sidebar {
  margin-left: 260px;
}

/* 모바일 오버레이 */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

/* 모바일 스타일 */
@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding-top: 45px;
  }
}
</style>
