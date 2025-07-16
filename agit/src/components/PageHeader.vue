<template>
  <div class="page-header">
    <div class="page-header-left">
      <el-button @click="goBack" link class="back-btn">
        <i class="bx bx-arrow-back"></i>
        <span v-if="showBackText">{{ backText }}</span>
      </el-button>
      <h1>{{ title }}</h1>
    </div>
    <div class="page-header-right">
      <slot name="right">
        <div v-if="showPlaceholder">&nbsp;</div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// Props 정의
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  backText: {
    type: String,
    default: ''
  },
  showBackText: {
    type: Boolean,
    default: false
  },
  showPlaceholder: {
    type: Boolean,
    default: true
  },
  backRoute: {
    type: String,
    default: '/'
  }
})

// 뒤로가기 함수
const goBack = () => {
  if (props.backRoute) {
    router.push(props.backRoute)
  } else {
    router.back()
  }
}
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  gap: 20px;
}

.page-header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.back-btn {
  font-size: 22px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.back-btn i {
  margin-top: -1px;
}
.back-btn:after {
    content: '';
    border-right: 1px solid #d1d1d1;
    height: 21px;
    margin-left: 10px;
}

.page-header h1 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e293b;
}

.page-header-right {
  display: flex;
  align-items: center;
}

/* 모바일 반응형 */
@media (max-width: 768px) {
  .page-header {
    margin-bottom: 20px;
    gap: 12px;
  }
  
  .page-header-left {
    gap: 12px;
  }
  
  .page-header h1 {
    font-size: 1.5rem;
  }
  
  .back-btn {
    font-size: 14px;
  }
}
</style> 