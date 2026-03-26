"use client"

import { useEffect, useState } from "react"
import { ConsentProvider } from "@/hooks/use-consent-manager"
import dynamic from "next/dynamic"

const ConsentBanner = dynamic(() => import("@/components/consent-banner"), {
  ssr: false,
})

export default function ConsentWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <ConsentProvider>
      <ConsentBanner />
    </ConsentProvider>
  )
}
