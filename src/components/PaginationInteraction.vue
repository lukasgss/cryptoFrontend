<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'page-change', page: number): void
}>()

const isMobile = ref(false)

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 640
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})

const pageNumbers = computed(() => {
  const pages: number[] = []
  const maxVisiblePages = isMobile.value ? 3 : 5
  let startPage = Math.max(1, props.currentPage - Math.floor(maxVisiblePages / 2))
  const endPage = Math.min(props.totalPages, startPage + maxVisiblePages - 1)

  // Adjust start page if we're near the end
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  return pages
})

const changePage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && !props.loading) {
    emit('page-change', page)
  }
}

const buttonClasses = computed(() => ({
  base: `px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded-lg border
         border-indigo-200 hover:bg-indigo-50 disabled:opacity-50
         disabled:hover:bg-transparent disabled:cursor-not-allowed`,
  active: 'bg-indigo-600 text-white border-indigo-600',
}))
</script>

<template>
  <div v-if="totalPages > 1" class="mt-4 sm:mt-8 flex justify-center items-center gap-1 sm:gap-2">
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1 || loading"
      :class="buttonClasses.base"
    >
      <span v-if="isMobile">←</span>
      <span v-else>Previous</span>
    </button>

    <template v-if="!isMobile && pageNumbers[0] > 1">
      <button @click="changePage(1)" :disabled="loading" :class="buttonClasses.base">1</button>
      <span v-if="pageNumbers[0] > 2" class="px-2">...</span>
    </template>

    <button
      v-for="page in pageNumbers"
      :key="page"
      @click="changePage(page)"
      :disabled="loading"
      :class="[buttonClasses.base, currentPage === page ? buttonClasses.active : '']"
    >
      {{ page }}
    </button>

    <template v-if="!isMobile && pageNumbers[pageNumbers.length - 1] < totalPages - 1">
      <span class="px-2">...</span>
      <button @click="changePage(totalPages)" :disabled="loading" :class="buttonClasses.base">
        {{ totalPages }}
      </button>
    </template>

    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages || loading"
      :class="buttonClasses.base"
    >
      <span v-if="isMobile">→</span>
      <span v-else>Next</span>
    </button>
  </div>
</template>
