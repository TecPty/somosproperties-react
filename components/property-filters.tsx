"use client"

import type { PropertyFilters } from "@/lib/types"

interface PropertyFiltersProps {
  filters: PropertyFilters
  onFiltersChange: (filters: Partial<PropertyFilters>) => void
  onClear: () => void
}

const locations = [
  "Costa del Este",
  "Casco Viejo",
  "Clayton",
  "Bella Vista",
  "San Francisco",
  "Punta Pacífica",
  "Albrook",
  "Tocumen",
  "Coronado",
]

const propertyTypes = ["Apartamento", "Casa", "Villa", "Local", "Oficina"]

export default function PropertyFiltersComponent({ filters, onFiltersChange, onClear }: PropertyFiltersProps) {
  const handleTypeToggle = (type: string) => {
    const currentTypes = filters.types || []
    const newTypes = currentTypes.includes(type) ? currentTypes.filter((t) => t !== type) : [...currentTypes, type]
    onFiltersChange({ types: newTypes })
  }

  return (
    <aside className="bg-[#fafafa] border border-[#eeeeee] rounded-lg p-6 sticky top-20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[#222222]">Filtros</h3>
        <button onClick={onClear} className="text-sm text-[#3898EC] hover:text-[#0082f3] transition-colors">
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
              checked={filters.operation === "Venta"}
              onChange={(e) => onFiltersChange({ operation: e.target.value as "Venta" })}
              className="w-4 h-4 text-[#3898EC] border-[#cccccc] focus:ring-[#2895f7]"
            />
            <span className="ml-2 text-sm text-[#333333]">Venta</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="operation"
              value="Alquiler"
              checked={filters.operation === "Alquiler"}
              onChange={(e) => onFiltersChange({ operation: e.target.value as "Alquiler" })}
              className="w-4 h-4 text-[#3898EC] border-[#cccccc] focus:ring-[#2895f7]"
            />
            <span className="ml-2 text-sm text-[#333333]">Alquiler</span>
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
                checked={(filters.types || []).includes(type)}
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
            value={filters.priceMin || ""}
            onChange={(e) => onFiltersChange({ priceMin: e.target.value ? Number(e.target.value) : undefined })}
            className="w-full px-4 py-2 border border-[#cccccc] rounded-lg focus:border-[#3898EC] focus:outline-2 focus:outline-[#2895f7] transition-colors placeholder:text-[#999999]"
          />
          <input
            type="number"
            placeholder="Máximo"
            value={filters.priceMax || ""}
            onChange={(e) => onFiltersChange({ priceMax: e.target.value ? Number(e.target.value) : undefined })}
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
              onClick={() => onFiltersChange({ bedrooms: filters.bedrooms === num ? undefined : num })}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                filters.bedrooms === num
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
          value={filters.location || ""}
          onChange={(e) => onFiltersChange({ location: e.target.value || undefined })}
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
        onClick={() => {}}
        className="w-full bg-[#3898EC] text-white py-3 rounded-lg font-medium hover:bg-[#0082f3] transition-colors"
      >
        Aplicar Filtros
      </button>
    </aside>
  )
}
