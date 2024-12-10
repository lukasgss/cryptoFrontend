import type { Coin } from '@/components/CryptoCard.vue'
import { API, type PaginatedResponse } from './API'

export const getCoins = async (
  pageNumber: number,
  pageSize: number,
): Promise<PaginatedResponse<Coin>> => {
  const response = await API.get(`/coins?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  return response.data
}

export const getCoinById = async (id: string): Promise<Coin> => {
  const response = await API.get(`/coins/${id}`)
  return response.data
}
