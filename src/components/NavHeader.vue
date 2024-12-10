<script setup lang="ts">
const navigationLinks = [
  {
    path: '/',
    label: 'Cryptocurrencies',
  },
  {
    path: '/exchanges',
    label: 'Exchanges',
  },
]
</script>

<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-4">
      <div class="flex flex-col sm:flex-row items-center justify-between py-4">
        <div class="mb-4 sm:mb-0">
          <router-link to="/" class="text-2xl font-bold text-indigo-800 hover:text-indigo-600">
            Crypto Tracker
          </router-link>
        </div>

        <nav class="flex items-center space-x-2">
          <router-link
            v-for="link in navigationLinks"
            :key="link.path"
            :to="link.path"
            class="px-4 py-2 rounded-lg transition-colors duration-200"
            :class="[
              $route.path === link.path
                ? 'bg-indigo-600 text-white'
                : 'text-indigo-600 hover:bg-indigo-50',
            ]"
          >
            <div class="flex items-center gap-2">
              {{ link.label }}
            </div>
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>
