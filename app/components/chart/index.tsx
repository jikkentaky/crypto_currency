'use client'

import { Resolution } from "@/types/bubbles.type"
import { ButtonGroupRadio } from "@/app/ui-components/button-group-radio"
import { useStore } from "@/store"
import { ChartComponent } from "./chart-component"
import { Loader } from "@/app/ui-components/loader"
import styles from './styles.module.scss'
import { UseBars } from "@/hooks/use-bars"

const buttons = [
  { value: Resolution.HOUR, content: 'HOUR' },
  { value: Resolution.DAY, content: 'DAY' },
  { value: Resolution.WEEK, content: 'WEEK' },
  { value: Resolution.MONTH, content: 'MONTH' },
]

const Chart = () => {
  const { modalResolution, setModalResolution } = useStore()
  const { data, isLoading } = UseBars()
  const loaderHeight = '385px'

  return (
    <div>
      <div className={styles.container}>
        {(data && !isLoading) && <ChartComponent data={data} />}

        {isLoading && <Loader height={loaderHeight} />}
      </div>

      <ButtonGroupRadio
        className={styles.buttons}
        // @ts-expect-error
        buttons={buttons}
        resolution={modalResolution}
        setResolution={setModalResolution}
      />
    </div>
  )
}

export { Chart }