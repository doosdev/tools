<template>
  <div class="layout-container" :class="{ 'mobile': isMobile }">
    <!-- 모바일 메뉴 토글 버튼 -->
    <div v-if="isMobile" class="mobile-menu-toggle">
      <el-button @click="toggleSidebar" type="primary" size="large">
        <i class="bx bx-menu"></i>
      </el-button>
    </div>

    <!-- 사이드바 -->
    <Sidebar ref="sidebarRef" :home-view-ref="homeViewRef" />

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
import { ref, onMounted, onUnmounted, provide } from 'vue'
import Sidebar from './Sidebar.vue'

const sidebarRef = ref(null)
const homeViewRef = ref(null)
const isMobile = ref(false)
const isMobileMenuOpen = ref(false)

// HomeView 참조를 전역으로 제공
provide('homeViewRef', homeViewRef)

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

/* 모바일 메뉴 토글 */
.mobile-menu-toggle {
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 1001;
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
    padding-top: 80px;
  }
}
</style>
