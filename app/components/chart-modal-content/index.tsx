import { Chart } from "@/app/components/chart"
import { TokenInfo } from "@/app/components/token-info"
import { TradeBlock } from "@/app/components/trade-block"
import styles from './styles.module.scss'

const ChartModalContent = () => {
  return (
    <div className={styles.container}>
      <TokenInfo />
      <Chart />
      <TradeBlock />
    </div>
  )
}

export { ChartModalContent }