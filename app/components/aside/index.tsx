'use client'
import { FC, useEffect, useMemo, useState } from 'react'

import styles from './styles.module.scss'
import { useStore } from '@/store';

import { SearchInput } from '@/app/ui-components/search-input';
import { Network } from '@/types/network.type';
import { NetworksList } from '@/app/components/networks-list';
import { getNetworks } from '@/app/api/lib';

const Aside: FC = () => {
  const { searchNetwork, setSearchNetwork } = useStore()

  const [networkList, setNetworksList] = useState<Network[] | null>(null)

  useEffect(() => {
    const fetchNetworks = async () => {
      const networks = await getNetworks()

      if (!networks) return

      setNetworksList(networks);
    }

    fetchNetworks()
  }, [])

  const filteredNetworks = useMemo(
    () =>
      networkList?.filter(({ name }) =>
        name.toLowerCase().includes(searchNetwork.toLowerCase().trim()),
      ),
    [searchNetwork, networkList],
  )

  return (
    <main className={styles.main}>
      <aside className={styles.aside}>
        <div className={styles['top-part']}>
          <h1 className={styles.title}>ONCHAINBUBBLES</h1>

          <SearchInput
            placeholder="Search network"
            searchInput={searchNetwork}
            setSearchInput={setSearchNetwork}
          />
        </div>

        <div className={styles['bottom-part']}>
          {filteredNetworks && <NetworksList networks={filteredNetworks} />}
        </div>
      </aside>

      <div className={styles.content}>
        <header className={styles.header}></header>
      </div>
    </main>
  )
}

export { Aside }
