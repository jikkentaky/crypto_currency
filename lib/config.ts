import { calculateMinCircleSize } from "./calc-min-size-circle";

export const asideWidth = 310;

export const appConfig = {
  aside: 300,
  width: typeof window !== "undefined" ? window.innerWidth - asideWidth : 100,
  height: 720,
  speed: 0.005,
  elasticity: 0.005,
  wallDamping: 0.5,
  maxCircleSize: 160,
  minCircleSize: calculateMinCircleSize(),
};