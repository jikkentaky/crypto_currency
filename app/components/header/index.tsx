'use client'
import styles from './styles.module.scss'
import { useStore } from '@/store'
import { ButtonGroupRadio } from '@/app/ui-components/button-group-radio'
import { SearchInput } from '@/app/ui-components/search-input'
import cn from 'classnames'
import { priceChangeButtons } from '@/lib/config'

const Header = () => {
  const {
    searchCoin,
    resolution,
    setResolution,
    setSearchCoin
  } = useStore()

  return (
    <header className={cn(styles.header)}>
      <h1 className={styles.title}>TopCryptocurrencies</h1>
      <h1 className={styles['title-mobile']}>TB</h1>

      <div className={styles.container}>
        <div className={styles['buttons-wrapper']}>
          <ButtonGroupRadio
            buttons={priceChangeButtons}
            resolution={resolution}
            setResolution={setResolution}
            className={styles['button-group']}
          />
        </div>

        <SearchInput
          placeholder="Enter cryptocurrency..."
          onChange={setSearchCoin}
          value={searchCoin}
          className={styles.search}
        />
      </div>
    </header>
  )
}
export { Header }
