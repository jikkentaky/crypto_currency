'use client';

import { MobileButton } from '@/app/ui-components/mobile-button'
import styles from './styles.module.scss'
import { useStore } from '@/store'
import { EditIcon, MobileNetworksIcon, PriceArrowIcon } from '@/app/ui-components/icons';
import { MobileModal } from '@/app/components/mobile-modal';
import { SearchInput } from '@/app/ui-components/search-input';
import { Typography } from '@/app/ui-components/typography';
import Image from 'next/image';
import cn from 'classnames';
import { useMemo } from 'react';
import { NetworksModalContent } from '../networks-modal-content';


const Footer = () => {
  const { resolution, searchNetwork, chosenNetwork, networkList, isNetworks, setIsNetworks, setIsOpenMobileMenu, setChosenNetwork, setSearchNetwork } = useStore()

  const handleOpenModal = () => {
    setIsOpenMobileMenu(true)
  }

  const filteredNetworks = useMemo(
    () =>
      networkList?.filter(({ name, isVisible }) =>
        name.toLowerCase().includes(searchNetwork.toLowerCase().trim()) && isVisible,
      ),
    [searchNetwork, networkList],
  )

  return (
    <footer className={styles.footer}>
      <MobileButton className={styles.grow} onClick={handleOpenModal}>
        <MobileNetworksIcon />
        All networks
        <PriceArrowIcon className={styles.rotate} />
      </MobileButton>

      <MobileButton>
        {resolution}
      </MobileButton>

      <MobileModal className={cn({ [styles['networks-modal']]: isNetworks })}>
        {!isNetworks &&
          <>
            <div className={styles['networks-search']}>
              <SearchInput
                isHide
                placeholder="Enter network..."
                value={searchNetwork}
                onChange={setSearchNetwork}
              />
            </div>

            <Typography className={styles.title}>All networks</Typography>

            <div className={styles['networks']}>
              {filteredNetworks && filteredNetworks.map(({ id, name, isVisible }) => {
                const imageName = name.toLowerCase().replace(/\s+/g, '-');
                const path = `/static/assets/networks-icons/${imageName}.png`;

                return (
                  <button
                    key={id}
                    className={cn(styles.button,
                      { [styles.selected]: chosenNetwork?.id === id })
                    }
                    onClick={() => setChosenNetwork({ id, name, isVisible })}
                  >
                    <Image
                      loading='lazy'
                      src={path}
                      alt={`${name} icon`}
                      width={24}
                      height={24}
                      className={styles.img}
                    />

                    <span>
                      {name}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className={styles.edit} onClick={() => setIsNetworks(true)}>
              <EditIcon />
              Edit favorite networks
            </div>
          </>
        }

        {isNetworks && <NetworksModalContent />}
      </MobileModal>
    </footer>
  )
}

export { Footer }