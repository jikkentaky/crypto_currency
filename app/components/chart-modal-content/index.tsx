import { Chart } from "@/app/components/chart"
import { TokenInfo } from "@/app/components/token-info"
import { TradeBlock } from "@/app/components/trade-block"

const ChartModalContent = () => {
  return (
    <>
      <TokenInfo />
      <Chart />
      <TradeBlock />
    </>
  )
}

export { ChartModalContent }