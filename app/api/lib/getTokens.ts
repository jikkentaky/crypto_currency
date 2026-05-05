"use server";

import { CoingeckoCoinData } from "@/types/coingecko.type";

export async function getTokens(): Promise<CoingeckoCoinData[]> {
  if (!process.env.COINGECKO_API_SECRET_KEY) {
    throw new Error("COINGECKO_API_SECRET_KEY is not defined");
  }

  const params = new URLSearchParams({
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: "100",
    page: "1",
    sparkline: "true",
    price_change_percentage: "1h,24h,7d,30d,1y",
    locale: "en",
    x_cg_demo_api_key: process.env.COINGECKO_API_SECRET_KEY,
  });

  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?${params}`,
    { next: { revalidate: 90 } }
  );

  if (!res.ok) {
    throw new Error(`CoinGecko getTokens failed: ${res.status}`);
  }

  return res.json();
}
