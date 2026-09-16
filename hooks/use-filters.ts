"use client"

import { useState, useCallback, useEffect } from "react"
import type { PropertyFilters } from "@/lib/types"
import { useSearchParams, usePathname } from "next/navigation"

const FILTER_KEYS = [
  "operation",
  "category",
  "types",
  "priceMin",
  "priceMax",
  "bedrooms",
  "location",
  "search",
  "tier",
] as const

/**
 * Compares two filter sets by meaning rather than by serialized shape.
 * `buildFiltersFromParams` emits keys in a fixed order while `updateFilters`
 * emits them in insertion order, so comparing JSON strings reported a
 * difference for identical filters and caused a redundant state write.
 * Array order is significant (`types` round-trips through the URL in order).
 */
function isSameFilters(a: PropertyFilters, b: PropertyFilters): boolean {
  return FILTER_KEYS.every((key) => {
    const left = a[key]
    const right = b[key]
    if (Array.isArray(left) || Array.isArray(right)) {
      const leftArray = Array.isArray(left) ? left : []
      const rightArray = Array.isArray(right) ? right : []
      return leftArray.length === rightArray.length && leftArray.every((v, i) => v === rightArray[i])
    }
    return (left ?? undefined) === (right ?? undefined)
  })
}

export function useFilters(initialFilters?: PropertyFilters) {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const buildFiltersFromParams = useCallback((): PropertyFilters => {
    // Initialize from URL params or initial filters
    const urlFilters: PropertyFilters = {}

    const operation = searchParams.get("operation")
    if (operation && (operation === "Venta" || operation === "Alquiler" || operation === "Venta/Alquiler")) {
      urlFilters.operation = operation
    } else if (initialFilters?.operation) {
      urlFilters.operation = initialFilters.operation
    }

    const category = searchParams.get("category")
    if (category && (category === "Residencial" || category === "Comercial")) {
      urlFilters.category = category
    } else if (initialFilters?.category) {
      urlFilters.category = initialFilters.category
    }

    const types = searchParams.get("types")
    if (types) {
      urlFilters.types = types.split(",")
    } else if (initialFilters?.types) {
      urlFilters.types = initialFilters.types
    }

    const priceMin = searchParams.get("priceMin")
    if (priceMin) urlFilters.priceMin = Number(priceMin)

    const priceMax = searchParams.get("priceMax")
    if (priceMax) urlFilters.priceMax = Number(priceMax)

    const bedrooms = searchParams.get("bedrooms")
    if (bedrooms) urlFilters.bedrooms = Number(bedrooms)

    const location = searchParams.get("location")
    if (location) urlFilters.location = location

    const search = searchParams.get("search")
    if (search) urlFilters.search = search

    return Object.keys(urlFilters).length > 0 ? urlFilters : initialFilters || {}
  }, [initialFilters, searchParams])

  const [filters, setFilters] = useState<PropertyFilters>(() => buildFiltersFromParams())

  const syncUrl = useCallback(
    (payload: PropertyFilters) => {
      const params = new URLSearchParams()
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            if (value.length > 0) {
              params.set(key, value.join(","))
            }
          } else {
            params.set(key, String(value))
          }
        }
      })
      const queryString = params.toString()
      const nextUrl = `${pathname}${queryString ? `?${queryString}` : ""}`

      if (typeof window === "undefined") return
      // Nothing to persist: the address bar already says this.
      if (`${window.location.pathname}${window.location.search}` === nextUrl) return

      // Native History API instead of router.replace. Filters are applied
      // entirely on the client (the listing routes read no searchParams on the
      // server), so a router navigation would refetch the RSC payload and
      // replace the filter subtree mid-interaction, dropping the next click.
      // Next's History API integration keeps useSearchParams in sync without
      // that navigation.
      window.history.replaceState(null, "", nextUrl)
    },
    [pathname],
  )

  const updateFilters = useCallback((newFilters: Partial<PropertyFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }, [])

  const clearFilters = useCallback(() => {
    const clearedFilters = initialFilters || {}
    setFilters(clearedFilters)
  }, [initialFilters])

  // Sync URL when filters change
  useEffect(() => {
    syncUrl(filters)
  }, [filters, syncUrl])

  // Sync state when URL params change (e.g., navbar dropdown links).
  useEffect(() => {
    const nextFilters = buildFiltersFromParams()
    setFilters((prev) => (isSameFilters(prev, nextFilters) ? prev : nextFilters))
  }, [buildFiltersFromParams])

  return {
    filters,
    updateFilters,
    clearFilters,
  }
}
