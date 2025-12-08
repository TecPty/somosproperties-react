"use client"

import { useState, useCallback, useEffect } from "react"
import type { PropertyFilters } from "@/lib/types"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

export function useFilters(initialFilters?: PropertyFilters) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [filters, setFilters] = useState<PropertyFilters>(() => {
    // Initialize from URL params or initial filters
    const urlFilters: PropertyFilters = {}

    const operation = searchParams.get("operation")
    if (operation && (operation === "Venta" || operation === "Alquiler")) {
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
  })

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
      router.replace(`${pathname}${queryString ? `?${queryString}` : ""}`, { scroll: false })
    },
    [router, pathname],
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

  return {
    filters,
    updateFilters,
    clearFilters,
  }
}
