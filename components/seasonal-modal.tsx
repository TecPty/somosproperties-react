"use client"

import { useEffect, useState } from "react"
import ChristmasModal from "@/components/christmas-modal"
import ReyesModal from "@/components/reyes-modal"

export default function SeasonalModal() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
  }, [])

  if (!now) return null

  const month = now.getMonth()
  const day = now.getDate()

  const showChristmas = month === 11 || (month === 0 && day <= 1)
  const showReyes = month === 0 && day >= 2 && day <= 7

  if (showChristmas) return <ChristmasModal />
  if (showReyes) return <ReyesModal />

  return null
}
