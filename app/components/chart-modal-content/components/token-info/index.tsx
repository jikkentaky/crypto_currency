'use client'

import { useStore } from "@/store"
import styles from './styles.module.scss'
import { Typography } from "@/app/ui-components/typography"
import { convertNumber } from "@/lib/convert-number"
import Image from "next/image"
import { formatTokenPrice } from "@/lib/format-token-price"
import { formatPercentage } from "@/lib/format-percentage"

const TokenInfo = () => {
  const { chosenToken, resolution } = useStore()
  const value = chosenToken?.[resolution];

  return (
    chosenToken && value && <div className={styles['token-info']}>
      <div className={styles['token-image-wrapper']}>
        <Image
          loading='lazy'
          src={chosenToken.image}
          width={40}
          height={40}
          alt={chosenToken.name}
          className={styles['token-image']}
        />

        <div className={styles['token-price']} >
          <Typography>
            {`${chosenToken.name} (${chosenToken.symbol})`}
          </Typography>

          <Typography
            variantWeight='medium'
            color={value > 0 ? 'green' : 'red'}
          >
            {`$${formatTokenPrice(chosenToken.current_price)} (${formatPercentage(+value!)}%)`}
          </Typography>
        </div>
      </div>

      <div className={styles['token-info-items']}>
        <div className={styles['token-item']}>
          <Typography variantWeight='medium' className={styles.font}>
            Market Cap
          </Typography>

          <Typography className={styles.font}>
            {`$${convertNumber(chosenToken.market_cap)}`}
          </Typography>
        </div>

        <div className={styles['token-item']}>
          <Typography variantWeight='medium' className={styles.font}>
            Total Supply
          </Typography>

          <Typography className={styles.font}>
            {`$${convertNumber(+chosenToken.total_supply)}`}
          </Typography>
        </div>

        <div className={styles['token-item']}>
          <Typography variantWeight='medium' className={styles.font}>
            Total Volume
          </Typography>

          <Typography className={styles.font}>
            {`$${convertNumber(+chosenToken.total_volume)}`}
          </Typography>
        </div>
      </div>
    </div >
  )
}

export { TokenInfo }