import axios from 'axios'

export type PaginatedResponse<T> = {
  pageNumber: number
  pageSize: number
  items: T[]
  totalCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})
