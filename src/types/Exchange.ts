export type Price = {
  value: number
  currency: string
}

export type Exchange = {
  id: string
  name: string
  volume: Price
  country: string
  url: string
  activePairs: number
}
