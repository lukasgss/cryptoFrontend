<script setup lang="ts">
import { computed } from 'vue'

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

const emit = defineEmits(['page-change'])

const pageNumbers = computed(() => {
  const pages = []
  const maxVisiblePages = 5
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
</script>

<template>
  <div v-if="totalPages > 1" class="mt-8 flex justify-center items-center gap-2">
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1 || loading"
      class="px-4 py-2 rounded-lg border border-indigo-200 hover:bg-indigo-50 disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed"
    >
      Previous
    </button>
    <button
      v-if="pageNumbers[0] > 1"
      @click="changePage(1)"
      :disabled="loading"
      class="px-4 py-2 rounded-lg border border-indigo-200 hover:bg-indigo-50"
    >
      1
    </button>
    <span v-if="pageNumbers[0] > 2" class="px-2">...</span>
    <button
      v-for="page in pageNumbers"
      :key="page"
      @click="changePage(page)"
      :disabled="loading"
      class="px-4 py-2 rounded-lg border"
      :class="[
        currentPage === page
          ? 'bg-indigo-600 text-white border-indigo-600'
          : 'border-indigo-200 hover:bg-indigo-50',
      ]"
    >
      {{ page }}
    </button>
    <span v-if="pageNumbers[pageNumbers.length - 1] < totalPages - 1" class="px-2">...</span>
    <button
      v-if="pageNumbers[pageNumbers.length - 1] < totalPages"
      @click="changePage(totalPages)"
      :disabled="loading"
      class="px-4 py-2 rounded-lg border border-indigo-200 hover:bg-indigo-50"
    >
      {{ totalPages }}
    </button>
    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages || loading"
      class="px-4 py-2 rounded-lg border border-indigo-200 hover:bg-indigo-50 disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed"
    >
      Next
    </button>
  </div>
</template>
