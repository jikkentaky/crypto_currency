'use client'

import { useStore } from "@/store"
import styles from './styles.module.scss'
import { Typography } from "@/app/ui-components/typography"
import { convertNumber } from "@/lib/convert-number"
import Image from "next/image"
import { defaultPath } from "@/lib/config"
import { formatTokenPrice } from "@/lib/format-token-price"
import { formatPercentage } from "@/lib/format-percentage"
import { CopyButton } from "@/app/ui-components/copy-button"

const TokenInfo = () => {
  const { chosenToken, resolution } = useStore()
  let value = chosenToken?.[resolution];

  return (
    chosenToken && <div className={styles['token-info']}>
      <div className={styles['token-image-wrapper']}>
        <Image
          loading='lazy'
          src={chosenToken.token.info.imageSmallUrl || defaultPath}
          width={40}
          height={40}
          alt={chosenToken.token.name}
          className={styles['token-image']}
        />

        <div className={styles['token-price']} >
          <Typography>
            {`${chosenToken.token.name} (${chosenToken.token.symbol})`}
          </Typography>

          <CopyButton textToCopy={chosenToken.token.address} />

          <Typography
            variantWeight='medium'
            color={parseFloat(value!.toString()) > 0 ? 'green' : 'red'}
          >
            {`$${formatTokenPrice(chosenToken.priceUSD)} (${formatPercentage(+value!)}%)`}
          </Typography>
        </div>
      </div>

      <div className={styles['token-info-items']}>
        <div className={styles['token-item']}>
          <Typography variantWeight='medium' className={styles.font}>
            Market Cap
          </Typography>

          <Typography className={styles.font}>
            {`$${convertNumber(chosenToken.marketCap)}`}
          </Typography>
        </div>

        <div className={styles['token-item']}>
          <Typography variantWeight='medium' className={styles.font}>
            FDV
          </Typography>

          <Typography className={styles.font}>
            {`$${convertNumber(+chosenToken.fdv)}`}
          </Typography>
        </div>

        <div className={styles['token-item']}>
          <Typography variantWeight='medium' className={styles.font}>
            24H Vol
          </Typography>

          <Typography className={styles.font}>
            {`$${convertNumber(+chosenToken.volume24)}`}
          </Typography>
        </div>
      </div>
    </div >
  )
}

export { TokenInfo }