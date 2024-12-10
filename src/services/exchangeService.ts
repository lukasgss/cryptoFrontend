import type { Coin } from '@/components/CryptoCard.vue'
import type { Exchange } from '@/types/exchange'
import { type PaginatedResponse, API } from './API'

export const getExchanges = async (
  pageNumber: number,
  pageSize: number,
): Promise<PaginatedResponse<Exchange>> => {
  const response = await API.get(`/exchanges?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  return response.data
}

export const getExchangeByid = async (id: string): Promise<Coin> => {
  const response = await API.get(`/exchanges/${id}`)
  return response.data
}
