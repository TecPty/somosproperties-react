"use client"

import { useState, useEffect, useMemo } from "react"
import type { Property, PropertyFilters } from "@/lib/types"
import propertiesData from "@/data/properties.json"

export function useProperties(filters?: PropertyFilters, itemsPerPage = 12) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<"price" | "date" | "featured">("featured")

  const allProperties: Property[] = propertiesData.properties

  const filteredProperties = useMemo(() => {
    let filtered = [...allProperties]

    if (!filters) return filtered

    // Filter by operation
    if (filters.operation) {
      filtered = filtered.filter((p) => p.operation === filters.operation)
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
      filtered = filtered.filter((p) => {
        const price = p.operation === "Venta" ? p.price : p.pricePerMonth || 0
        return price >= filters.priceMin!
      })
    }
    if (filters.priceMax !== undefined) {
      filtered = filtered.filter((p) => {
        const price = p.operation === "Venta" ? p.price : p.pricePerMonth || 0
        return price <= filters.priceMax!
      })
    }

    // Filter by bedrooms
    if (filters.bedrooms !== undefined && filters.bedrooms > 0) {
      filtered = filtered.filter((p) => p.bedrooms >= filters.bedrooms!)
    }

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter(
        (p) =>
          p.district.toLowerCase().includes(filters.location!.toLowerCase()) ||
          p.location.toLowerCase().includes(filters.location!.toLowerCase()),
      )
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.location.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.type.toLowerCase().includes(searchLower),
      )
    }

    return filtered
  }, [allProperties, filters])

  const sortedProperties = useMemo(() => {
    const sorted = [...filteredProperties]

    switch (sortBy) {
      case "price":
        sorted.sort((a, b) => {
          const priceA = a.operation === "Venta" ? a.price : a.pricePerMonth || 0
          const priceB = b.operation === "Venta" ? b.price : b.pricePerMonth || 0
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
  }, [filteredProperties, sortBy])

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
