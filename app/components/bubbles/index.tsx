'use client'

import { FC, useEffect, useState } from 'react'
import { Bubbles } from './bubbles'
import { TokenFilterResultType } from '@/types/tokenFilterResultType.type'
import { getFilterTokens } from '@/app/api/lib'
import { useStore } from '@/store'

const BubblesPage: FC = () => {
  const { chosenNetwork } = useStore()
  const [coinsList, setCoinsList] = useState<TokenFilterResultType[] | null>(null)

  const fetchCoins = async () => {
    try {
      const coins = await getFilterTokens(chosenNetwork.id)
      if (!coins) return

      setCoinsList(coins)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCoins()
  }, [chosenNetwork.id])


  return (coinsList && <Bubbles coins={coinsList} />)
}

export { BubblesPage }
