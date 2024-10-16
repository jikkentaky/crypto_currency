import { Sprite, Text } from 'pixi.js'

export enum PriceChange {
  HOUR = 'change1',
  FOUR_HOURS = 'change4',
  TWELVE_HOURS = 'change12',
  DAY = 'change24',
}

export enum Resolution {
  MINUTE = '1',
  FIVE_MINUTES = '5',
  FIFTEEN_MINUTES = '15',
  THIRTY_MINUTES = '30',
  HOUR = '60',
  FOUR_HOURS = '240',
  TWELVE_HOURS = '720',
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
  [PriceChange.FOUR_HOURS]: number
  [PriceChange.TWELVE_HOURS]: number
  [PriceChange.DAY]: number
  image: string | null | undefined
  text2: Text | null
  previousText2: string | null
}
