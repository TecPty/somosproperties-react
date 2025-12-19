"use client"

import { useEffect } from "react"
import { initFacebookPixel, trackPageView } from "@/lib/facebook-pixel"
import { initTikTokPixel } from "@/lib/tiktok-pixel"
import { initGoogleAds } from "@/lib/google-ads"
import { initLinkedInPixel } from "@/lib/linkedin-pixel"

export default function AnalyticsProvider() {
  useEffect(() => {
    // Inicializar todos los píxeles
    initFacebookPixel()
    initTikTokPixel()
    initGoogleAds()
    initLinkedInPixel()
    
    // Rastrear page view inicial para Facebook
    trackPageView()
  }, [])

  return null
}
