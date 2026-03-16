/**
 * Route prefetching strategy
 * Prefetch important navigation routes for faster navigation
 */

export const prefetchRoutes = {
  // High priority - always prefetch
  critical: ["/residenciales", "/comerciales", "/propiedades", "/contacto"],

  // Medium priority - prefetch on viewport intersection
  important: ["/premium", "/nosotros"],

  // Low priority - only prefetch on hovering link
  optional: ["/blog", "/privacidad"],
}

/**
 * Get prefetch priority based on route
 */
export function getPrefetchPriority(href: string): "high" | "low" | false {
  if (prefetchRoutes.critical.includes(href)) return "high"
  if (prefetchRoutes.important.includes(href)) return "low"
  return false
}

/**
 * Check for slow/restricted network
 */
export function shouldReducePrefetch(): boolean {
  if (typeof navigator === "undefined") return false

  const connection = (navigator as any).connection
  if (!connection) return false

  // Reduce prefetch on slow networks or data saver mode
  const slowConnection =
    connection.effectiveType === "slow-2g" ||
    connection.effectiveType === "2g" ||
    connection.effectiveType === "3g"

  const dataSaverMode = connection.saveData === true

  return slowConnection || dataSaverMode
}

/**
 * Intersection observer for lazy prefetching
 * Use in components to prefetch on intersection
 */
export function useLazyPrefetch(href: string) {
  if (typeof window === "undefined") return

  // Only works on modern browsers
  if (!("IntersectionObserver" in window)) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !shouldReducePrefetch()) {
          // Prefetch by creating a link tag
          const link = document.createElement("link")
          link.rel = "prefetch"
          link.href = href
          link.as = "document"
          document.head.appendChild(link)
        }
      })
    },
    { rootMargin: "50px" }
  )

  return observer
}
