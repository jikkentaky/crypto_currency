import { create } from 'zustand'
import { Network } from '@/types/network.type'
import { PriceChangePercentage, Resolution } from '@/types/bubbles.type'
import { TokenFilterResultType } from '@/types/tokenFilterResultType.type'

interface UseStore {
  topTokensList: TokenFilterResultType[] | null
  chosenNetwork: Network
  searchCoin: string
  searchNetwork: string
  resolution: PriceChangePercentage
  modalResolution: Resolution
  isLoading: boolean
  isOpenModal: boolean
  chosenToken: TokenFilterResultType | null
  isNetworks: boolean
  networkList: Network[] | null
  setNetworkList: (networkList: Network[]) => void
  setIsNetworks: (isNetworks: boolean) => void
  setModalResolution: (resolution: Resolution) => void
  setChosenToken: (tokenAddress: string) => void
  setIsOpenModal: (isOpenModal: boolean) => void
  setIsLoading: (isLoading: boolean) => void
  setResolution: (resolution: PriceChangePercentage) => void
  setTopTokensList: (topTokensList: TokenFilterResultType[]) => void
  setChosenNetwork: (network: Network) => void
  setSearchCoin: (searchCoin: string) => void
  setSearchNetwork: (searchNetwork: string) => void
}

export const useStore = create<UseStore>()((set, get) => ({
  topTokensList: null,
  chosenNetwork: { id: 1, name: 'Ethereum' },
  resolution: PriceChangePercentage.HOUR,
  modalResolution: Resolution.HOUR,
  networkList: null,
  searchCoin: '',
  searchNetwork: '',
  isLoading: false,
  isOpenModal: false,
  chosenToken: null,
  isNetworks: false,
  setChosenToken: (tokenAddress) => {
    const { topTokensList } = get()
    if (topTokensList) {
      const chosenToken = topTokensList.find(token => token.token.address === tokenAddress)
      set({ chosenToken })
    }
  },
  setNetworkList: (networkList) => set({ networkList }),
  setIsNetworks: (isNetworks) => set({ isNetworks }),
  setIsOpenModal: (isOpenModal) => set({ isOpenModal }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setResolution: (resolution) => set({ resolution }),
  setModalResolution: (modalResolution) => set({ modalResolution }),
  setTopTokensList: (topTokensList) => set({ topTokensList }),
  setChosenNetwork: (chosenNetwork) => set({ chosenNetwork }),
  setSearchNetwork: (searchNetwork) => set({ searchNetwork }),
  setSearchCoin: (searchCoin) => set({ searchCoin }),
}))