'use client'
import { FC, useEffect, useMemo } from 'react'

import styles from './styles.module.scss'
import { useStore } from '@/store';

import { SearchInput } from '@/app/ui-components/search-input';
import { NetworksList } from '@/app/components/networks-list';
import { getNetworks } from '@/app/api/lib';
import { appConfig } from '@/lib/config';

const Aside: FC = () => {
  const { searchNetwork, networkList, setSearchNetwork, setNetworkList } = useStore()

  useEffect(() => {
    const fetchNetworks = async () => {
      try {
        const networks = await getNetworks()

        if (!networks) return

        setNetworkList(networks);
      } catch (error) {
        console.error(error)
      }
    }

    fetchNetworks()
  }, [])

  const filteredNetworks = useMemo(
    () =>
      networkList?.filter(({ name, isVisible }) =>
        name.toLowerCase().includes(searchNetwork.toLowerCase().trim()) && isVisible,
      ),
    [searchNetwork, networkList],
  )

  return (
    <aside className={styles.aside} style={{ minWidth: `${appConfig.aside}px` }}>
      <div className={styles['top-part']}>
        <h1 className={styles.title}>ONCHAINBUBBLES</h1>

        <SearchInput
          width='170px'
          placeholder="Search network..."
          value={searchNetwork}
          onChange={setSearchNetwork}
        />
      </div>

      <div className={styles['bottom-part']}>
        {filteredNetworks && <NetworksList networks={filteredNetworks} />}
      </div>
    </aside>
  )
}

export { Aside }
