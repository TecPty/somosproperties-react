"use client"

import { useEffect } from "react"
import { initFacebookPixel, trackPageView } from "@/lib/facebook-pixel"
import { initTikTokPixel } from "@/lib/tiktok-pixel"
import { initGoogleAds } from "@/lib/google-ads"
import { initLinkedInPixel } from "@/lib/linkedin-pixel"

export default function AnalyticsProvider() {
  useEffect(() => {
    // Defer pixel initialization para no bloquear LCP
    // Usar requestIdleCallback (con fallback a setTimeout)
    const initializePixels = () => {
      try {
        // Inicializar todos los píxeles (diferidos)
        initFacebookPixel()
        initTikTokPixel()
        initGoogleAds()
        initLinkedInPixel()
        
        // Rastrear page view inicial para Facebook
        trackPageView()
      } catch (error) {
        console.error("Analytics initialization error:", error)
      }
    }

    // Usar requestIdleCallback si está disponible (mejor práctica)
    // Si no, usar timeout de 3 segundos como fallback
    if ("requestIdleCallback" in window) {
      requestIdleCallback(initializePixels, { timeout: 3000 })
    } else {
      // Fallback para navegadores que no soportan requestIdleCallback
      setTimeout(initializePixels, 3000)
    }
  }, [])

  return null
}
