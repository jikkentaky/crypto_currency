import { Sprite, Text } from 'pixi.js'

export enum SORTING_BY {
  HOUR = 'change1',
  FOUR_HOURS = 'change4',
  TWELVE_HOURS = 'change12',
  DAY = 'change24',
  MCAP = 'marketCap',
  LIQUIDITY = 'liquidity',
  VOLUME_24 = 'volume24',
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
  [SORTING_BY.MCAP]: number
  [SORTING_BY.LIQUIDITY]: number
  [SORTING_BY.VOLUME_24]: number
  [SORTING_BY.HOUR]: number
  [SORTING_BY.FOUR_HOURS]: number
  [SORTING_BY.TWELVE_HOURS]: number
  [SORTING_BY.DAY]: number
  image: string | null | undefined
  text2: Text | null
  previousText2: string | null
}
