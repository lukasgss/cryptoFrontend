import ExchangeListView from '@/views/ExchangeListView.vue'
import IndividualCoinView from '@/views/IndividualCoinView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/CoinListingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/coin/:id',
      name: 'coinDetails',
      component: IndividualCoinView,
      props: true,
    },
    {
      path: '/exchanges',
      name: 'exchanges',
      component: ExchangeListView,
    },
  ],
})

export default router
