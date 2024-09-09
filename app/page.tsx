import { getNetworks, getFilterTokens } from "./api/lib";


export default async function Home() {
  const networks = await getNetworks();
  console.log("🚀 ~ Home ~ networks:", networks)
  const coins = await getFilterTokens(1);

  return (
    <div className="">
      <main className="">
      </main>
    </div>
  );
}
