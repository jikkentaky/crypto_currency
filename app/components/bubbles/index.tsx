'use client'

import Bubbles from './bubbles'
import { Loader } from '@/app/ui-components/loader'
import { UseCoins } from '@/hooks/use-coins'

export default function BubblesPage() {
  const { topTokensList, isLoading } = UseCoins()

  return (
    <>
      {!isLoading && topTokensList
        ? (<Bubbles coins={topTokensList} />)
        : (<Loader height={'100vh'} />)}
    </>
  )
}
