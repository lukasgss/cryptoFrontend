import type { Money } from './money'

export type Exchange = {
  id: string
  name: string
  volume: Money
  country?: string
  url?: string
  activePairs: number
}
