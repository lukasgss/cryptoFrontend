<template>
  <div class="p-8 min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
    <router-link to="/" class="inline-flex items-center mb-6 text-blue-500 hover:text-blue-700">
      <span class="mr-2">←</span> Back to List
    </router-link>

    <div v-if="loading" class="text-center py-8">Loading coin details...</div>

    <div v-else-if="error" class="text-center py-8 text-red-500">
      {{ error }}
    </div>

    <div v-else-if="coin" class="bg-white rounded-lg shadow-lg p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 class="text-3xl font-bold mb-4">{{ coin.symbol }}</h1>
          <div class="space-y-4">
            <div>
              <h2 class="text-lg font-semibold text-gray-600">Rank</h2>
              <p class="text-2xl">#{{ coin.rankByMarketCap }}</p>
            </div>

            <div>
              <h2 class="text-lg font-semibold text-gray-600">Price</h2>
              <p class="text-2xl">
                {{ formatCurrency(coin.price.amount, coin.price.code) }}
              </p>
            </div>

            <div>
              <h2 class="text-lg font-semibold text-gray-600">1h Change</h2>
              <p
                class="text-2xl"
                :class="coin.percentageChangeInOneHour >= 0 ? 'text-green-600' : 'text-red-600'"
              >
                {{ coin.percentageChangeInOneHour }}%
              </p>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <h2 class="text-lg font-semibold text-gray-600">Market Cap</h2>
            <p class="text-2xl">{{ formatCurrency(coin.marketCap.amount, coin.marketCap.code) }}</p>
          </div>

          <div>
            <h2 class="text-lg font-semibold text-gray-600">24h Trading Volume</h2>
            <p class="text-2xl">
              {{ formatCurrency(coin.tradingVolume.amount, coin.tradingVolume.code) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-8">Coin not found</div>
  </div>
</template>

<script setup lang="ts">
import { getCoinById } from '@/services/CoinService'
import { formatCurrency } from '@/utils/currency'
import { onMounted, ref } from 'vue'
import type { Coin } from '../components/CryptoCard.vue'

const { id } = defineProps<{
  id: string
}>()

const coin = ref<Coin | null>(null)
const loading = ref<boolean>(true)
const error = ref<string | null>(null)

const fetchCoinDetails = async () => {
  try {
    loading.value = true
    const response = await getCoinById(id)
    coin.value = response
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString()
}

onMounted(() => {
  fetchCoinDetails()
})
</script>
