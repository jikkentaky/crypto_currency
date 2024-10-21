'use server';

import { CoingeckoCoinData } from "@/types/coingecko.type";
import axios from "axios";
import { unstable_cache } from "next/cache";

async function fetchTokens(): Promise<CoingeckoCoinData[] | null> {

  try {
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/" +
      "coins/markets?" +
      "vs_currency=usd" +
      "&order=market_cap_desc" +
      "&per_page=150" +
      `&page=${1}` +
      "&sparkline=true" +
      "&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y" +
      "&locale=en" +
      `&x_cg_demo_api_key=${process.env.COINGECKO_API_SECRET_KEY}`
    );

    return data;
  } catch (error) {
    return null;
  }
}

export const getTokens = unstable_cache(fetchTokens, ['getTokens'], { revalidate: 90 });