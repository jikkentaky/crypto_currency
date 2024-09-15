'use client'

import { Resolution } from "@/types/bubbles.type"
import { ButtonGroupRadio } from "@/app/ui-components/button-group-radio"
import { useStore } from "@/store"
import { useEffect, useState } from "react"
import { ChartComponent } from "./chart-component"
import { getBars } from "@/app/api/lib"
import { Loader } from "@/app/ui-components/loader"

const buttons = [
  { value: Resolution.HOUR, content: '1H' },
  { value: Resolution.FOUR_HOURS, content: '4H' },
  { value: Resolution.TWELVE_HOURS, content: '12H' },
  { value: Resolution.DAY, content: '1D' },
  { value: Resolution.WEEK, content: '7D' },
  { value: Resolution.MONTH, content: '1M' },
  { value: Resolution.YEAR, content: '1Y' },
]

const Chart = () => {
  const { modalResolution, setModalResolution, chosenToken, chosenNetwork } = useStore()

  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchInitialData = async () => {
    if (!chosenToken || !chosenNetwork) return
    setIsLoading(true)

    const symbol = chosenToken.token.address + ':' + chosenNetwork.id
    try {
      const data = await getBars(symbol, modalResolution, chosenToken.quoteToken)
      if (!data) return

      setData(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchInitialData()
  }, [modalResolution])

  return (
    <div>
      {(data && !isLoading) && <ChartComponent data={data} />}

      {isLoading && <Loader height={300} />}

      <ButtonGroupRadio
        buttons={buttons}
        resolution={modalResolution}
        // @ts-ignore
        setResolution={setModalResolution}
      />
    </div>
  )
}

export { Chart }