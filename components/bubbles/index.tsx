import Bubbles from "./bubbles";
import { getTokens } from "@/app/api/lib";
import { Typography } from "@/ui-components/typography";

export default async function BubblesPage() {
  const topTokensList = await getTokens();

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
