"use client";

import { useStore } from "@/store";
import Bubbles from "./bubbles";
import { useEffect } from "react";
import { getFilterTokens } from "@/app/api/lib";
import { Loader } from "@/app/ui-components/loader";
import { ModalComponent } from "@/app/ui-components/modal";
import { ChartModalContent } from "@/app/components/chart-modal-content";
import { NetworksModalContent } from "@/app/components/networks-modal-content";
import { useWindowDimensions } from "@/hooks/use-window-dimensions";

export default function BubblesPage() {
  const {
    chosenNetwork,
    isLoading,
    topTokensList,
    isNetworks,
    setIsLoading,
    setTopTokensList
  } = useStore();
  const { width } = useWindowDimensions();

  useEffect(() => {
    const getCoins = async () => {
      setIsLoading(true);

      try {
        const coins = await getFilterTokens(chosenNetwork.id);

        if (!coins) return;

        const limitedCoins = width < 700
          ? coins.slice(0, 50)
          : coins;

        setTopTokensList(limitedCoins);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getCoins();
  }, [chosenNetwork.id, width]);

  return (
    <>
      {(isLoading || !topTokensList)
        ? <Loader height={'100vh'} />
        : (!isLoading && topTokensList) && <Bubbles key={chosenNetwork.id} coins={topTokensList} />}

      <ModalComponent>
        {!isNetworks
          ? <ChartModalContent />
          : <NetworksModalContent />
        }
      </ModalComponent>
    </>
  );
}
