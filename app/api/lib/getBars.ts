'use server';

import { getChartArgs } from "@/lib/get-chart-args";
import { Bar } from "@/types/bar.type";
import { Resolution } from "@/types/bubbles.type";
import axios from "axios";
import { unstable_cache } from "next/cache";

async function fetchBars(
  symbol: string,
  resolution: Resolution,
  quoteToken: string,
) {
  const bars: Bar[] = [];

  const { from, to, countBack, currentResolution } = getChartArgs(resolution);

  try {
    const { data } = await axios.post(
      "https://graph.defined.fi/graphql",
      {
        query: `{
          getBars(
            symbol: "${symbol}"
            from: ${from}
            to: ${to}
            resolution: "${currentResolution}"
            quoteToken: ${quoteToken}
            countback: ${countBack}
            removeLeadingNullValues: true
          ) {
            t
            o
            h
            l
            c
            v
            volume
          }
        }`
      }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${process.env.DEFINED_API_KEY}`
      }
    }
    );
    const currentData = data.data.getBars

    for (let j = 0; j < currentData.o.length; j++) {
      bars.push({
        time: currentData.t[j],
        value: currentData.c[j],
      });
    }

    return bars;
  } catch (e) {
    console.log(e)
    return null;
  }
}

export const getBars = unstable_cache(fetchBars, ['fetchBars'], { revalidate: 60 });