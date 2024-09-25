'use client'
import styles from './styles.module.scss'
import { useStore } from '@/store'
import { ButtonGroupRadio } from '@/app/ui-components/button-group-radio'
import { SearchInput } from '@/app/ui-components/search-input'
import cn from 'classnames'
import { useWindowDimensions } from '@/hooks/use-window-dimensions'
import { PriceChangeButtons } from '@/lib/config'


const Header = () => {
  const { searchCoin, resolution, setResolution, setSearchCoin } = useStore()
  const { width } = useWindowDimensions()

  return (
    <header className={cn(styles.header,
      {
        [styles.gradient]: width > 1100
      })}
    >
      <h1 className={styles.title}>OCB</h1>

      <div className={styles['buttons-wrapper']}>
        <ButtonGroupRadio
          buttons={PriceChangeButtons}
          resolution={resolution}
          // @ts-expect-error
          setResolution={setResolution}
        />
      </div>

      <SearchInput
        placeholder="Enter cryptocurrency..."
        onChange={setSearchCoin}
        value={searchCoin}
      />
    </header>
  )
}
export { Header }
