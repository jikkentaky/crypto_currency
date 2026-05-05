import Bubbles from "./bubbles";
import { getTokens } from "@/app/api/lib";
import { Typography } from "@/ui-components/typography";
import { CoingeckoCoinData } from "@/types/coingecko.type";

export default async function BubblesPage() {
  let topTokensList: CoingeckoCoinData[] = [];

  try {
    topTokensList = await getTokens();
  } catch (e) {
    console.error('[BubblesPage] failed to load tokens:', e);
  }

  return (
    <>
      {topTokensList.length ? (
        <Bubbles coins={topTokensList} />
      ) : (
        <Typography>No data</Typography>
      )}
    </>
  );
}
