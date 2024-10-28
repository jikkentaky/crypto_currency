'use client'
import styles from './styles.module.scss'
import { useStore } from '@/store'
import { ButtonGroupRadio } from '@/ui-components/button-group-radio'
import { SearchInput } from '@/ui-components/search-input'
import cn from 'classnames'
import { priceChangeButtons } from '@/config/config'
import { ChangeEvent } from 'react'

const Header = () => {
  const {
    searchCoin,
    resolution,
    setResolution,
    setSearchCoin
  } = useStore()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchCoin(e.target.value);
  };

  return (
    <header className={cn(styles.header)}>
      <h1 className={styles.title}>TopCryptocurrencies</h1>
      <h1 className={styles['title-mobile']}>TC</h1>

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
          onChange={handleChange}
          value={searchCoin}
          className={styles.search}
        />
      </div>
    </header>
  )
}
export { Header }
