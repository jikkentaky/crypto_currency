import { Aside } from "./components/aside";
import BubblesPage from "./components/bubbles";
import { Chart } from "./components/chart";
import { CoinsTable } from "./components/coins-table";
import { Header } from "./components/header";
import { TokenInfo } from "./components/token-info";
import { TradeBlock } from "./components/trade-block";
import styles from './styles.module.scss';
import { ModalComponent } from "@/app/ui-components/modal";

export default function Home() {
  return (
    < main className={styles.main} >
      <div className={styles.container}>
        <Aside />

        <div className={styles.content}>
          <Header />

          <BubblesPage />

          <CoinsTable />
        </div>

        <ModalComponent>
          <TokenInfo />

          <Chart />

          <TradeBlock />
        </ModalComponent>
      </div>
    </main >
  );
}
