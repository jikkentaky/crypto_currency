import { priceChangeButtons } from '@/lib/config'
import styles from './styles.module.scss'
import { useStore } from '@/store'
import cn from 'classnames'
import { SORTING_BY } from '@/types/bubbles.type'

const SelectTimeframe = () => {
  const { resolution, setResolution, setIsOpenMobileTimeFrame } = useStore()

  const handleChangeResolution = (value: SORTING_BY) => {
    setResolution(value)
    setIsOpenMobileTimeFrame(false)
  }

  return (
    <div>
      <h2 className={styles.title}>Select timeframe</h2>

      <div className={styles.buttons}>
        {priceChangeButtons.map(({ value, content }) => {
          return (
            <button
              key={value}
              className={cn(styles.button, { [styles.selected]: resolution === value })}
              onClick={() => handleChangeResolution(value)}>
              {content}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { SelectTimeframe }