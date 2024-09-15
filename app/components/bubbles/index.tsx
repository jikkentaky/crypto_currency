'use client'

import { FC, useEffect, useState } from 'react'
import { Bubbles } from './bubbles'
import { getFilterTokens } from '@/app/api/lib'
import { useStore } from '@/store'
import { Loader } from '@/app/ui-components/loader'
import { appConfig } from '@/lib/bubbles.utils'
const { height } = appConfig

const BubblesPage: FC = () => {
  const { chosenNetwork, topTokensList, setTopTokensList } = useStore()
  const [isLoading, setIsLoading] = useState(false)


  const fetchCoins = async () => {
    setIsLoading(true)
    try {
      const coins = await getFilterTokens(chosenNetwork.id)

      if (!coins) return

      console.log("🚀 ~ fetchCoins ~ coins:", coins)
      setTopTokensList(coins)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCoins()
  }, [chosenNetwork.id])


  return (!isLoading && topTokensList ?
    <Bubbles
      coins={topTokensList.slice(0, 70)}
    />
    : <Loader height={height} />
  )
}

export { BubblesPage }
