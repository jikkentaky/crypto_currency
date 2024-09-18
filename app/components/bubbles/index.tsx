"use client";

import { useStore } from "@/store";
import Bubbles from "./bubbles";
import { useEffect } from "react";
import { getFilterTokens } from "@/app/api/lib";
import { Loader } from "@/app/ui-components/loader";
import { ModalComponent } from "@/app/ui-components/modal";
import { TokenInfo } from "../token-info";
import { Chart } from "../chart";
import { TradeBlock } from "../trade-block";
import styles from './styles.module.scss';
import { SearchInput } from "@/app/ui-components/search-input";
import { SearchIcon } from "@/app/ui-components/icons";
import { Typography } from "@mui/material";

export default function BubblesPage() {
  const {
    chosenNetwork,
    isLoading,
    topTokensList,
    isNetworks,
    networkList,
    searchNetwork,
    setSearchNetwork,
    setIsLoading,
    setTopTokensList
  } = useStore()

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
    <>
      {(isLoading || !topTokensList)
        ? <Loader height={720} />
        : (!isLoading && topTokensList) && <Bubbles key={chosenNetwork.id} coins={topTokensList} />}

      <ModalComponent>
        {!isNetworks
          ? <>
            <TokenInfo />

            <Chart />

            <TradeBlock />
          </>
          : <>
            <div className={styles['search-block']}>
              <SearchInput
                label={<><SearchIcon /> Search</>}
                placeholder="Enter network..."
                onChange={setSearchNetwork}
                value={searchNetwork}
              />
            </div>

            <div className={styles['title-wrapper']}>
              <Typography>Network list</Typography>

              <button className={styles['show-all-button']}>SHOW ALL</button>
            </div>

            <div>
              {networkList?.map(({ id, name }) => (
                <button
                  key={id}
                  className={styles['network-button']}
                  onClick={() => { }}
                >
                  {name}
                </button>
              ))}
            </div>
          </>
        }
      </ModalComponent>
    </>
  );
}
