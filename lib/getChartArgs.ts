import { Resolution } from "@/types/bubbles.type";

function getChartArgs(resolution: string) {
  const to = Math.floor(Date.now() / 1000);
  let from: number;
  let countBack: number
  let currentResolution: Resolution;

  switch (resolution) {
    case Resolution.HOUR:
      from = to - 60 * 60;
      countBack = 60
      currentResolution = Resolution.MINUTE;
      break;

    case Resolution.FOUR_HOURS:
      from = to - 4 * 60 * 60;
      countBack = 60 * 4
      currentResolution = Resolution.MINUTE;
      break;

    case Resolution.TWELVE_HOURS:
      from = to - 12 * 60 * 60;
      countBack = 4 * 12
      currentResolution = Resolution.FIFTEEN_MINUTES;
      break;

    case Resolution.DAY:
      from = to - 24 * 60 * 60;
      countBack = 24
      currentResolution = Resolution.HOUR;
      break;

    case Resolution.WEEK:
      from = to - 7 * 24 * 60 * 60;
      countBack = 7
      currentResolution = Resolution.DAY;
      break;

    case Resolution.MONTH:
      from = to - 30 * 24 * 60 * 60;
      countBack = 30
      currentResolution = Resolution.DAY;
      break;

    case Resolution.YEAR:
      from = to - 30 * 24 * 60 * 60;
      countBack = 365
      currentResolution = Resolution.DAY;
      break;

    default:
      throw new Error('Invalid resolution');
  }

  return { from, to, countBack, currentResolution };
}

export { getChartArgs }