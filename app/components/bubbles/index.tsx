'use client'

import { FC, useEffect, useState } from 'react'
import { Bubbles } from './bubbles'
import { getFilterTokens } from '@/app/api/lib'
import { useStore } from '@/store'

const BubblesPage: FC = () => {
  const { chosenNetwork, topTokensList, setTopTokensList } = useStore()
  const [isLoading, setIsLoading] = useState(false)

  const fetchCoins = async () => {
    setIsLoading(true)
    try {
      const coins = await getFilterTokens(chosenNetwork.id)

      if (!coins) return

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


  return (topTokensList &&
    <Bubbles
      coins={topTokensList}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  )
}

export { BubblesPage }
