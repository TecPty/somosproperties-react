"use client"

import { useEffect, useState } from "react"
import ConsentBannerContent from "@/components/consent-banner-content"

export default function ConsentBannerWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <ConsentBannerContent />
}
