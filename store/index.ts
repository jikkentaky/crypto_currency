import { create } from 'zustand'
import { Network } from '@/types/network.type'
import { SORTING_BY, Resolution } from '@/types/bubbles.type'
import { TokenFilterResultType } from '@/types/tokenFilterResultType.type'
import { SORT_BY } from '@/types/sort-by.enum'

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
  sortBy: SORT_BY
  setSortBy: (sortBy: SORT_BY) => void
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
  sortBy: 'PRICE_CHANGE' as SORT_BY,
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
  setIsOpenMobileTimeFrame: (isOpenMobileTimeFrame) => set({ isOpenMobileTimeFrame }),
  setSortBy: (sortBy) => {
    const { setResolution } = get()
    if (sortBy === 'PRICE_CHANGE' as SORT_BY) {
      setResolution(SORTING_BY.HOUR)
    }

    if (sortBy === 'VOLUME' as SORT_BY) {
      setResolution(SORTING_BY.VOLUME_24)
    }

    if (sortBy === 'LIQUIDITY' as SORT_BY) {
      setResolution(SORTING_BY.LIQUIDITY)
    }

    if (sortBy === 'MCAP' as SORT_BY) {
      setResolution(SORTING_BY.MCAP)
    }

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