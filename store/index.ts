import { create } from "zustand";
import { Resolution, PriceChange } from "@/types/bubbles.type";
import { CoingeckoCoinData } from "@/types/coingecko.type";

interface UseStore {
  topTokensList: CoingeckoCoinData[] | null;
  searchCoin: string;
  resolution: PriceChange;
  modalResolution: Resolution;
  chosenToken: CoingeckoCoinData | null;
  selectedModalResolution: Resolution;
  currentResolution: PriceChange;
  bubbleCount: number;
  setCurrentResolution: (currentResolution: PriceChange) => void;
  setSelectedModalResolution: (selectedModalResolution: Resolution) => void;
  setModalResolution: (resolution: Resolution) => void;
  setChosenToken: (tokenId: string) => void;
  setResolution: (resolution: PriceChange) => void;
  setTopTokensList: (topTokensList: CoingeckoCoinData[]) => void;
  setSearchCoin: (searchCoin: string) => void;
  setBubbleCount: (count: number) => void;
}

export const useStore = create<UseStore>()((set, get) => ({
  currentResolution: PriceChange.HOUR,
  topTokensList: null,
  resolution: PriceChange.HOUR,
  modalResolution: Resolution.HOUR,
  searchCoin: "",
  chosenToken: null,
  selectedModalResolution: Resolution.HOUR,
  bubbleCount: 100,
  setChosenToken: (tokenId) => {
    const { topTokensList } = get();

    if (topTokensList?.length) {
      const chosenToken = topTokensList.find((token) => token.id === tokenId);
      set({ chosenToken });
    }
  },
  setCurrentResolution: (currentResolution) => set({ currentResolution }),
  setSelectedModalResolution: (selectedModalResolution) =>
    set({ selectedModalResolution }),
  setResolution: (resolution) => set({ resolution }),
  setModalResolution: (modalResolution) => set({ modalResolution }),
  setTopTokensList: (topTokensList) => set({ topTokensList }),
  setSearchCoin: (searchCoin) => set({ searchCoin }),
  setBubbleCount: (bubbleCount) => set({ bubbleCount }),
}));
