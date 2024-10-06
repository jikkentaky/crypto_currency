import styles from '../../styles.module.scss'
import { Typography } from '@/app/ui-components/typography'
import Image from 'next/image'
import { FC } from 'react'
import { useStore } from '@/store'
import { Network } from '@/types/network.type'
import { useModal } from '@/app/ui-components/modal'
import { Box } from '@mui/material'
import cn from 'classnames'

type Props = {
  networkList: Network[]
}

const SelectNetworkBody: FC<Props> = ({ networkList }) => {
  const { setIsEditNetworks } = useModal()
  const { setChosenNetwork, setIsOpenModal } = useStore()

  const handleNetworkClick = (network: Network) => {
    setChosenNetwork(network)
    setIsOpenModal(false)
    setIsEditNetworks(false)
  }
  return (
    <div className={cn(styles['select-networks'], styles['networks-list'])}>
      <button
        className={styles['network-button']}
        onClick={() => setIsEditNetworks(true)}
        title={'All'}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Box display="flex" alignItems="center" gap={0.5}>
            <Image
              src={`/static/assets/images/globus.png`}
              alt={`globus icon`}
              loading="lazy"
              width={24}
              height={24}
            />
            <Typography className={styles['all-networks']} variant="body1">
              All networks
            </Typography>
          </Box>
          <Typography className={styles['edit-networks']}>Edit</Typography>
        </Box>
      </button>

      {networkList?.map((network) => {
        const { id, name } = network
        const imageName = name.toLowerCase().replace(/\s+/g, '-')
        const path = `/static/assets/images/${imageName}.png`

        return (
          <button
            key={id}
            className={styles['network-button']}
            onClick={() => handleNetworkClick(network)}
            title={name}
          >
            <div className={styles['network-block']}>
              <Image
                loading="lazy"
                src={path}
                alt={`${name} icon`}
                width={24}
                height={24}
                className={styles.img}
              />
              <Typography>{name.length > 10 ? name.slice(0, 10) + '...' : name}</Typography>
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default SelectNetworkBody
