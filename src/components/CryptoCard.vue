<script setup lang="ts">
import type { Money } from '@/types/money'
import { formatCurrency } from '@/utils/currency'

export type Coin = {
  id: string
  symbol: string
  rankByMarketCap: number
  percentageChangeInOneHour: number
  price: Money
  marketCap: Money
  tradingVolume: Money
}

defineProps<{
  coin: Coin
}>()

const formatPercentage = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-xl font-bold">{{ coin.symbol }}</h3>
        <p class="text-gray-600">Rank #{{ coin.rankByMarketCap }}</p>
      </div>
      <span
        :class="[
          'px-2 py-1 rounded text-sm',
          coin.percentageChangeInOneHour >= 0
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800',
        ]"
      >
        {{ formatPercentage(coin.percentageChangeInOneHour) }}
      </span>
    </div>

    <div class="space-y-2">
      <div class="flex justify-between">
        <span class="text-gray-600">Price:</span>
        <span class="font-medium">
          {{ formatCurrency(coin.price.amount, coin.price.currency) }}
        </span>
      </div>

      <div class="flex justify-between">
        <span class="text-gray-600">Market Cap:</span>
        <span class="font-medium">
          {{ formatCurrency(coin.marketCap.amount, coin.marketCap.currency) }}
        </span>
      </div>

      <div class="flex justify-between">
        <span class="text-gray-600">Volume:</span>
        <span class="font-medium">
          {{ formatCurrency(coin.tradingVolume.amount, coin.tradingVolume.currency) }}
        </span>
      </div>
    </div>
  </div>
</template>
