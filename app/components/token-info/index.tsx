'use client'

import { useStore } from "@/store"
import styles from './styles.module.scss'
import { Typography } from "@/app/ui-components/typography"
import { convertToBillions } from "@/lib/convertToBillions"
import { convertToMillions } from "@/lib/convertToMillions"
import { PriceChangePercentage, Resolution } from "@/types/bubbles.type"
import { useEffect, useState } from "react"
import Image from 'next/image'

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
        <img
          loading='lazy'
          src={chosenToken.token.info.imageSmallUrl}
          alt={chosenToken.token.name}
          className={styles['token-image']}
        />

        <div className={styles['token-item']}>
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

      <div className={styles['token-item']}>
        <Typography variant='body2' variantWeight='medium'>
          Market Cap
        </Typography>

        <Typography >
          {`$${convertToBillions(chosenToken.marketCap)}`}
        </Typography>
      </div>

      <div className={styles['token-item']}>
        <Typography variant='body2' variantWeight='medium'>
          Total Supply
        </Typography>

        <Typography >
          {`$${convertToBillions(+chosenToken.token.totalSupply)}`}
        </Typography>
      </div>

      <div className={styles['token-item']}>
        <Typography variant='body2' variantWeight='medium'>
          24H Vol
        </Typography>

        <Typography >
          {`$${convertToMillions(chosenToken.marketCap)}`}
        </Typography>
      </div>
    </div>
  )
}

export { TokenInfo }