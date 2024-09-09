import { TokenWithMetaData } from "@/app/types/tokenWithMetaData.type";
import axios from "axios";
import { unstable_cache } from "next/cache";

async function fetchFilterTokens(
  networkId: number,
) {
  try {
    const { data }: {
      data: {
        data: {
          filterTokens: { results: TokenWithMetaData[] }
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

    const tokens = data.data.filterTokens.results.map(({
      priceChange1,
      priceChange4,
      priceChange12,
      priceChange24,
      address,
      name,
      symbol,
      imageThumbUrl
    }) => ({
      priceChange1,
      priceChange4,
      priceChange12,
      priceChange24,
      address,
      name,
      symbol,
      imageThumbUrl
    }))

    return tokens;
  } catch (err) {
    console.error(err);
  }
}

export const getFilterTokens = unstable_cache(fetchFilterTokens, ['filterTokens'], { revalidate: 60 });