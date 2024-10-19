'use client'

import { useStore } from '@/store'
import Bubbles from './bubbles'
import { useEffect } from 'react'
import { getFilterTokens } from '@/app/api/lib'
import { Loader } from '@/app/ui-components/loader'
import { ModalComponent } from '@/app/ui-components/modal'
import { ChartModalContent } from '@/app/components/chart-modal-content'
import { NetworksModalContent } from '@/app/components/networks-modal-content'

export default function BubblesPage() {
  const { isLoading, topTokensList, isNetworks, setIsLoading, setTopTokensList } =
    useStore()

  useEffect(() => {
    const getCoins = async () => {
      setIsLoading(true)

      try {
        const coins = await getFilterTokens()

        if (!coins) return

        setTopTokensList(coins)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    getCoins()
  }, [])

  return (
    <>
      {isLoading || !topTokensList ? (
        <Loader height={'100vh'} />
      ) : (
        !isLoading && topTokensList && <Bubbles coins={topTokensList} />
      )}

      <ModalComponent>
        {!isNetworks ? <ChartModalContent /> : <NetworksModalContent />}
      </ModalComponent>
    </>
  )
}
