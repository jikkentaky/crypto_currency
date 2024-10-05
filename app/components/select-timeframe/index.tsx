import { priceChangeButtons } from '@/lib/config'
import styles from './styles.module.scss'
import { useStore } from '@/store'
import cn from 'classnames'
import { PriceChange } from '@/types/bubbles.type'
import { SORT_BY } from '@/types/sort-by.enum'

const SelectTimeframe = () => {
  const { currentResolution, sortBy, isOpenModal, setResolution, setIsOpenMobileTimeFrame, setCurrentResolution } = useStore()


  const handleChangeResolution = (value: any) => {
    if (isOpenModal) {
      setResolution(value)
    }

    if (sortBy === 'PRICE_CHANGE' as SORT_BY) {
      setResolution(value);
    }

    if (value === PriceChange.HOUR || value === PriceChange.DAY || value === PriceChange.FOUR_HOURS || value === PriceChange.TWELVE_HOURS) {
      setCurrentResolution(value)
    }

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
              className={cn(styles.button, { [styles.selected]: currentResolution as any === value })}
              onClick={() => handleChangeResolution(value as any)}>
              {content}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { SelectTimeframe }