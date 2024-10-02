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
            network: [${networkId}]
            trendingIgnored: false
            liquidity: { gt: 1000 }
            volume24: { lte: 100000000000 }
            marketCap: {lte: 1000000000000}
            potentialScam: false
          }
            rankings: {
              attribute: trendingScore
              direction: DESC
            }
            limit: 70
            ) {
              results {
                fdv
                change1
                change4
                change12
                change24
                priceUSD
                marketCap
                volume24
                liquidity
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

    const result = data.data.filterTokens.results.map((token, index) => ({
      ...token,
      rank: index + 1,
      change1: Number(token.change1),
      change4: Number(token.change4),
      change12: Number(token.change12),
      change24: Number(token.change24),
      marketCap: Number(token.marketCap),
      priceUSD: Number(token.priceUSD),
      volume24: Number(token.volume24),
      image: token.token.info.imageThumbUrl
    }))

    return result;
  } catch (err) {
    console.error(err);
  }
}

export const getFilterTokens = unstable_cache(fetchFilterTokens, ['filterTokens'], { revalidate: 60 });