import { create } from 'zustand'
import { Network } from '@/types/network.type'
import { SORTING_BY, Resolution, PriceChange } from '@/types/bubbles.type'
import { TokenFilterResultType } from '@/types/tokenFilterResultType.type'

interface UseStore {
  topTokensList: TokenFilterResultType[] | null
  chosenNetwork: Network
  searchCoin: string
  searchNetwork: string
  resolution: SORTING_BY | Resolution
  modalResolution: Resolution
  isLoading: boolean
  isOpenModal: boolean
  isOpenMobileMenu: boolean
  chosenToken: TokenFilterResultType | null
  isNetworks: boolean
  networkList: Network[] | null
  selectedModalResolution: Resolution
  isOpenMobileTimeFrame: boolean
  sortBy: SORTING_BY
  currentResolution: PriceChange
  setCurrentResolution: (currentResolution: PriceChange) => void
  setSortBy: (sortBy: SORTING_BY) => void
  setIsOpenMobileTimeFrame: (isOpenMobileTimeFrame: boolean) => void
  setSelectedModalResolution: (selectedModalResolution: Resolution) => void
  setNetworkList: (networkList: Network[]) => void
  setIsOpenMobileMenu: (isOpenMobileMenu: boolean) => void
  setIsNetworks: (isNetworks: boolean) => void
  setModalResolution: (resolution: Resolution) => void
  setChosenToken: (tokenAddress: string) => void
  setIsOpenModal: (isOpenModal: boolean) => void
  setIsLoading: (isLoading: boolean) => void
  setResolution: (resolution: SORTING_BY | Resolution) => void
  setTopTokensList: (topTokensList: TokenFilterResultType[]) => void
  setChosenNetwork: (network: Network) => void
  setSearchCoin: (searchCoin: string) => void
  setSearchNetwork: (searchNetwork: string) => void
}

export const useStore = create<UseStore>()((set, get) => ({
  currentResolution: PriceChange.HOUR,
  sortBy: SORTING_BY.DAY,
  isOpenMobileTimeFrame: false,
  isOpenMobileMenu: false,
  topTokensList: null,
  chosenNetwork: { id: 1, name: 'Ethereum', isVisible: true },
  resolution: SORTING_BY.HOUR,
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
  setSortBy: (sortBy) => {
    const { currentResolution, setResolution, setCurrentResolution } = get()
    if (sortBy === SORTING_BY.DAY) {
      setResolution(currentResolution as unknown as Resolution)
    } else {
      setResolution(sortBy)
    }
   
    setCurrentResolution(currentResolution)
    set({ sortBy })
  },
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