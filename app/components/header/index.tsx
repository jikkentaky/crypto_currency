'use client'
import styles from './styles.module.scss'
import { useStore } from '@/store'
import { ButtonGroupRadio } from '@/app/ui-components/button-group-radio'
import { SearchInput } from '@/app/ui-components/search-input'
import cn from 'classnames'
import { priceChangeButtons } from '@/lib/config'
import { Typography } from '@/app/ui-components/typography'
import { CustomSelect } from '@/app/ui-components/select'
import { useEffect } from 'react'
import { getNetworks } from '@/app/api/lib'
import { Network } from '@/types/network.type'
import { MobileButton } from '@/app/ui-components/mobile-button'
import { PriceArrowIcon } from '@/app/ui-components/icons'

const Header = () => {
  const {
    searchCoin,
    resolution,
    chosenNetwork,
    setNetworkList,
    setResolution,
    setSearchCoin
  } = useStore()

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

  return (
    <header className={cn(styles.header)}
    >
      <h1 className={styles.title}>ONCHAINBUBBLES</h1>
      <h1 className={styles['title-mobile']}>OCB</h1>

      <div className={styles['buttons-wrapper']}>
        <div className={styles['sort-wrapper']}>
          <Typography className={styles.sort}>Active chains</Typography>

          <MobileButton className={styles.button}>
            {chosenNetwork.name}

            <PriceArrowIcon className={styles.icon} />
          </MobileButton>
        </div>

        <div className={styles['sort-wrapper']}>
          <Typography className={styles.sort}>Sort by</Typography>

          <CustomSelect />
        </div>

        <ButtonGroupRadio
          buttons={priceChangeButtons}
          resolution={resolution}
          setResolution={setResolution}
          className={styles['button-group']}
        />
      </div>

      <SearchInput
        placeholder="Enter cryptocurrency..."
        onChange={setSearchCoin}
        value={searchCoin}
        className={styles.search}
      />
    </header>
  )
}
export { Header }
