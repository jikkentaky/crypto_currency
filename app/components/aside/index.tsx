'use client'
import { FC, useMemo } from 'react'

import styles from './styles.module.scss'
import { useStore } from '@/store';

import { SearchInput } from '@/app/ui-components/search-input';
import { Network } from '@/types/network.type';
import { NetworksList } from '@/app/components/networks-list';

type Props = {
  networks: Network[]
}

const Aside: FC<Props> = ({ networks }) => {
  const { searchNetwork, setSearchNetwork } = useStore()

  const filteredNetworks = useMemo(
    () =>
      networks?.filter(({ name }) =>
        name.toLowerCase().includes(searchNetwork.toLowerCase().trim()),
      ),
    [searchNetwork, networks],
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
