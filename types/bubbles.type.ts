import { Sprite, Text } from 'pixi.js'

export enum PriceChange {
  HOUR = "price_change_percentage_1h_in_currency",
  DAY = "price_change_percentage_24h_in_currency",
  WEEK = "price_change_percentage_7d_in_currency",
  MONTH = "price_change_percentage_30d_in_currency",
  YEAR = "price_change_percentage_1y_in_currency",
}

export enum Resolution {
  HOUR = '60',
  DAY = '1D',
  WEEK = '7D',
  MONTH = '1M',
  YEAR = '1Y',
}

export type Circle = {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  color: string
  dragging?: boolean
  targetRadius: number
  symbol: string
  coinName: string
  radius: number
  previousColor: string | null
  previousHovered: boolean
  isHovered: boolean
  isSearched: boolean
  isPreviousSearched: boolean
  graphicSprite: Sprite | null
  [PriceChange.HOUR]: number
  [PriceChange.DAY]: number
  [PriceChange.WEEK]: number
  [PriceChange.MONTH]: number
  [PriceChange.YEAR]: number
  image: string | null | undefined
  text2: Text | null
  previousText2: string | null
}