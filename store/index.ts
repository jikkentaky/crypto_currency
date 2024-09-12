import { create } from 'zustand'
import { Network } from '@/types/network.type'
import { PriceChangePercentage } from '@/types/bubbles.type'
import { TokenFilterResultType } from '@/types/tokenFilterResultType.type'


interface UseStore {
  topTokensList: TokenFilterResultType[] | null
  chosenNetwork: Network
  searchCoin: string
  searchNetwork: string
  resolution: PriceChangePercentage
  setResolution: (resolution: PriceChangePercentage) => void
  setTopTokensList: (topTokensList: TokenFilterResultType[]) => void
  setChosenNetwork: (network: Network) => void
  setSearchCoin: (searchCoin: string) => void
  setSearchNetwork: (searchNetwork: string) => void
}

export const useStore = create<UseStore>()((set) => ({
  topTokensList: null,
  chosenNetwork: { id: 1, name: 'Ethereum' },
  resolution: PriceChangePercentage.HOUR,
  searchCoin: '',
  searchNetwork: '',
  setResolution: (resolution) => set(() => ({ resolution })),
  setTopTokensList: (topTokensList) => set(() => ({ topTokensList })),
  setChosenNetwork: (chosenNetwork) => set(() => ({ chosenNetwork })),
  setSearchNetwork: (searchNetwork) => set(() => ({ searchNetwork })),
  setSearchCoin: (searchCoin) => set(() => ({ searchCoin })),
}))
