import BubblesPage from "./components/bubbles";
import { CoinsTable } from "./components/coins-table";
import { Header } from "./components/header";
import styles from './styles.module.scss';
import { Footer } from "./components/footer";
import { ModalComponent } from "./ui-components/modal";
import { ChartModalContent } from "./components/chart-modal-content";

export default function Home() {
  return (
    <main className={styles.main} >
      <div className={styles.container}>
        <div className={styles['content-wrapper']}>

          <div className={styles.content}>
            <Header />

            <BubblesPage />

            <CoinsTable />

            <Footer />
          </div>
        </div>
      </div>

      <ModalComponent>
        <ChartModalContent />
      </ModalComponent>
    </main>
  );
}
