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
import { CustomSelect } from '@/app/ui-components/select';
import { Typography } from '@/app/ui-components/typography';

const Footer = () => {
  const { isOpenMobileMenu, currentResolution, isNetworks, isOpenMobileTimeFrame, setIsOpenMobileMenu, setIsOpenMobileTimeFrame } = useStore()

  const handleOpenModal = () => {
    setIsOpenMobileMenu(true)
  }

  const handleToggleTimeFrame = () => {
    setIsOpenMobileTimeFrame(!isOpenMobileTimeFrame)
  }

  return (
    <footer className={styles.footer}>
      <div className={styles['sort-wrapper']}>
        <Typography className={styles['sort-label']}>
          Sort by
        </Typography>

        <CustomSelect />
      </div>

      <div className={styles['networks-wrapper']}>
        <MobileButton className={styles.grow} onClick={handleOpenModal}>
          <div className={styles['network-block']}>
            <MobileNetworksIcon />
            All networks
          </div>

          <PriceArrowIcon className={styles.rotate} />
        </MobileButton>

        <MobileButton onClick={handleToggleTimeFrame}>
          {mobileResolution[currentResolution as keyof typeof mobileResolution]}
          <PriceArrowIcon className={styles.rotate} />
        </MobileButton>
      </div>

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