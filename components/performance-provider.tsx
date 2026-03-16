"use client"

import { useEffect } from "react"
import { initWebVitalsTracking } from "@/lib/performance"

/**
 * Performance monitoring provider
 * Initializes Web Vitals tracking and sends metrics to GA4
 */
export function PerformanceProvider() {
  useEffect(() => {
    // Initialize Web Vitals tracking
    initWebVitalsTracking()

    // Log performance metrics in development
    if (process.env.NODE_ENV === "development") {
      // Wait for page to fully load
      window.addEventListener("load", () => {
        setTimeout(() => {
          if (window.performance && window.performance.timing) {
            const navTiming = window.performance.timing
            console.group("📊 Performance Metrics")
            console.log("TTFB:", (navTiming.responseStart - navTiming.navigationStart).toFixed(0), "ms")
            console.log("FCP:", (navTiming.domContentLoadedEventStart - navTiming.navigationStart).toFixed(0), "ms")
            console.log("LCP: measured by Web Vitals")
            console.log("CLS: measured by Web Vitals")
            console.groupEnd()
          }
        }, 100)
      })
    }
  }, [])

  return null
}

export default PerformanceProvider
