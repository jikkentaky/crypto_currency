'use client'

import { FC } from 'react'

import styles from './styles.module.scss'
import { Network } from '@/types/network.type'
import { NetworkIcon } from '@/app/ui-components/icons'
import { useStore } from '@/store'
import { Typography } from '@/app/ui-components/typography'

type Props = {
  networks: Network[]
}
const NetworksList: FC<Props> = ({ networks }) => {
  const { setChosenNetwork } = useStore()

  return (
    <div className={styles['networks-list']}>
      <div className={styles['network-wrapper']}>
        <div className={styles['network-block']}>
          <NetworkIcon />

          <Typography variant="body2" variantWeight="semibold">
            All networks
          </Typography>
        </div>

        <Typography variant="body2" variantWeight="semibold" color="green">
          EDIT
        </Typography>
      </div>

      {networks.map(({ id, name }) => (
        <button key={id} className={styles.button} onClick={() => setChosenNetwork({ id, name })}>
          {name}
        </button>
      ))}
    </div>
  )
}

export { NetworksList }
