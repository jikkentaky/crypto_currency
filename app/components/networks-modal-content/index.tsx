import { useStore } from '@/store';
import styles from './styles.module.scss'
import { useEffect, useMemo, useState } from 'react';
import { SearchInput } from '@/app/ui-components/search-input';
import { SearchIcon, VisibilityOff, VisibilityOn } from '@/app/ui-components/icons';
import { Typography } from '@/app/ui-components/typography';
import { Network } from '@/types/network.type';
import Image from 'next/image';
import cn from 'classnames';
import { useWindowDimensions } from '@/hooks/use-window-dimensions';

const NetworksModalContent = () => {
  const { isNetworks, networkList, setNetworkList } = useStore()
  const [searchNetwork, setSearchNetwork] = useState('');
  const { width } = useWindowDimensions();

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

  const isMobileContent = isNetworks && width < 1100;

  return (
    <div className={cn(styles.container, { [styles['mobile-container']]: isMobileContent })}>
      {isMobileContent && <div>
        <h2 className={styles.title}>Favorite networks</h2>

        <Typography>
          Toggle network visibility
        </Typography>

        <Typography>
          throughout the app.
        </Typography>
      </div>}

      <div className={styles['search-block']}>
        <SearchInput
          isHide
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
    </div >
  )
}

export { NetworksModalContent }