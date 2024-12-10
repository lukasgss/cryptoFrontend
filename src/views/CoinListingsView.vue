<script setup lang="ts">
import { getCoins } from '@/services/CoinService'
import { computed, onMounted, ref, watch } from 'vue'
import CryptoCard, { type Coin } from './../components/CryptoCard.vue'

type SortOptions =
  | 'rankByMarketCap'
  | 'percentageChangeInOneHour'
  | 'marketCap.value'
  | 'tradingVolume.value'
type SortOrder = 'asc' | 'desc'

const coins = ref<Coin[]>([])
const loading = ref<boolean>(true)
const error = ref<string | null>(null)
const searchQuery = ref<string>('')
const sortBy = ref<SortOptions>('rankByMarketCap')
const sortOrder = ref<SortOrder>('asc')

const currentPage = ref<number>(1)
const itemsPerPage = 12
const totalItems = ref<number>(0)

const fetchCoins = async (page: number) => {
  try {
    loading.value = true
    error.value = null

    const response = await getCoins(page, itemsPerPage)
    coins.value = response.items
    totalItems.value = response.totalCount
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
    coins.value = []
  } finally {
    loading.value = false
  }
}

const sortedAndFilteredCoins = computed<Coin[]>(() => {
  let filtered = coins.value

  if (searchQuery.value) {
    filtered = filtered.filter((coin) =>
      coin.symbol.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  }

  return filtered.sort((a, b) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const aValue = sortBy.value.split('.').reduce((obj, key) => (obj as any)[key], a)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bValue = sortBy.value.split('.').reduce((obj, key) => (obj as any)[key], b)

    if (sortOrder.value === 'asc') {
      return aValue > bValue ? 1 : -1
    }
    return aValue < bValue ? 1 : -1
  })
})

const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))

const pageNumbers = computed(() => {
  const pages = []
  const maxVisiblePages = 5
  let startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2))
  const endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1)

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  return pages
})

const changePage = (page: number) => {
  currentPage.value = Math.max(1, Math.min(page, totalPages.value))
  fetchCoins(currentPage.value)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch([searchQuery, sortBy, sortOrder], () => {
  currentPage.value = 1
  fetchCoins(1)
})

onMounted(() => {
  fetchCoins(1)
})
</script>

<template>
  <div class="min-h-[calc(100vh-72px)] w-full bg-gradient-to-br from-indigo-50 to-blue-100">
    <div class="p-8">
      <h1 class="text-4xl font-bold text-indigo-800 mb-8 text-center">Crypto Dashboard</h1>

      <div
        class="mb-6 flex flex-col sm:flex-row gap-5 items-center justify-between bg-white rounded-xl shadow-md px-12 py-5"
      >
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by symbol..."
          class="px-4 py-2 border border-indigo-200 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div class="flex items-center gap-4">
          <select
            v-model="sortBy"
            class="px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="rankByMarketCap">Rank</option>
            <option value="percentageChangeInOneHour">1h Change</option>
            <option value="marketCap.value">Market Cap</option>
            <option value="tradingVolume.value">Volume</option>
          </select>

          <button
            @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
          >
            {{ sortOrder === 'asc' ? 'Ascending' : 'Descending' }}
          </button>
        </div>
      </div>

      <div v-if="loading" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
      </div>

      <div
        v-else-if="error"
        class="text-center py-8 text-red-500 bg-red-50 rounded-lg border border-red-200"
      >
        {{ error }}
      </div>

      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-if="sortedAndFilteredCoins.length === 0"
            class="w-full col-span-full text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-gray-200"
          >
            There are no coins or none of them match your search criteria
          </div>
          <router-link
            v-else
            v-for="coin in sortedAndFilteredCoins"
            :key="coin.id"
            :to="{ name: 'coinDetails', params: { id: coin.id } }"
            class="transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <CryptoCard :coin="coin" />
          </router-link>
        </div>

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
      </div>
    </div>
  </div>
</template>
