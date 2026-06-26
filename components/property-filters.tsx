"use client"

import { useMemo } from "react"
import { SlidersHorizontal, X } from "lucide-react"
import type { Property, PropertyFilters } from "@/lib/types"
import { properties as allPropertiesData } from "@/lib/properties"
import { useTranslations } from "next-intl"

interface PropertyFiltersProps {
  filters: PropertyFilters
  onFiltersChange: (filters: Partial<PropertyFilters>) => void
  onClear: () => void
}

const stripAccents = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
const normalizeValue = (value: string) => stripAccents(value).toLowerCase()

const filterableTypes = ["Apartamento", "Bodega", "Casa", "Local", "Oficina", "Villa"] as const
type FilterableType = (typeof filterableTypes)[number]
const isFilterableType = (type: Property["type"] | undefined): type is FilterableType =>
  !!type && (filterableTypes as readonly string[]).includes(type)

/** Preset price-range buckets */
const PRICE_PRESETS_VENTA = [
  { label: "< $100k",    min: undefined, max: 100_000  },
  { label: "$100–250k",  min: 100_000,   max: 250_000  },
  { label: "$250–500k",  min: 250_000,   max: 500_000  },
  { label: "> $500k",    min: 500_000,   max: undefined },
]
const PRICE_PRESETS_ALQUILER = [
  { label: "< $800",     min: undefined, max: 800   },
  { label: "$800–1500",  min: 800,       max: 1500  },
  { label: "$1500–3000", min: 1500,      max: 3000  },
  { label: "> $3000",    min: 3000,      max: undefined },
]

function countActiveFilters(f: PropertyFilters): number {
  let n = 0
  if (f.operation)              n++
  if (f.types?.length)          n += f.types.length
  if (f.priceMin || f.priceMax) n++
  if (f.bedrooms)               n++
  if (f.location)               n++
  return n
}

