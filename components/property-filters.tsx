"use client"

import { useEffect, useMemo, useState } from "react"
import type { PropertyFilters } from "@/lib/types"
import { properties as allPropertiesData } from "@/lib/properties"

interface PropertyFiltersProps {
  filters: PropertyFilters
  onFiltersChange: (filters: Partial<PropertyFilters>) => void
  onClear: () => void
}

const stripAccents = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
const normalizeValue = (value: string) => stripAccents(value).toLowerCase()

export default function PropertyFiltersComponent({ filters, onFiltersChange, onClear }: PropertyFiltersProps) {
  const locations = useMemo(() => {
    const map = new Map<string, string>()
    for (const property of allPropertiesData) {
      const raw = (property.location || property.district || "").trim()
      if (!raw) continue
      const key = normalizeValue(raw)
      const existing = map.get(key)
      if (!existing) {
        map.set(key, raw)
        continue
      }
      if (existing.includes("?") && !raw.includes("?")) {
        map.set(key, raw)
        continue
      }
      if (stripAccents(existing) === existing && stripAccents(raw) !== raw) {
        map.set(key, raw)
      }
    }
    return Array.from(map.values()).sort((a, b) => a.localeCompare(b, "es"))
  }, [])

  const propertyTypes = useMemo(() => {
    const preferredOrder = ["Apartamento", "Casa", "Villa", "Local", "Oficina"]
    const set = new Set(
      allPropertiesData.map((property) => property.type).filter((type) => type && type !== "Terreno"),
    )

    const ordered = preferredOrder.filter((type) => set.has(type))
    const remaining = Array.from(set)
      .filter((type) => !preferredOrder.includes(type))
      .sort((a, b) => a.localeCompare(b, "es"))

    return [...ordered, ...remaining]
  }, [])

  const [draft, setDraft] = useState<PropertyFilters>(filters)

  useEffect(() => {
    setDraft(filters)
  }, [filters])

  const isDirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(filters), [draft, filters])

  const handleTypeToggle = (type: string) => {
    const currentTypes = draft.types || []
    const newTypes = currentTypes.includes(type) ? currentTypes.filter((t) => t !== type) : [...currentTypes, type]
    setDraft((prev) => ({ ...prev, types: newTypes }))
  }

  const handleApply = () => {
    onFiltersChange({
      operation: draft.operation,
      types: draft.types,
      priceMin: draft.priceMin,
      priceMax: draft.priceMax,
      bedrooms: draft.bedrooms,
      location: draft.location,
      category: draft.category,
      search: draft.search,
      tier: draft.tier,
    })
  }

  const handleClear = () => {
    onClear()
  }

  return (
    <aside className="bg-[#fafafa] border border-[#eeeeee] rounded-lg p-6 sticky top-20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[#222222]">Filtros</h3>
        <button onClick={handleClear} className="text-sm text-[#3898EC] hover:text-[#0082f3] transition-colors">
          Limpiar
        </button>
      </div>

      {/* Operation Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#333333] mb-3">Tipo de Operación</label>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="operation"
              value="Venta"
              checked={draft.operation === "Venta"}
              onChange={(e) => setDraft((prev) => ({ ...prev, operation: e.target.value as "Venta" }))}
              className="w-4 h-4 text-[#3898EC] border-[#cccccc] focus:ring-[#2895f7]"
            />
            <span className="ml-2 text-sm text-[#333333]">Venta</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="operation"
              value="Alquiler"
              checked={draft.operation === "Alquiler"}
              onChange={(e) => setDraft((prev) => ({ ...prev, operation: e.target.value as "Alquiler" }))}
              className="w-4 h-4 text-[#3898EC] border-[#cccccc] focus:ring-[#2895f7]"
            />
            <span className="ml-2 text-sm text-[#333333]">Alquiler</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="operation"
              value="Venta/Alquiler"
              checked={draft.operation === "Venta/Alquiler"}
              onChange={(e) => setDraft((prev) => ({ ...prev, operation: e.target.value as "Venta/Alquiler" }))}
              className="w-4 h-4 text-[#3898EC] border-[#cccccc] focus:ring-[#2895f7]"
            />
            <span className="ml-2 text-sm text-[#333333]">Venta/Alquiler</span>
          </label>
        </div>
      </div>

      {/* Property Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#333333] mb-3">Tipo de Propiedad</label>
        <div className="space-y-2">
          {propertyTypes.map((type) => (
            <label key={type} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={(draft.types || []).includes(type)}
                onChange={() => handleTypeToggle(type)}
                className="w-4 h-4 text-[#3898EC] border-[#cccccc] rounded focus:ring-[#2895f7]"
              />
              <span className="ml-2 text-sm text-[#333333]">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#333333] mb-3">Rango de Precio ($)</label>
        <div className="space-y-3">
          <input
            type="number"
            placeholder="Mínimo"
            value={draft.priceMin ?? ""}
            onChange={(e) =>
              setDraft((prev) => ({ ...prev, priceMin: e.target.value ? Number(e.target.value) : undefined }))
            }
            className="w-full px-4 py-2 border border-[#cccccc] rounded-lg focus:border-[#3898EC] focus:outline-2 focus:outline-[#2895f7] transition-colors placeholder:text-[#999999]"
          />
          <input
            type="number"
            placeholder="Máximo"
            value={draft.priceMax ?? ""}
            onChange={(e) =>
              setDraft((prev) => ({ ...prev, priceMax: e.target.value ? Number(e.target.value) : undefined }))
            }
            className="w-full px-4 py-2 border border-[#cccccc] rounded-lg focus:border-[#3898EC] focus:outline-2 focus:outline-[#2895f7] transition-colors placeholder:text-[#999999]"
          />
        </div>
      </div>

      {/* Bedrooms */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#333333] mb-3">Habitaciones</label>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => setDraft((prev) => ({ ...prev, bedrooms: prev.bedrooms === num ? undefined : num }))}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                draft.bedrooms === num
                  ? "bg-[#3898EC] text-white"
                  : "bg-white border border-[#cccccc] text-[#333333] hover:border-[#3898EC]"
              }`}
            >
              {num === 4 ? "4+" : num}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#333333] mb-3">Ubicación</label>
        <select
          value={draft.location || ""}
          onChange={(e) => setDraft((prev) => ({ ...prev, location: e.target.value || undefined }))}
          className="w-full px-4 py-2 border border-[#cccccc] rounded-lg focus:border-[#3898EC] focus:outline-2 focus:outline-[#2895f7] transition-colors bg-white text-[#333333]"
        >
          <option value="">Todas las ubicaciones</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* Apply Button */}
      <button
        onClick={handleApply}
        disabled={!isDirty}
        className="w-full bg-[#3898EC] text-white py-3 rounded-lg font-medium hover:bg-[#0082f3] transition-colors disabled:bg-[#eeeeee] disabled:text-[#999999] disabled:cursor-not-allowed"
      >
        Aplicar Filtros
      </button>
    </aside>
  )
}
