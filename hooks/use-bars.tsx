import { getBars } from "@/app/api/lib"
import { useStore } from "@/store"
import { Bar } from "@/types/bar.type"
import { useEffect, useState } from "react"

const UseBars = () => {
  const { modalResolution, chosenToken } = useStore()

  const [data, setData] = useState<Bar[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchInitialData = async () => {
    if (!chosenToken) return
    setIsLoading(true)

    try {
      const data = await getBars(chosenToken.id, modalResolution)
      if (!data) return

      setData(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchInitialData()
  }, [modalResolution])

  return { data, isLoading }
}

export { UseBars }