import { calculateMinCircleSize } from "./calc-min-size-circle";

const aside = 310;
const scrollWidth = 10;

export const appConfig = {
  aside,
  width: typeof window !== "undefined"
    ? Math.min(window.innerWidth - aside - scrollWidth, 1920 - aside)
    : 375,
  height: 720,
  speed: 0.005,
  elasticity: 0.005,
  wallDamping: 0.5,
  maxCircleSize: 160,
  minCircleSize: calculateMinCircleSize(),
};