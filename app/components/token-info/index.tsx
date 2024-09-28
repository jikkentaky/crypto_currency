'use client'

import { useStore } from "@/store"
import styles from './styles.module.scss'
import { Typography } from "@/app/ui-components/typography"
import { convertToBillions } from "@/lib/convert-to-billions"
import { convertToMillions } from "@/lib/convert-to-millions"
import { PriceChangePercentage, Resolution } from "@/types/bubbles.type"
import { useEffect, useState } from "react"
import Image from "next/image"

const TokenInfo = () => {
  const { chosenToken, resolution, modalResolution } = useStore()
  const [resolutions, setResolutions] = useState(PriceChangePercentage.HOUR)

  useEffect(() => {
    getPriceChange(modalResolution)
  }, [modalResolution])

  if (!chosenToken) return

  const getPriceChange = (res: Resolution) => {
    switch (res) {
      case Resolution.HOUR:
        setResolutions(PriceChangePercentage.HOUR)

      case Resolution.FOUR_HOURS:
        setResolutions(PriceChangePercentage.FOUR_HOURS)

      case Resolution.TWELVE_HOURS:
        setResolutions(PriceChangePercentage.TWELVE_HOURS)

      case Resolution.DAY:
        setResolutions(PriceChangePercentage.DAY)

      default:
        setResolutions(PriceChangePercentage.HOUR)
    }
  }

  return (
    chosenToken && <div className={styles['token-info']}>
      <div className={styles['token-image-wrapper']}>
        <Image
          loading='lazy'
          src={chosenToken.token.info.imageSmallUrl || ''}
          width={40}
          height={40}
          alt={chosenToken.token.name}
          className={styles['token-image']}
        />

        <div className={styles['token-price']} >
          <Typography>
            {`${chosenToken.token.name} (${chosenToken.token.symbol})`}
          </Typography>

          <Typography
            variantWeight='medium'
            color={chosenToken[resolutions] > 0 ? 'green' : 'red'}
          >
            {`$${Number(chosenToken.priceUSD)?.toFixed(8)} (${chosenToken[resolution].toFixed(2)}%)`}
          </Typography>
        </div>
      </div>

      <div className={styles['token-info-items']}>
        <div className={styles['token-item']}>
          <Typography variantWeight='medium' className={styles.font}>
            Market Cap
          </Typography>

          <Typography className={styles.font}>
            {`$${convertToBillions(chosenToken.marketCap)}`}
          </Typography>
        </div>

        <div className={styles['token-item']}>
          <Typography variantWeight='medium' className={styles.font}>
            Total Supply
          </Typography>

          <Typography className={styles.font}>
            {`$${convertToBillions(+chosenToken.token.totalSupply)}`}
          </Typography>
        </div>

        <div className={styles['token-item']}>
          <Typography variantWeight='medium' className={styles.font}>
            24H Vol
          </Typography>

          <Typography className={styles.font}>
            {`$${convertToMillions(chosenToken.marketCap)}`}
          </Typography>
        </div>
      </div>
    </div >
  )
}

export { TokenInfo }