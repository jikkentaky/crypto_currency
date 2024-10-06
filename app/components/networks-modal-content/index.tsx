import { useStore } from '@/store';
import styles from './styles.module.scss';
import { useEffect, useMemo, useState } from 'react';
import { SearchInput } from '@/app/ui-components/search-input';
import { Network } from '@/types/network.type';
import Image from 'next/image';
import cn from 'classnames';
import { useWindowDimensions } from '@/hooks/use-window-dimensions';
import { useModal } from '@/app/ui-components/modal';
import FavoritesNetworksBody from './components/favorite-networks-body';
import SelectNetworkBody from './components/select-network-body';

const NetworksModalContent = () => {
  const { isEditNetworks } = useModal()
  const { isNetworks, networkList, setNetworkList } = useStore()
  const [searchNetwork, setSearchNetwork] = useState('')
  const [isShowAll, setIsShowAll] = useState(true)
  const { width } = useWindowDimensions()

  const filteredNetworks = useMemo(
    () =>
      networkList?.filter(({ name }) =>
        name.toLowerCase().startsWith(searchNetwork.toLowerCase().trim()),
      ) || [],
    [searchNetwork, networkList],
  )

  useEffect(() => {
    if (!isNetworks) return

    const savedNetworkList = localStorage.getItem('networkList')
    const savedIsShowAll = localStorage.getItem('isShowAll')

    if (savedIsShowAll !== null) {
      setIsShowAll(JSON.parse(savedIsShowAll))
    }

    if (savedNetworkList && networkList) {
      const parsedNetworkList = JSON.parse(savedNetworkList)
      const updatedNetworkList = networkList.map((network) => {
        const savedNetwork = parsedNetworkList.find((saved: Network) => saved.id === network.id)
        return savedNetwork ? { ...network, isVisible: savedNetwork.isVisible } : network
      })
      setNetworkList(updatedNetworkList)
    }
  }, [isNetworks])

  const isMobileContent = isNetworks && width < 1100

  return (
    <div className={cn(styles.container, { [styles['mobile-container']]: isMobileContent })}>
      {/* {isMobileContent && (
        <div>
          <h2 className={styles.title}>Favorite networks</h2>

          <Typography>Toggle network visibility throughout the app.</Typography>
        </div>
      )} */}

      <div className={styles['search-block']}>
        <SearchInput
          isHide
          label={
            <>
              <Image
                src="/static/assets/images/search.png"
                alt="search-icon"
                width={16}
                height={16}
              />
              Search
            </>
          }
          placeholder="Enter network..."
          onChange={setSearchNetwork}
          value={searchNetwork}
        />
      </div>

      {!isEditNetworks ? (
        <SelectNetworkBody networkList={filteredNetworks} />
      ) : (
        <FavoritesNetworksBody
          networkList={filteredNetworks}
          isShowAll={isShowAll}
          setIsShowAll={setIsShowAll}
        />
      )}
    </div>
  )
}

export { NetworksModalContent }
