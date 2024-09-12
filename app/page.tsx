import { Aside } from "./components/aside";
import { BubblesPage } from "./components/bubbles";
import { Header } from "./components/header";
import styles from './styles.module.scss';

export default function Home() {

  return (
    < main className={styles.main} >
      <div className={styles.container}>
        <Aside />

        <div className={styles.content}>
          <Header />

          <BubblesPage />
        </div>
      </div>
    </main >
  );
}
