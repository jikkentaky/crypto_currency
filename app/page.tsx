import { Aside } from "./components/aside";
import BubblesPage from "./components/bubbles";
import { CoinsTable } from "./components/coins-table";
import { Header } from "./components/header";
import styles from './styles.module.scss';

export default function Home() {
  return (
    <main className={styles.main} >
      <div className={styles.container}>
        <div className={styles.header}>
          onchainbubbles.exe
        </div>

        <div className={styles['content-wrapper']}>
          <Aside />

          <div className={styles.content}>
            <Header />

            <BubblesPage />
            
            <CoinsTable />
          </div>
        </div>
      </div>
    </main>
  );
}
