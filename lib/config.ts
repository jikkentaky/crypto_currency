import { PriceChange } from "@/types/bubbles.type";

const appConfig = {
  aside: 310,
  speed: 0.005,
  elasticity: 0.005,
  wallDamping: 0.5,
};

const priceChangeButtons = [
  { value: PriceChange.HOUR, content: 'HOUR' },
  { value: PriceChange.DAY, content: 'DAY' },
  { value: PriceChange.WEEK, content: 'WEEK' },
  { value: PriceChange.MONTH, content: 'MONTH' },
  { value: PriceChange.YEAR, content: 'YEAR' },
]

const mobileResolution = {
  change1: "1H",
  change4: "4H",
  change12: "12H",
  change24: "24H",
}

const SUBSCRIPT_NUMBER_MAP: { [key: number]: string } = {
  4: '₄',
  5: '₅',
  6: '₆',
  7: '₇',
  8: '₈',
  9: '₉',
  10: '₁₀',
  11: '₁₁',
  12: '₁₂',
  13: '₁₃',
  14: '₁₄',
  15: '₁₅',
  16: '₁₆',
  17: '₁₇',
  18: '₁₈',
  19: '₁₉',
  20: '₂₀',
  21: '₂₁',
  22: '₂₂',
  23: '₂₃',
  24: '₂₄',
  25: '₂₅',
  26: '₂₆',
  27: '₂₇',
  28: '₂₈',
  29: '₂₉',
  30: '³₀',
  31: '³₁',
  32: '³₂',
  33: '³₃',
  34: '³₄',
  35: '³₅',
  36: '³₆',
  37: '³₇',
  38: '³₈',
  39: '³₉',
  40: '４₀',
  41: '４₁',
  42: '４₂',
}

export {
  appConfig,
  priceChangeButtons,
  mobileResolution,
  SUBSCRIPT_NUMBER_MAP,
}