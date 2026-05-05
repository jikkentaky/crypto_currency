'use client'
import styles from './styles.module.scss'
import { useStore } from '@/store'
import { ButtonGroupRadio } from '@/ui-components/button-group-radio'
import { SearchInput } from '@/ui-components/search-input'
import cn from 'classnames'
import { priceChangeButtons } from '@/config/config'
import { ChangeEvent } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'

const BUBBLE_COUNT_OPTIONS = [10, 25, 50, 100];

const Header = () => {
  const {
    searchCoin,
    resolution,
    bubbleCount,
    setResolution,
    setSearchCoin,
    setBubbleCount,
  } = useStore()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchCoin(e.target.value);
  };

  const handleCountChange = (_: React.MouseEvent<HTMLElement>, value: number | null) => {
    if (value !== null) setBubbleCount(value);
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

          <ToggleButtonGroup
            value={bubbleCount}
            exclusive
            onChange={handleCountChange}
            aria-label="bubble-count"
            className={cn(styles['button-group'], styles['count-group'])}
            sx={{
              '.MuiToggleButton-root': {
                font: 'inherit',
                color: '#fff',
                fontWeight: 800,
              },
            }}
          >
            {BUBBLE_COUNT_OPTIONS.map((n) => (
              <ToggleButton
                key={n}
                value={n}
                className={cn(styles['count-button'], { [styles['count-selected']]: n === bubbleCount })}
              >
                {n}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
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
