import { TokenInfo } from "@/app/components/chart-modal-content/components/token-info"
import { Chart } from "@/app/components/chart-modal-content/components/chart"
import styles from './styles.module.scss'


const ChartModalContent = () => {
  return (
    <div className={styles.container}>
      <TokenInfo />

      <Chart />
    </div>
  )
}

export { ChartModalContent }