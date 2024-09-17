"use client";

import { useStore } from "@/store";
import Bubbles from "./bubbles";
import { useEffect } from "react";
import { getFilterTokens } from "@/app/api/lib";
import { Loader } from "@/app/ui-components/loader";

export default function BubblesPage() {
  const { chosenNetwork, isLoading, topTokensList, setIsLoading, setTopTokensList } = useStore()

  useEffect(() => {
    const getCoins = async () => {
      setIsLoading(true)

      try {
        const coins = await getFilterTokens(chosenNetwork.id)

        if (!coins) return

        setTopTokensList(coins)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    getCoins()
  }, [chosenNetwork.id])

  return (
    (isLoading || !topTokensList) ? <Loader height={720} /> : (!isLoading && topTokensList) && <Bubbles key={chosenNetwork.id} coins={topTokensList} />
  );;
}
