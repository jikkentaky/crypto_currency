import { FC } from 'react'

import { ToggleButton, ToggleButtonGroup, ToggleButtonProps } from '@mui/material'


import styles from './styles.module.scss'
import { useStore } from '@/store'
import { PriceChangePercentage } from '@/types/bubbles.type'

type ToggleButton = ToggleButtonProps & {
  value: string
  content: string
}

type Props = {
  buttons: ToggleButton[]
}

const ButtonGroupRadio: FC<Props> = ({ buttons }) => {
  const { resolution, setResolution } = useStore()

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: PriceChangePercentage,
  ) => {
    setResolution(newAlignment)
  }

  return (
    <ToggleButtonGroup
      color="primary"
      value={resolution}
      exclusive
      onChange={handleChange}
      aria-label="price-change"
      className={styles['button-group']}
      sx={{
        '.MuiToggleButton-root': {
          color: '#fff',
        },
        '.Mui-selected': {
          backgroundColor: '#00dc3e !important',
          color: '#000',
        },
      }}
    >
      {buttons.map(({ value, content }) => (
        <ToggleButton key={value} value={value} className={styles.button}>
          {content}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
export { ButtonGroupRadio }
