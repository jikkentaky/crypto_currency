import { useStore } from '@/store';
import styles from './styles.module.scss'
import { useEffect, useMemo, useState } from 'react';
import { SearchInput } from '@/app/ui-components/search-input';
import { SearchIcon, VisibilityOff, VisibilityOn } from '@/app/ui-components/icons';
import { Typography } from '@/app/ui-components/typography';
import { Network } from '@/types/network.type';
import Image from 'next/image';
import cn from 'classnames';

const NetworksModalContent = () => {
  const { isNetworks, networkList, setNetworkList } = useStore()
  const [searchNetwork, setSearchNetwork] = useState('');

  const filteredNetworks = useMemo(
    () =>
      networkList?.filter(({ name }) =>
        name.toLowerCase().startsWith(searchNetwork.toLowerCase().trim()),
      ),
    [searchNetwork, networkList],
  )

  useEffect(() => {
    if (!isNetworks) return;

    const savedNetworkList = localStorage.getItem('networkList');
    if (savedNetworkList && networkList) {
      const parsedNetworkList = JSON.parse(savedNetworkList);
      const updatedNetworkList = networkList.map(network => {
        const savedNetwork = parsedNetworkList.find((saved: Network) => saved.id === network.id);
        return savedNetwork ? { ...network, isVisible: savedNetwork.isVisible } : network;
      });
      setNetworkList(updatedNetworkList);
    }
  }, [isNetworks]);

  const toggleVisibility = (id: number) => {
    const updatedNetworkList = networkList?.map(network =>
      network.id === id ? { ...network, isVisible: !network.isVisible } : network
    );

    if (!updatedNetworkList) return;

    setNetworkList(updatedNetworkList);
    localStorage.setItem('networkList', JSON.stringify(updatedNetworkList));
  };

  const showAllNetworks = () => {
    const updatedNetworkList = networkList?.map(network => ({ ...network, isVisible: true }));

    if (!updatedNetworkList) return;

    setNetworkList(updatedNetworkList);
    localStorage.setItem('networkList', JSON.stringify(updatedNetworkList));
  };
  return (
    <>
      <div className={styles['search-block']}>
        <SearchInput
          label={<><SearchIcon /> Search</>}
          placeholder="Enter network..."
          onChange={setSearchNetwork}
          value={searchNetwork}
        />
      </div>

      <div className={styles['title-wrapper']} onClick={showAllNetworks}>
        <Typography>Network list</Typography>
        <button className={styles['show-all-button']}>SHOW ALL</button>
      </div>

      <div className={styles['networks-list']}>
        {filteredNetworks?.map(({ id, name, isVisible }) => {
          const imageName = name.toLowerCase().replace(/\s+/g, '-');
          const path = `/static/assets/networks-icons/${imageName}.png`;

          return (
            <button
              key={id}
              className={cn(styles['network-button'],
                {
                  [styles['inactive']]: !isVisible,
                  [styles['active']]: isVisible
                })}
              onClick={() => toggleVisibility(id)}
              title={name}
            >
              <div className={styles['network-block']}>
                <Image
                  loading='lazy'
                  src={path}
                  alt={`${name} icon`}
                  width={24}
                  height={24}
                  className={styles.img}
                />
                <Typography>
                  {name.length > 10 ? name.slice(0, 10) + '...' : name}
                </Typography>
              </div>
              {isVisible ? <VisibilityOff /> : <VisibilityOn />}
            </button>
          );
        })}
      </div>
    </>
  )
}

export { NetworksModalContent }