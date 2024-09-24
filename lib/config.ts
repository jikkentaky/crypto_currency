import { calculateMinCircleSize } from "./calc-min-size-circle";

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

export const appConfig = {
  aside,
  width,
  height,
  speed: 0.005,
  elasticity: 0.005,
  wallDamping: 0.5,
  maxCircleSize: 160,
  minCircleSize: calculateMinCircleSize(),
};