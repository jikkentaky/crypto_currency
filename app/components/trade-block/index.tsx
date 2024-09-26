import { Typography } from '@/app/ui-components/typography'
import styles from './styles.module.scss'
import { BBIcon, BonkIcon, BullxIcon, MaestroIcon, PhotonIcon } from '@/app/ui-components/icons'
import { TwitterIcon } from '@/app/ui-components/icons/twitter-icon'
import { useWindowDimensions } from '@/hooks/use-window-dimensions'

const TradeBlock = () => {
  const { width } = useWindowDimensions()

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

          <ul className={styles['social-list']}>
            <li><TwitterIcon /></li>
            <li><TwitterIcon /></li>
            <li><TwitterIcon /></li>
            <li><TwitterIcon /></li>
          </ul>
        </div>

        <Typography>
          ONDO is the governance token for Flux FInance and the Ondo DAO.
        </Typography>
      </div>
    </div>
  )
}
export { TradeBlock }