import { SORTING_BY } from "@/types/bubbles.type";
import { calculateMinCircleSize } from "./calc-min-circle-size";
import { calculateMaxCircleSize } from "./calc-max-circle-size";

const aside = 310;
const scrollWidth = 9;
const mobileHeaderHeight = 60;
const mobileFooterHeight = 78;

const width = typeof window !== "undefined"
  ? window.innerWidth < 1100
    ? window.innerWidth
    : Math.min(window.innerWidth - aside - scrollWidth, 1920 - aside)
  : 375;

const height = typeof window !== "undefined"
  ? window.innerWidth < 1100
    ? window.innerHeight - mobileHeaderHeight - mobileFooterHeight
    : 720
  : 100

const appConfig = {
  aside,
  width,
  height,
  speed: 0.005,
  elasticity: 0.005,
  wallDamping: 0.5,
  maxCircleSize: calculateMaxCircleSize(),
  minCircleSize: calculateMinCircleSize(),
};

const priceChangeButtons = [
  { value: SORTING_BY.HOUR, content: '1H' },
  { value: SORTING_BY.FOUR_HOURS, content: '4H' },
  { value: SORTING_BY.TWELVE_HOURS, content: '12H' },
  { value: SORTING_BY.DAY, content: '24H' },
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
}