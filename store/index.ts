import { create } from 'zustand'
import { Resolution, PriceChange } from '@/types/bubbles.type'
import { CoingeckoCoinData } from '@/types/coingecko.type'

interface UseStore {
  topTokensList: CoingeckoCoinData[] | null
  searchCoin: string
  resolution: PriceChange
  modalResolution: Resolution
  isOpenModal: boolean
  chosenToken: CoingeckoCoinData | null
  selectedModalResolution: Resolution
  currentResolution: PriceChange
  setCurrentResolution: (currentResolution: PriceChange) => void
  setSelectedModalResolution: (selectedModalResolution: Resolution) => void
  setModalResolution: (resolution: Resolution) => void
  setChosenToken: (tokenId: string) => void
  setIsOpenModal: (isOpenModal: boolean) => void
  setResolution: (resolution: PriceChange) => void
  setTopTokensList: (topTokensList: CoingeckoCoinData[]) => void
  setSearchCoin: (searchCoin: string) => void
}

export const useStore = create<UseStore>()((set, get) => ({
  currentResolution: PriceChange.HOUR,
  topTokensList: null,
  resolution: PriceChange.HOUR,
  modalResolution: Resolution.HOUR,
  searchCoin: '',
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
  setSelectedModalResolution: (selectedModalResolution) => set({ selectedModalResolution }),
  setIsOpenModal: (isOpenModal) => set({ isOpenModal }),
  setResolution: (resolution) => set({ resolution }),
  setModalResolution: (modalResolution) => set({ modalResolution }),
  setTopTokensList: (topTokensList) => set({ topTokensList }),
  setSearchCoin: (searchCoin) => set({ searchCoin }),
}))