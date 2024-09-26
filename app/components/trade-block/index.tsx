import { Typography } from '@/app/ui-components/typography'
import styles from './styles.module.scss'
import { BBIcon, BonkIcon, BullxIcon, MaestroIcon, PhotonIcon } from '@/app/ui-components/icons'
import { TwitterIcon } from '@/app/ui-components/icons/twitter-icon'
import { useWindowDimensions } from '@/hooks/use-window-dimensions'

const TradeBlock = () => {
  const { width } = useWindowDimensions()
  const isMobileWidth = width < 1100

  return (
    <div className={styles['trade-block']}>
      <Typography className={styles['title']}>Trade now</Typography>

      <ul className={styles['list']}>
        <li className={styles.item}><BBIcon size='40' /></li>
        <li className={styles.item}><MaestroIcon size='40' /></li>
        <li className={styles.item}><PhotonIcon size='40' /></li>
        <li className={styles.item}><BullxIcon size='40' /></li>
        <li className={styles.item}> <BonkIcon size='40' /></li>
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