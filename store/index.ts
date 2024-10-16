import { create } from 'zustand'
import { Network } from '@/types/network.type'
import { Resolution, PriceChange } from '@/types/bubbles.type'
import { TokenFilterResultType } from '@/types/tokenFilterResultType.type'

interface UseStore {
  topTokensList: TokenFilterResultType[] | null
  chosenNetwork: Network
  searchCoin: string
  searchNetwork: string
  resolution: PriceChange
  modalResolution: Resolution
  isLoading: boolean
  isOpenModal: boolean
  isOpenMobileMenu: boolean
  chosenToken: TokenFilterResultType | null
  isNetworks: boolean
  networkList: Network[] | null
  selectedModalResolution: Resolution
  isOpenMobileTimeFrame: boolean
  currentResolution: PriceChange
  setCurrentResolution: (currentResolution: PriceChange) => void
  setIsOpenMobileTimeFrame: (isOpenMobileTimeFrame: boolean) => void
  setSelectedModalResolution: (selectedModalResolution: Resolution) => void
  setNetworkList: (networkList: Network[]) => void
  setIsOpenMobileMenu: (isOpenMobileMenu: boolean) => void
  setIsNetworks: (isNetworks: boolean) => void
  setModalResolution: (resolution: Resolution) => void
  setChosenToken: (tokenAddress: string) => void
  setIsOpenModal: (isOpenModal: boolean) => void
  setIsLoading: (isLoading: boolean) => void
  setResolution: (resolution: PriceChange) => void
  setTopTokensList: (topTokensList: TokenFilterResultType[]) => void
  setChosenNetwork: (network: Network) => void
  setSearchCoin: (searchCoin: string) => void
  setSearchNetwork: (searchNetwork: string) => void
}

export const useStore = create<UseStore>()((set, get) => ({
  currentResolution: PriceChange.HOUR,
  isOpenMobileTimeFrame: false,
  isOpenMobileMenu: false,
  topTokensList: null,
  chosenNetwork: { id: 1, name: 'Ethereum', isVisible: true },
  resolution: PriceChange.HOUR,
  modalResolution: Resolution.HOUR,
  networkList: null,
  searchCoin: '',
  searchNetwork: '',
  isLoading: false,
  isOpenModal: false,
  chosenToken: null,
  isNetworks: false,
  selectedModalResolution: Resolution.HOUR,
  setChosenToken: (tokenAddress) => {
    const { topTokensList } = get()
    if (topTokensList) {
      const chosenToken = topTokensList.find(token => token.token.address === tokenAddress)
      set({ chosenToken })
    }
  },
  setCurrentResolution: (currentResolution) => set({ currentResolution }),
  setIsOpenMobileTimeFrame: (isOpenMobileTimeFrame) => set({ isOpenMobileTimeFrame }),
  setSelectedModalResolution: (selectedModalResolution) => set({ selectedModalResolution }),
  setIsOpenMobileMenu: (isOpenMobileMenu) => set({ isOpenMobileMenu }),
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