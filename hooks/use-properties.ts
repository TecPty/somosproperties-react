"use client"

import { useState, useEffect, useMemo } from "react"
import type { Property, PropertyFilters } from "@/lib/types"
import { properties as allPropertiesData } from "@/lib/properties"

export function useProperties(filters?: PropertyFilters, itemsPerPage = 12) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<"price" | "date" | "featured">("featured")

  const allProperties: Property[] = allPropertiesData

  const filteredProperties = useMemo(() => {
    const normalizeValue = (value?: string | null) =>
      (value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    const resolveComparablePrice = (p: Property, operationFilter?: PropertyFilters["operation"]) => {
      if (operationFilter === "Venta") return p.price || 0
      if (operationFilter === "Alquiler") return p.pricePerMonth || 0
      if (operationFilter === "Venta/Alquiler") return p.pricePerMonth || p.price || 0

      if (p.operation === "Venta") return p.price || 0
      if (p.operation === "Alquiler") return p.pricePerMonth || 0
      return p.pricePerMonth || p.price || 0
    }

    let filtered = allProperties.filter((p) => !p.hidden)

    if (!filters) return filtered

    // Filter by operation
    if (filters.operation) {
      if (filters.operation === "Venta") {
        filtered = filtered.filter((p) => p.operation === "Venta" || p.operation === "Venta/Alquiler")
      } else if (filters.operation === "Alquiler") {
        filtered = filtered.filter((p) => p.operation === "Alquiler" || p.operation === "Venta/Alquiler")
      } else {
        filtered = filtered.filter((p) => p.operation === "Venta/Alquiler")
      }
    }

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category)
    }

    // Filter by types
    if (filters.types && filters.types.length > 0) {
      filtered = filtered.filter((p) => filters.types!.includes(p.type))
    }

    // Filter by price
    if (filters.priceMin !== undefined) {
      filtered = filtered.filter((p) => resolveComparablePrice(p, filters.operation) >= filters.priceMin!)
    }
    if (filters.priceMax !== undefined) {
      filtered = filtered.filter((p) => resolveComparablePrice(p, filters.operation) <= filters.priceMax!)
    }

    // Filter by bedrooms
    if (filters.bedrooms !== undefined && filters.bedrooms > 0) {
      filtered = filtered.filter((p) => p.bedrooms >= filters.bedrooms!)
    }

    // Filter by location
    if (filters.location) {
      const locationNeedle = normalizeValue(filters.location)
      filtered = filtered.filter(
        (p) =>
          normalizeValue(p.district).includes(locationNeedle) ||
          normalizeValue(p.location).includes(locationNeedle),
      )
    }

    // Filter by search
    if (filters.search) {
      const searchLower = normalizeValue(filters.search).trim()
      const tokens = searchLower.split(/\s+/).filter((token) => token.length >= 2)
      if (tokens.length > 0) {
        filtered = filtered.filter((p) => {
          const haystack = normalizeValue(
            `${p.title} ${p.location} ${p.description} ${p.type} ${p.district} ${p.city}`,
          )
          return tokens.every((token) => haystack.includes(token))
        })
      }
    }

    return filtered
  }, [allProperties, filters])

  const sortedProperties = useMemo(() => {
    const resolveComparablePrice = (p: Property, operationFilter?: PropertyFilters["operation"]) => {
      if (operationFilter === "Venta") return p.price || 0
      if (operationFilter === "Alquiler") return p.pricePerMonth || 0
      if (operationFilter === "Venta/Alquiler") return p.pricePerMonth || p.price || 0

      if (p.operation === "Venta") return p.price || 0
      if (p.operation === "Alquiler") return p.pricePerMonth || 0
      return p.pricePerMonth || p.price || 0
    }

    const sorted = [...filteredProperties]

    switch (sortBy) {
      case "price":
        sorted.sort((a, b) => {
          const priceA = resolveComparablePrice(a, filters?.operation)
          const priceB = resolveComparablePrice(b, filters?.operation)
          return priceA - priceB
        })
        break
      case "date":
        sorted.sort((a, b) => b.builtYear - a.builtYear)
        break
      case "featured":
        sorted.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return 0
        })
        break
    }

    return sorted
  }, [filteredProperties, sortBy, filters?.operation])

  const totalPages = Math.ceil(sortedProperties.length / itemsPerPage)
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return sortedProperties.slice(start, end)
  }, [sortedProperties, currentPage, itemsPerPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  return {
    properties: paginatedProperties,
    allProperties: sortedProperties,
    totalProperties: sortedProperties.length,
    currentPage,
    totalPages,
    setCurrentPage,
    sortBy,
    setSortBy,
  }
}