export default function PropertyFiltersComponent({ filters, onFiltersChange, onClear }: PropertyFiltersProps) {
  const t = useTranslations('filters')
  const tCommon = useTranslations('common')
  
  const locations = useMemo(() => {
    const map = new Map<string, string>()
    for (const property of allPropertiesData) {
      const raw = (property.location || property.district || "").trim()
      if (!raw) continue
      const key = normalizeValue(raw)
      const existing = map.get(key)
      if (!existing) { map.set(key, raw); continue }
      if (existing.includes("?") && !raw.includes("?")) { map.set(key, raw); continue }
      if (stripAccents(existing) === existing && stripAccents(raw) !== raw) map.set(key, raw)
    }
    return Array.from(map.values()).sort((a, b) => a.localeCompare(b, "es"))
  }, [])

  const propertyTypes = useMemo(() => {
    const set = new Set<FilterableType>(
      allPropertiesData.map((p) => p.type).filter(isFilterableType)
    )
    const ordered = filterableTypes.filter((t) => set.has(t))
    const remaining = Array.from(set).filter((t) => !filterableTypes.includes(t)).sort((a, b) => a.localeCompare(b, "es"))
    return [...ordered, ...remaining]
  }, [])

  const activeCount = countActiveFilters(filters)

  const handleTypeToggle = (type: string) => {
    const current = filters.types || []
    onFiltersChange({
      types: current.includes(type) ? current.filter((t) => t !== type) : [...current, type],
    })
  }

  const handlePricePreset = (min: number | undefined, max: number | undefined) => {
    const alreadySet = filters.priceMin === min && filters.priceMax === max
    onFiltersChange({
      priceMin: alreadySet ? undefined : min,
      priceMax: alreadySet ? undefined : max,
    })
  }

  const isPricePresetActive = (min: number | undefined, max: number | undefined) =>
    filters.priceMin === min && filters.priceMax === max

  const pricePresets = filters.operation === "Alquiler" ? PRICE_PRESETS_ALQUILER : PRICE_PRESETS_VENTA

  const pill = (active: boolean) =>
    `inline-flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-all min-h-[40px] cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC] focus-visible:ring-offset-1 ${ active ? "bg-[#3898EC] text-white shadow-sm" : "bg-white border border-[#dddddd] text-[#444444] hover:border-[#3898EC] hover:text-[#3898EC]" }`

  return (
    <aside
      className="bg-white border border-[#eeeeee] rounded-xl p-5 sticky top-20 shadow-sm"
      aria-label="Filtros de búsqueda"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-[#3898EC]" aria-hidden="true" />
          <h3 className="text-base font-semibold text-[#222222]">{t('title')}</h3>
          {activeCount > 0 && (
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#3898EC] text-white text-[11px] font-bold leading-none">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-sm text-[#ea384c] hover:text-[#c0142a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ea384c] rounded"
            aria-label="Limpiar todos los filtros"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            {t('clear')}
          </button>
        )}
      </div>

      {/* Operation */}
      <fieldset className="mb-5">
        <legend className="text-sm font-semibold text-[#333333] mb-2.5">{t('operation')}</legend>
        <div className="flex gap-2">
          {(['Venta', 'Alquiler'] as const).map((op) => (
            <button
              key={op}
              type="button"
              onClick={() => onFiltersChange({ operation: filters.operation === op ? undefined : op })}
              className={pill(filters.operation === op)}
              aria-pressed={filters.operation === op ? "true" : "false"}
            >
              {tCommon(op === 'Venta' ? 'sale' : 'rent')}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Property Types */}
      <fieldset className="mb-5">
        <legend className="text-sm font-semibold text-[#333333] mb-2.5">{t('propertyType')}</legend>
        <div className="flex flex-wrap gap-2">
          {propertyTypes.map((type) => {
            const active = (filters.types || []).includes(type)
            return (
              <button
                key={type}
                type="button"
                onClick={() => handleTypeToggle(type)}
                className={pill(active)}
                aria-pressed={active ? "true" : "false"}
              >
                {t(`types.${type}` as `types.${FilterableType}`)}
              </button>
            )
          })}
        </div>
      </fieldset>

      {/* Price Range */}
      <fieldset className="mb-5">
        <legend className="text-sm font-semibold text-[#333333] mb-2.5">
          {t('price')} {filters.operation === "Alquiler" ? t('priceMonthly').replace('Precio ', '').replace('Price ', '') : ""}
        </legend>
        <div className="grid grid-cols-2 gap-2">
          {pricePresets.map(({ label, min, max }) => (
            <button
              key={label}
              type="button"
              onClick={() => handlePricePreset(min, max)}
              className={pill(isPricePresetActive(min, max))}
              aria-pressed={isPricePresetActive(min, max) ? "true" : "false"}
            >
              {label}
            </button>
          ))}
        </div>
        <details className="mt-2 group">
          <summary className="text-xs text-[#3898EC] cursor-pointer hover:underline list-none focus-visible:outline-none">
            {t('customRange')}
          </summary>
          <div className="flex gap-2 mt-2">
            <input
              type="number"
              placeholder={t('min')}
              value={filters.priceMin ?? ""}
              onChange={(e) =>
                onFiltersChange({ priceMin: e.target.value ? Number(e.target.value) : undefined })
              }
              className="w-1/2 px-3 py-2 text-sm border border-[#cccccc] rounded-lg focus:border-[#3898EC] focus:outline-none focus:ring-2 focus:ring-[#3898EC]/20 transition-colors placeholder:text-[#aaaaaa]"
              aria-label="Precio mínimo"
            />
            <input
              type="number"
              placeholder={t('max')}
              value={filters.priceMax ?? ""}
              onChange={(e) =>
                onFiltersChange({ priceMax: e.target.value ? Number(e.target.value) : undefined })
              }
              className="w-1/2 px-3 py-2 text-sm border border-[#cccccc] rounded-lg focus:border-[#3898EC] focus:outline-none focus:ring-2 focus:ring-[#3898EC]/20 transition-colors placeholder:text-[#aaaaaa]"
              aria-label="Precio máximo"
            />
          </div>
        </details>
      </fieldset>

      {/* Bedrooms */}
      <fieldset className="mb-5">
        <legend className="text-sm font-semibold text-[#333333] mb-2.5">{t('bedrooms')}</legend>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => onFiltersChange({ bedrooms: filters.bedrooms === num ? undefined : num })}
              className={`flex-1 ${pill(filters.bedrooms === num)}`}
              aria-label={`${num}${num === 4 ? " " + t('bedroomsMin') : ""} ${tCommon('bedrooms')}`}
            >
              {num === 4 ? "4+" : num}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Location */}
      <div className="mb-2">
        <label htmlFor="filter-location" className="block text-sm font-semibold text-[#333333] mb-2.5">
          {t('location')}
        </label>
        <select
          id="filter-location"
          value={filters.location || ""}
          onChange={(e) => onFiltersChange({ location: e.target.value || undefined })}
          className="w-full px-3 py-2.5 text-sm border border-[#cccccc] rounded-lg focus:border-[#3898EC] focus:outline-none focus:ring-2 focus:ring-[#3898EC]/20 transition-colors bg-white text-[#333333]"
        >
          <option value="">{t('allLocations')}</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>
    </aside>
  )
}