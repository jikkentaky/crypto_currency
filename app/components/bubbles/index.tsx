import { FC } from 'react'


import { Bubbles } from './bubbles'
import { TokenFilterResult } from '@/types/tokenFilterResultType.type'

type Props = {
  coins: TokenFilterResult[]
}

const BubblesPage: FC<Props> = ({ coins }) => {
  return <Bubbles coins={coins} />
}

export { BubblesPage }
