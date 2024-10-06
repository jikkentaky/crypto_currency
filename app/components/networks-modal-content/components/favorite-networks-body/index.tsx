import styles from '../../styles.module.scss'
import { VisibilityOff, VisibilityOn } from '@/app/ui-components/icons'
import { Typography } from '@/app/ui-components/typography'
import Image from 'next/image'
import cn from 'classnames'
import { Dispatch, FC, SetStateAction } from 'react'
import { useStore } from '@/store'
import { Network } from '@/types/network.type'

type Props = {
  networkList: Network[]
  isShowAll: boolean
  setIsShowAll: Dispatch<SetStateAction<boolean>>
}

const FavoritesNetworksBody: FC<Props> = ({ networkList, isShowAll, setIsShowAll }) => {
  const { setNetworkList } = useStore()

  const toggleAllNetworks = () => {
    const updatedNetworkList = networkList?.map((network) => ({
      ...network,
      isVisible: !isShowAll,
    }))

    if (!updatedNetworkList) return

    setNetworkList(updatedNetworkList)
    localStorage.setItem('networkList', JSON.stringify(updatedNetworkList))
    localStorage.setItem('isShowAll', JSON.stringify(!isShowAll))
    setIsShowAll(!isShowAll)
  }

  const toggleVisibility = (id: number) => {
    const updatedNetworkList = networkList?.map((network) =>
      network.id === id ? { ...network, isVisible: !network.isVisible } : network,
    )

    if (!updatedNetworkList) return

    setNetworkList(updatedNetworkList)
    localStorage.setItem('networkList', JSON.stringify(updatedNetworkList))
  }
  return (
    <>
      <div className={styles['title-wrapper']}>
        <Typography>Network list</Typography>
        <button className={styles['show-all-button']} onClick={toggleAllNetworks}>
          {isShowAll ? 'HIDE ALL' : 'SHOW ALL'}
        </button>
      </div>

      <div className={styles['networks-list']}>
        {networkList?.map(({ id, name, isVisible }) => {
          const imageName = name.toLowerCase().replace(/\s+/g, '-')
          const path = `/static/assets/images/${imageName}.png`

          return (
            <button
              key={id}
              className={cn(styles['network-button'], {
                [styles['inactive']]: !isVisible,
                [styles['active']]: isVisible,
              })}
              onClick={() => toggleVisibility(id)}
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
              {isVisible ? <VisibilityOff /> : <VisibilityOn />}
            </button>
          )
        })}
      </div>
    </>
  )
}

export default FavoritesNetworksBody
