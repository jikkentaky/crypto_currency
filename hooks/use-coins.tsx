import { getFilterTokens } from "@/app/api/lib"
import { useStore } from "@/store"
import { useEffect, useState } from "react"

const UseCoins = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { topTokensList, setTopTokensList } =
    useStore()


  useEffect(() => {
    const getCoins = async () => {
      setIsLoading(true)

      try {
        const coins = await getFilterTokens()

        if (!coins) return

        setTopTokensList(coins)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    getCoins()
  }, [])

  return { isLoading, topTokensList }
}

export { UseCoins }