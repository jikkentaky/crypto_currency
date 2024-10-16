'use client';

import styles from './styles.module.scss'
import { useStore } from '@/store'
import { MobileModal } from '@/app/ui-components/mobile-modal';
import cn from 'classnames';
import { NetworksModalContent } from '@/app/components/networks-modal-content';
import { MobileModalNetworks } from '@/app/components/mobile-modal-networks';

const Footer = () => {
  const { isOpenMobileMenu, isNetworks, setIsOpenMobileMenu } = useStore()

  return (
    <footer className={styles.footer}>
      <MobileModal
        className={cn({
          [styles['networks-modal']]: isNetworks,
          [styles['networks-chose-modal']]: !isNetworks,
        })}
        open={isOpenMobileMenu}
        onClose={() => setIsOpenMobileMenu(false)}
      >
        {!isNetworks && <MobileModalNetworks />}

        {isNetworks && <div className={styles['networks-modal-content']}><NetworksModalContent /></div>}
      </MobileModal>
    </footer>
  )
}

export { Footer }