<script setup lang="ts">
import type { Exchange } from '../types/exchange'

defineProps<{
  exchange: Exchange
}>()

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden">
    <div class="p-6 space-y-4">
      <div class="flex gap-5 justify-between items-center">
        <h2 class="text-2xl font-bold text-blue-800">{{ exchange.name }}</h2>
        <span class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
          {{ !!exchange.country ? exchange.country : 'N/A' }}
        </span>
      </div>

      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-gray-600">24h Volume:</span>
          <span class="font-semibold text-gray-800">
            {{ formatCurrency(exchange.volume.amount) }}
          </span>
        </div>

        <div class="flex justify-between items-center">
          <span class="text-gray-600">Active Pairs:</span>
          <span class="font-semibold text-gray-800">
            {{ exchange.activePairs }}
          </span>
        </div>

        <div v-if="!!exchange.url" class="pt-4 border-t border-gray-100">
          <a
            :href="exchange.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-indigo-600 hover:text-indigo-800 text-sm hover:underline"
          >
            Visit Exchange →
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
