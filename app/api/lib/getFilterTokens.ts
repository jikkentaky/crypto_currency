'use server';

import { TokenFilterResult } from "@/types/tokenFilterResultType.type";
import axios from "axios";
import { unstable_cache } from "next/cache";

async function fetchFilterTokens(
  networkId: number,
) {
  try {
    const { data }: {
      data: {
        data: {
          filterTokens: { results: TokenFilterResult[] }
        }
      }
    } = await axios.post(
      "https://graph.defined.fi/graphql",
      {
        query: `{
          filterTokens(
            filters: {
            trendingIgnored: false
            network: [${networkId}]
          }
            rankings: {
              attribute: trendingScore
              direction: DESC
            }
            limit: 70
          ) {
              results {
                change1
                change4
                change12
                change24
                priceUSD
                marketCap
                volume24
                quoteToken
                token {
                  address
                  name
                  symbol
                  totalSupply
                    info {
                      imageThumbUrl
                      imageSmallUrl
                    }
                }
              }
          }
        }`
      }, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${process.env.DEFINED_API_KEY}`
      }
    }
    );

    const result = data.data.filterTokens.results.map((token) => ({
      ...token,
      change1: Number(token.change1),
      change4: Number(token.change4),
      change12: Number(token.change12),
      change24: Number(token.change24),
      marketCap: Number(token.marketCap),
      priceUSD: Number(token.priceUSD),
      volume24: Number(token.volume24),
    }))

    return result;
  } catch (err) {
    console.error(err);
  }
}

export const getFilterTokens = unstable_cache(fetchFilterTokens, ['filterTokens'], { revalidate: 60 });