'use client'
import { PriceChangePercentage } from '@/types/bubbles.type'
import styles from './styles.module.scss'
import { useStore } from '@/store'
import { ButtonGroupRadio } from '@/app/ui-components/button-group-radio'
import { SearchInput } from '@/app/ui-components/search-input'

const buttons = [
  { value: PriceChangePercentage.HOUR, content: '1H' },
  { value: PriceChangePercentage.FOUR_HOURS, content: '4H' },
  { value: PriceChangePercentage.TWELVE_HOURS, content: '12H' },
  { value: PriceChangePercentage.DAY, content: '24H' },
]
const Header = () => {
  const { searchCoin, setSearchCoin } = useStore()

  return (
    <header className={styles.header}>
      <ButtonGroupRadio buttons={buttons} />

      <SearchInput
        placeholder="Search cryptocurrency"
        setSearchInput={setSearchCoin}
        searchInput={searchCoin}
      />
    </header>
  )
}
export { Header }
