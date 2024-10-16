import { PriceChange } from "@/types/bubbles.type";

const appConfig = {
  aside: 310,
  speed: 0.005,
  elasticity: 0.005,
  wallDamping: 0.5,
};

const priceChangeButtons = [
  { value: PriceChange.HOUR, content: '1H' },
  { value: PriceChange.FOUR_HOURS, content: '4H' },
  { value: PriceChange.TWELVE_HOURS, content: '12H' },
  { value: PriceChange.DAY, content: '24H' },
]

const mobileResolution = {
  change1: "1H",
  change4: "4H",
  change12: "12H",
  change24: "24H",
}

const blazingPath = `/static/assets/images/blazing.png`;
const maestroPath = `/static/assets/images/maestro.png`;
const photonPath = `/static/assets/images/photon.png`;
const bonkPath = `/static/assets/images/bonk.png`;
const bulxPath = `/static/assets/images/bulx.png`;
const defaultPath = `/static/assets/images/default.jpg`;

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
  blazingPath,
  maestroPath,
  photonPath,
  bonkPath,
  bulxPath,
  defaultPath,
  SUBSCRIPT_NUMBER_MAP,
}