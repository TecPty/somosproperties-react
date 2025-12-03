import type { Property } from "@/lib/types"
import PropertyCard from "./property-card"

interface PropertyGridProps {
  properties: Property[]
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 mx-auto text-[#cccccc] mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <h3 className="text-2xl font-semibold text-[#333333] mb-2">No se encontraron propiedades</h3>
        <p className="text-[#999999]">Intenta ajustar tus filtros de búsqueda</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}
