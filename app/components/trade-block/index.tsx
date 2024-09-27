import { Typography } from '@/app/ui-components/typography'
import styles from './styles.module.scss'
import { TwitterIcon } from '@/app/ui-components/icons/twitter-icon'
import { useWindowDimensions } from '@/hooks/use-window-dimensions'
import Image from 'next/image';

const TradeBlock = () => {
  const { width } = useWindowDimensions()
  const isMobileWidth = width < 1100
  const blazingPath = `/static/assets/networks-icons/blazing.png`;
  const maestroPath = `/static/assets/networks-icons/maestro.png`;
  const photonPath = `/static/assets/networks-icons/photon.png`;
  const bonkPath = `/static/assets/networks-icons/bonk.png`;
  const bulxPath = `/static/assets/networks-icons/bulx.png`;

  return (
    <div className={styles['trade-block']}>
      <Typography className={styles['title']}>Trade now</Typography>

      <ul className={styles['list']}>
        <li className={styles.item}>
          <a href="https://app.blazingbot.com/" target="_blank" rel="noopener noreferrer" style={{ position: 'relative', zIndex: 1 }}>
            <Image
              loading='lazy'
              src={blazingPath}
              alt={`Blazing bot`}
              width={40}
              height={40}
            />
          </a>
        </li>
        <li className={styles.item}>
          <a href="https://www.maestrobots.com/" target="_blank" rel="noopener noreferrer" style={{ position: 'relative', zIndex: 1 }}>
            <Image
              loading='lazy'
              src={maestroPath}
              alt={`Maestro`}
              width={40}
              height={40}
            />
          </a>
        </li>
        <li className={styles.item}>
          <a href="https://photon-sol.tinyastro.io/" target="_blank" rel="noopener noreferrer" style={{ position: 'relative', zIndex: 1 }}>
            <Image
              loading='lazy'
              src={photonPath}
              alt={`Photon`}
              width={40}
              height={40}
            />
          </a>
        </li>
        <li className={styles.item}>
          <a href="https://bull-x.io/" target="_blank" rel="noopener noreferrer" style={{ position: 'relative', zIndex: 1 }}>
            <Image
              loading='lazy'
              src={bulxPath}
              alt={`Bulx`}
              width={40}
              height={40}
            />
          </a>
        </li>
        <li className={styles.item}>
          <a href="#" target="_blank" rel="noopener noreferrer" style={{ position: 'relative', zIndex: 1 }}>
            <Image
              loading='lazy'
              src={bonkPath}
              alt={`Bonk`}
              width={40}
              height={40}
            />
          </a>
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