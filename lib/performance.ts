/**
 * Web Vitals and Performance Monitoring
 * Tracks Core Web Vitals: LCP, INP, CLS
 * Integrates with GA4 for analysis
 */

import { onCLS, onFCP, onLCP, onTTFB, onINP } from "web-vitals"

export interface PerformanceMetrics {
  lcp?: number // Largest Contentful Paint
  inp?: number // Interaction to Next Paint (replaces FID)
  cls?: number // Cumulative Layout Shift
  fcp?: number // First Contentful Paint
  ttfb?: number // Time to First Byte
}

/**
 * Send Web Vitals to Google Analytics
 */
export function reportWebVitals(metric: { name: string; id: string; value: number; rating: string }) {
  if (typeof window === "undefined") return

  // Send to Google Analytics
  if (window.gtag) {
    window.gtag("event", metric.name, {
      event_category: "Web Vitals",
      event_label: metric.id,
      value: Math.round(metric.value),
      event_callback: metric.rating === "good" ? () => {} : undefined,
    })
  }

  // Also log for debugging
  console.debug(`[Web Vitals] ${metric.name}:`, {
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
  })
}

/**
 * Initialize Web Vitals tracking
 * Call once on app initialization
 */
export function initWebVitalsTracking() {
  if (typeof window === "undefined") return

  // Track Core Web Vitals
  onLCP(reportWebVitals)
  onINP(reportWebVitals) // INP replaces FID
  onCLS(reportWebVitals)
  onFCP(reportWebVitals)
  onTTFB(reportWebVitals)
}

/**
 * Mark custom performance checkpoint
 */
export function markPerformance(name: string) {
  if (typeof window !== "undefined" && window.performance?.mark) {
    window.performance.mark(name)
    console.debug(`[Performance Mark] ${name}`)
  }
}

/**
 * Measure time between two marks
 */
export function measurePerformance(name: string, startMark: string, endMark: string) {
  if (typeof window !== "undefined" && window.performance?.measure) {
    try {
      window.performance.measure(name, startMark, endMark)
      const measure = window.performance.getEntriesByName(name)[0]
      console.debug(`[Performance Measure] ${name}: ${measure.duration.toFixed(2)}ms`)
      return measure.duration
    } catch (e) {
      console.warn(`Could not measure performance: ${name}`, e)
    }
  }
}

/**
 * Get current performance metrics snapshot
 */
export function getPerformanceSnapshot(): PerformanceMetrics {
  if (typeof window === "undefined") return {}

  const navigation = window.performance?.timing
  if (!navigation) return {}

  return {
    ttfb: navigation.responseStart - navigation.navigationStart,
    fcp: navigation.domContentLoadedEventEnd - navigation.navigationStart,
  }
}

/**
 * Log performance for debugging
 */
export function logPerformanceMetrics() {
  if (typeof window === "undefined") return
  if (process.env.NODE_ENV !== "development") return

  const metrics = getPerformanceSnapshot()
  console.table({
    "Time to First Byte (ms)": metrics.ttfb?.toFixed(0),
    "First Contentful Paint (ms)": metrics.fcp?.toFixed(0),
  })
}
