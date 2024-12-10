<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import ExchangeCard from '../components/ExchangeCard.vue'
import type { Exchange } from '../types/Exchange'

type SortOptions = 'volume.value' | 'activePairs' | 'name' | 'country'
type SortOrder = 'asc' | 'desc'

const exchanges = ref<Exchange[]>([])
const loading = ref<boolean>(true)
const error = ref<string | null>(null)
const searchQuery = ref<string>('')
const sortBy = ref<SortOptions>('volume.value')
const sortOrder = ref<SortOrder>('desc')

const fetchExchanges = async (): Promise<void> => {
  try {
    loading.value = true
    const response: Exchange[] = [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Binance',
        volume: {
          value: 12840000000,
          currency: 'USD',
          lastUpdated: '2024-12-10T14:30:00Z',
        },
        country: 'Global',
        url: 'https://binance.com',
        activePairs: 2854,
      },
      {
        id: '223e4567-e89b-12d3-a456-426614174001',
        name: 'Coinbase',
        volume: {
          value: 4160000000,
          currency: 'USD',
          lastUpdated: '2024-12-10T14:30:00Z',
        },
        country: 'USA',
        url: 'https://coinbase.com',
        activePairs: 560,
      },
      {
        id: '323e4567-e89b-12d3-a456-426614174002',
        name: 'Kraken',
        volume: {
          value: 2840000000,
          currency: 'USD',
          lastUpdated: '2024-12-10T14:30:00Z',
        },
        country: 'USA',
        url: 'https://kraken.com',
        activePairs: 650,
      },
    ]
    exchanges.value = response
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
    loading.value = false
  }
}

const sortedAndFilteredExchanges = computed<Exchange[]>(() => {
  let filtered = exchanges.value

  if (searchQuery.value) {
    filtered = filtered.filter(
      (exchange) =>
        exchange.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        exchange.country.toLowerCase().includes(searchQuery.value.toLowerCase()),
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

onMounted(() => {
  fetchExchanges()
})
</script>

<template>
  <div class="min-h-[calc(100vh-72px)] bg-gradient-to-br from-indigo-50 to-blue-100">
    <div class="container mx-auto p-4">
      <h1 class="text-4xl font-bold text-indigo-800 mb-8 text-center">Cryptocurrency Exchanges</h1>

      <div
        class="mb-6 flex flex-col sm:flex-row gap-5 items-center justify-between bg-white rounded-xl shadow-md px-12 py-5"
      >
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search exchanges..."
          class="px-4 py-2 border border-indigo-200 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div class="flex items-center gap-4">
          <select
            v-model="sortBy"
            class="px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="volume.value">Volume</option>
            <option value="activePairs">Active Pairs</option>
            <option value="name">Name</option>
            <option value="country">Country</option>
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

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="exchange in sortedAndFilteredExchanges"
          :key="exchange.id"
          class="transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          <ExchangeCard :exchange="exchange" />
        </div>
      </div>
    </div>
  </div>
</template>
