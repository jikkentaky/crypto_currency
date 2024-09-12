'use server';

import { Network } from "@/types/network.type";
import axios from "axios";
import { unstable_cache } from "next/cache";

async function fetchNetworks() {
  try {
    const { data }: {
      data: {
        data: { getNetworks: Network[] }
      }
    } = await axios
      .post(
        "https://graph.defined.fi/graphql",
        {
          query: `{
            getNetworks{
              id
              name
            }
           }`
        }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${process.env.DEFINED_API_KEY}`
        }
      }
      )

    const topNetworks = [1, 1399811149, 8453, 728126428, 56, 10, 81457, 43114, 250, 137, 531,]

    const filteredNetworks = data.data.getNetworks.sort((a, b) => {
      const indexA = topNetworks.indexOf(a.id);
      const indexB = topNetworks.indexOf(b.id);

      if (indexA === -1 && indexB === -1) {
        return 0;
      }
      if (indexA === -1) {
        return 1;
      }
      if (indexB === -1) {
        return -1;
      }

      return indexA - indexB;
    });

    return filteredNetworks
  } catch (error) {
    console.log(error);
  }
}

export const getNetworks = unstable_cache(
  fetchNetworks,
  ['networks'],
  { revalidate: 60, tags: ['networks'] }
)