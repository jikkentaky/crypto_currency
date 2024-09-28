import { Typography } from '@/app/ui-components/typography'
import styles from './styles.module.scss'
import { TwitterIcon } from '@/app/ui-components/icons/twitter-icon'
import { useWindowDimensions } from '@/hooks/use-window-dimensions'
import Image from 'next/image';
import { PlatformLink } from '../platform-link';
import { blazingPath, maestroPath, photonPath, bulxPath, bonkPath } from '@/lib/config';

const TradeBlock = () => {
  const { width } = useWindowDimensions()
  const isMobileWidth = width < 1100

  return (
    <div className={styles['trade-block']}>
      <Typography className={styles['title']}>Trade now</Typography>

      <ul className={styles['list']}>
        <li className={styles.item}>
          <PlatformLink path={blazingPath} href="https://app.blazingbot.com/" />
        </li>
        <li className={styles.item}>
          <PlatformLink path={maestroPath} href="https://www.maestrobots.com/" />
        </li>

        <li className={styles.item}>
          <PlatformLink path={photonPath} href="https://photon-sol.tinyastro.io/" />
        </li>

        <li className={styles.item}>
          <PlatformLink path={bulxPath} href="https://bull-x.io/" />
        </li>
        <li className={styles.item}>
          <PlatformLink path={bonkPath} href="#" />
        </li>
      </ul>

      <div>
        <div className={styles['about']}>
          <Typography className={styles['about-subtitle']}>About</Typography>

          {!isMobileWidth && <ul className={styles['social-list']}>
            <li><TwitterIcon /></li>
            <li><TwitterIcon /></li>
            <li><TwitterIcon /></li>
            <li><TwitterIcon /></li>
          </ul>}
        </div>

        <Typography className={styles['about-description']}>
          ONDO is the governance token for Flux FInance and the Ondo DAO.
        </Typography>

        {isMobileWidth && <ul className={styles['mobile-social-list']}>
          <li><TwitterIcon /></li>
          <li><TwitterIcon /></li>
          <li><TwitterIcon /></li>
          <li><TwitterIcon /></li>
        </ul>}
      </div>
    </div>
  )
}
export { TradeBlock }