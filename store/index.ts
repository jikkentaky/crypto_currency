import { create } from 'zustand'
import { Network } from '@/types/network.type'
import { Resolution, PriceChange } from '@/types/bubbles.type'
import { CoingeckoCoinData } from '@/types/coingecko.type'

interface UseStore {
  topTokensList: CoingeckoCoinData[] | null
  searchCoin: string
  searchNetwork: string
  resolution: PriceChange
  modalResolution: Resolution
  isOpenModal: boolean
  isOpenMobileMenu: boolean
  chosenToken: CoingeckoCoinData | null
  networkList: Network[] | null
  selectedModalResolution: Resolution
  isOpenMobileTimeFrame: boolean
  currentResolution: PriceChange
  setCurrentResolution: (currentResolution: PriceChange) => void
  setIsOpenMobileTimeFrame: (isOpenMobileTimeFrame: boolean) => void
  setSelectedModalResolution: (selectedModalResolution: Resolution) => void
  setNetworkList: (networkList: Network[]) => void
  setIsOpenMobileMenu: (isOpenMobileMenu: boolean) => void
  setModalResolution: (resolution: Resolution) => void
  setChosenToken: (tokenId: string) => void
  setIsOpenModal: (isOpenModal: boolean) => void
  setResolution: (resolution: PriceChange) => void
  setTopTokensList: (topTokensList: CoingeckoCoinData[]) => void
  setSearchCoin: (searchCoin: string) => void
  setSearchNetwork: (searchNetwork: string) => void
}

export const useStore = create<UseStore>()((set, get) => ({
  currentResolution: PriceChange.HOUR,
  isOpenMobileTimeFrame: false,
  isOpenMobileMenu: false,
  topTokensList: null,
  resolution: PriceChange.HOUR,
  modalResolution: Resolution.HOUR,
  networkList: null,
  searchCoin: '',
  searchNetwork: '',
  isOpenModal: false,
  chosenToken: null,
  selectedModalResolution: Resolution.HOUR,
  setChosenToken: (tokenId) => {
    const { topTokensList } = get()
    if (topTokensList) {
      const chosenToken = topTokensList.find(token => token.id === tokenId)
      set({ chosenToken })
    }
  },
  setCurrentResolution: (currentResolution) => set({ currentResolution }),
  setIsOpenMobileTimeFrame: (isOpenMobileTimeFrame) => set({ isOpenMobileTimeFrame }),
  setSelectedModalResolution: (selectedModalResolution) => set({ selectedModalResolution }),
  setIsOpenMobileMenu: (isOpenMobileMenu) => set({ isOpenMobileMenu }),
  setNetworkList: (networkList) => set({ networkList }),
  setIsOpenModal: (isOpenModal) => set({ isOpenModal }),
  setResolution: (resolution) => set({ resolution }),
  setModalResolution: (modalResolution) => set({ modalResolution }),
  setTopTokensList: (topTokensList) => set({ topTokensList }),
  setSearchNetwork: (searchNetwork) => set({ searchNetwork }),
  setSearchCoin: (searchCoin) => set({ searchCoin }),
}))