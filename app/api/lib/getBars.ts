'use server';

import { getChartArgs } from "@/lib/get-chart-args";
import { Bar } from "@/types/bar.type";
import { Resolution } from "@/types/bubbles.type";
import axios from "axios";
import { unstable_cache } from "next/cache";

async function fetchBars(
  id: string,
  resolution: Resolution,
) {
  const { from, to } = getChartArgs(resolution);

  try {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart/range` +
      `?from=${from}&to=${to}&vs_currency=usd` +
      `&x_cg_demo_api_key=${process.env.COINGECKO_API_SECRET_KEY}`
    )

    const result: Bar[] = data.prices.map((bar: [number, number]) => ({
      time: Math.round(bar[0] / 1000),
      value: bar[1]
    }))

    return result;
  } catch (e) {
    console.log(e)
    return null;
  }
}

export const getBars = unstable_cache(fetchBars, ['fetchBars'], { revalidate: 60 });