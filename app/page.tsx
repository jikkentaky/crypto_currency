import { getFilterTokens, getNetworks } from "./api/lib";
import { Aside } from "./components/aside";
import { Bubbles } from "./components/bubbles/bubbles";
import { Header } from "./components/header";
import styles from './styles.module.scss';

export default async function Home() {
  const coins = await getFilterTokens(1);
  // console.log("🚀 ~ Home ~ coins:", coins)
  const networks = await getNetworks();

  return (
    < main className={styles.main} >
      <div className={styles.container}>
        {networks && <Aside networks={networks} />}

        <div className={styles.content}>
          <Header />

          {coins && <Bubbles coins={coins} />}
        </div>
      </div>
    </main >
  );
}
