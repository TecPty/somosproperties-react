"use client"

import { useEffect } from "react"
import { initFacebookPixel, trackPageView } from "@/lib/facebook-pixel"

export default function FacebookPixelProvider() {
  useEffect(() => {
    initFacebookPixel()
    trackPageView()
  }, [])

  return null
}
