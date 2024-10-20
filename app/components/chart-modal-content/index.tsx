import { Chart } from "@/app/components/chart"
import { TokenInfo } from "@/app/components/token-info"
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