'use client';

import { MobileButton } from '@/app/ui-components/mobile-button'
import styles from './styles.module.scss'
import { useStore } from '@/store'
import { MobileModal } from '@/app/ui-components/mobile-modal';
import cn from 'classnames';
import { NetworksModalContent } from '@/app/components/networks-modal-content';
import { mobileResolution } from '@/lib/config';
import { MobileModalNetworks } from '@/app/components/mobile-modal-networks';
import { SelectTimeframe } from '@/app/components/select-timeframe';
import { MobileNetworksIcon } from '@/app/ui-components/icons/mobile-networks-icon';
import { PriceArrowIcon } from '@/app/ui-components/icons/price-arrow-icon';

const Footer = () => {
  const { isOpenMobileMenu, resolution, isNetworks, isOpenMobileTimeFrame, setIsOpenMobileMenu, setIsOpenMobileTimeFrame } = useStore()

  const handleOpenModal = () => {
    setIsOpenMobileMenu(true)
  }

  const handleToggleTimeFrame = () => {
    setIsOpenMobileTimeFrame(!isOpenMobileTimeFrame)
  }

  return (
    <footer className={styles.footer}>
      <MobileButton className={styles.grow} onClick={handleOpenModal}>
        <MobileNetworksIcon />
        All networks
        <PriceArrowIcon className={styles.rotate} />
      </MobileButton>

      <MobileButton onClick={handleToggleTimeFrame}>
        {mobileResolution[resolution]}
        <PriceArrowIcon className={styles.rotate} />
      </MobileButton>

      <MobileModal
        className={cn({
          [styles['networks-modal']]: isNetworks,
          [styles['networks-chose-modal']]: !isNetworks,
        })}
        open={isOpenMobileMenu}
        onClose={() => setIsOpenMobileMenu(false)}
      >
        {!isNetworks && <MobileModalNetworks />}

        {isNetworks && <NetworksModalContent />}
      </MobileModal>

      <MobileModal
        className={styles.timeframe}
        open={isOpenMobileTimeFrame}
        onClose={() => setIsOpenMobileTimeFrame(false)}
      >
        <SelectTimeframe />
      </MobileModal>
    </footer>
  )
}

export { Footer }