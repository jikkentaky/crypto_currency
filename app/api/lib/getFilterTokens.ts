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
                  token {
                address
                name
                symbol
                    info {
                  imageThumbUrl
                }
              }
            }
          }
        }`
      }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${process.env.DEFINED_API_KEY}`
      }
    }
    );

    return data.data.filterTokens.results;
  } catch (err) {
    console.error(err);
  }
}

export const getFilterTokens = unstable_cache(fetchFilterTokens, ['filterTokens'], { revalidate: 60 });