'use client';

import styles from './styles.module.scss'
import { useStore } from '@/store'
import { ButtonGroupRadio } from '@/app/ui-components/button-group-radio';
import { priceChangeButtons } from '@/lib/config';

const Footer = () => {
  const { resolution, setResolution } = useStore()

  return (
    <footer className={styles.footer}>
      <ButtonGroupRadio
        buttons={priceChangeButtons}
        resolution={resolution}
        setResolution={setResolution}
        className={styles['button-group']}
      />
    </footer>
  )
}

export { Footer }