/**
 * Dynamic imports configuration for code splitting
 * Reduces initial bundle size by loading components on demand
 */

import dynamic from "next/dynamic"

// Heavy components that benefit from lazy loading
export const dynamicComponents = {
  // Contact & Forms
  ContactForm: dynamic(() => import("@/components/contact-form"), {
    loading: () => null,
  }),
  EmploymentForm: dynamic(() => import("@/components/employment-form"), {
    loading: () => null,
  }),
  LeadQualifier: dynamic(() => import("@/components/lead-qualifier"), {
    loading: () => null,
  }),

  // Listings & Filters
  PropertyGrid: dynamic(() => import("@/components/property-grid"), {
    loading: () => null,
  }),
  PropertyFilters: dynamic(() => import("@/components/property-filters"), {
    loading: () => null,
  }),

  // Analytics
  AnalyticsProvider: dynamic(
    () =>
      import("@/components/analytics-provider").catch(() => ({
        default: () => null,
      })),
    {
      ssr: false,
    }
  ),
}

/**
 * Prefetch strategy helper
 * Use in Next.js Link component: <Link prefetch={shouldPrefetch(isSlowConnection)}>
 */
export function shouldPrefetch(slowConnection?: boolean): boolean {
  if (typeof window === "undefined") return false

  // Check for slow connection
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
  if (slowConnection || (connection?.saveData && connection?.effectiveType === "4g")) {
    return false
  }

  return true
}

/**
 * Partial hydration strategy for islands architecture
 * Marks which components need immediate interactivity vs delayed
 */
export const hydrationPriority = {
  critical: ["Navbar", "SearchBar", "PropertyFilters", "Pagination"],
  high: ["ContactForm", "PropertyGrid", "EmploymentForm"],
  low: ["Newsletter", "Footer", "CookieBanner"],
  deferred: ["LeadQualifier", "MapEmbed", "Analytics"],
}
