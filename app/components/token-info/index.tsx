'use client'

import { useStore } from "@/store"
import styles from './styles.module.scss'
import { Typography } from "@/app/ui-components/typography"
import { convertToBillions } from "@/lib/convert-to-billions"
import { convertToMillions } from "@/lib/convert-to-millions"
import { PriceChangePercentage, Resolution } from "@/types/bubbles.type"
import { useEffect, useState } from "react"
import { useWindowDimensions } from "@/hooks/use-window-dimensions"
import cn from 'classnames'

const TokenInfo = () => {
  const { chosenToken, resolution, modalResolution } = useStore()
  const [resolutions, setResolutions] = useState(PriceChangePercentage.HOUR)
  const { width } = useWindowDimensions()

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
        <img
          loading='lazy'
          src={chosenToken.token.info.imageSmallUrl}
          alt={chosenToken.token.name}
          className={styles['token-image']}
        />

        <div className={styles['token-item']} >
          <Typography
            variant="body2">
            {width > 430
              ? `${chosenToken.token.name.length > 10
                ? chosenToken.token.name.slice(0, 10) + '...'
                : chosenToken.token.name} (${chosenToken.token.symbol})`
              : `(${chosenToken.token.symbol})`
            }
          </Typography>

          <Typography
            variantWeight='medium'
            variant="body2"
            color={chosenToken[resolutions] > 0 ? 'green' : 'red'}
          >
            {`$${Number(chosenToken.priceUSD)?.toFixed(8)} (${chosenToken[resolution].toFixed(2)}%)`}
          </Typography>
        </div>
      </div>

      <div className={styles['token-info-items']}>
        <div className={styles['token-item']}>
          <Typography variant='body2' variantWeight='medium' className={styles.font}>
            Market Cap
          </Typography>

          <Typography className={styles.font}>
            {`$${convertToBillions(chosenToken.marketCap)}`}
          </Typography>
        </div>

        <div className={styles['token-item']}>
          <Typography variant='body2' variantWeight='medium' className={styles.font}>
            Total Supply
          </Typography>

          <Typography className={styles.font}>
            {`$${convertToBillions(+chosenToken.token.totalSupply)}`}
          </Typography>
        </div>

        <div className={styles['token-item']}>
          <Typography variant='body2' variantWeight='medium' className={styles.font}>
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