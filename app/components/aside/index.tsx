'use client';
import { FC, useEffect, useMemo } from 'react';

import styles from './styles.module.scss';
import { useStore } from '@/store';

import { SearchInput } from '@/app/ui-components/search-input';
import { NetworksList } from '@/app/components/networks-list';
import { getNetworks } from '@/app/api/lib';
import { appConfig } from '@/lib/config';
import { useWindowDimensions } from '@/hooks/use-window-dimensions';
import cn from 'classnames';
import { Network } from '@/types/network.type';

const Aside: FC = () => {
  const { searchNetwork, networkList, setSearchNetwork, setNetworkList } = useStore();
  const { width } = useWindowDimensions();

  useEffect(() => {
    const fetchNetworks = async () => {
      try {
        const networks = await getNetworks();

        if (!networks) return;

        const savedNetworkList = localStorage.getItem('networkList');
        let updatedNetworkList = networks;

        if (savedNetworkList) {
          const parsedNetworkList = JSON.parse(savedNetworkList);
          updatedNetworkList = networks.map(network => {
            const savedNetwork = parsedNetworkList.find((saved: Network) => saved.id === network.id);
            return savedNetwork ? { ...network, isVisible: savedNetwork.isVisible } : network;
          });
        }

        setNetworkList(updatedNetworkList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNetworks();
  }, []);

  const filteredNetworks = useMemo(
    () =>
      networkList?.filter(({ name, isVisible }) =>
        name.toLowerCase().includes(searchNetwork.toLowerCase().trim()) && isVisible,
      ),
    [searchNetwork, networkList],
  );

  return (
    <aside
      className={cn(styles.aside, {
        [styles['large-screen']]: width >= 1920,
        [styles['medium-screen']]: width <= 1920,
      })}
      style={{
        minWidth: `${appConfig.aside}px`,
        maxWidth: `${appConfig.aside}px`,
      }}
    >
      <div className={styles['top-part']}>
        <h1 className={styles.title}>
          ONCHAINBUBBLES
        </h1>

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
  );
};

export { Aside };