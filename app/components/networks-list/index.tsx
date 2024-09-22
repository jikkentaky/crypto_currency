'use client'

import { FC } from 'react'

import styles from './styles.module.scss'
import { Network } from '@/types/network.type'
import { NetworkIcon } from '@/app/ui-components/icons'
import { useStore } from '@/store'
import { Typography } from '@/app/ui-components/typography'
import Image from 'next/image'
import cn from 'classnames'

type Props = {
  networks: Network[]
}
const NetworksList: FC<Props> = ({ networks }) => {
  const { chosenNetwork, setChosenNetwork, setIsOpenModal, setIsNetworks } = useStore()

  const handleOpenModal = () => {
    setIsOpenModal(true);
    setIsNetworks(true);
  }

  return (
    <div>
      <div className={styles['networks-list']}>
        <div className={styles['network-wrapper']}>
          <div className={styles['network-block']}>
            <NetworkIcon />

            <Typography>
              All networks
            </Typography>
          </div>

          <button className={styles['edit-button']} onClick={handleOpenModal}>
            EDIT
          </button>
        </div>

        <div className={styles['networks']}>
          {networks.map(({ id, name, isVisible }) => {
            const imageName = name.toLowerCase().replace(/\s+/g, '-');
            const path = `/static/assets/networks-icons/${imageName}.png`;

            return (
              <button
                key={id}
                className={cn(styles.button,
                  { [styles.selected]: chosenNetwork?.id === id })
                }
                onClick={() => setChosenNetwork({ id, name, isVisible })}
              >
                <Image
                  loading='lazy'
                  src={path}
                  alt={`${name} icon`}
                  width={24}
                  height={24}
                  className={styles.img}
                />
                <span>{name}</span>
              </button>
            )
          })}
        </div>
      </div >
    </div>
  )
}

export { NetworksList }
