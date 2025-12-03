"use client"

import { useState, useCallback } from "react"
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

  const updateFilters = useCallback(
    (newFilters: Partial<PropertyFilters>) => {
      setFilters((prev) => {
        const updated = { ...prev, ...newFilters }

        // Update URL
        const params = new URLSearchParams()
        Object.entries(updated).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
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

        return updated
      })
    },
    [router, pathname],
  )

  const clearFilters = useCallback(() => {
    const clearedFilters = initialFilters || {}
    setFilters(clearedFilters)

    // Keep only initial filters in URL
    const params = new URLSearchParams()
    if (initialFilters) {
      Object.entries(initialFilters).forEach(([key, value]) => {
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
    }

    const queryString = params.toString()
    router.replace(`${pathname}${queryString ? `?${queryString}` : ""}`, { scroll: false })
  }, [router, pathname, initialFilters])

  return {
    filters,
    updateFilters,
    clearFilters,
  }
}
