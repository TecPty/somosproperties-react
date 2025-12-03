"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import type { Property } from "@/lib/types"
import { formatPrice, formatArea } from "@/lib/formatters"

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageError, setImageError] = useState(false)

  const displayPrice =
    property.operation === "Venta" ? formatPrice(property.price) : `${formatPrice(property.pricePerMonth || 0)}/mes`

  return (
    <article className="bg-white rounded-lg border border-[#eeeeee] overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 shadow-card">
      <Link href={`/propiedad/${property.id}`} className="block relative group">
        <div className="relative h-60 overflow-hidden bg-[#f3f3f3]">
          {!imageError ? (
            <Image
              src={property.image || "/placeholder.svg"}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#f3f3f3]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-[#cccccc]"
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
            </div>
          )}

          {/* Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`px-3 py-1 rounded text-xs font-semibold text-white ${
                property.operation === "Venta" ? "bg-[#28a745]" : "bg-[#3898EC]"
              }`}
            >
              {property.operation.toUpperCase()}
            </span>
          </div>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsFavorite(!isFavorite)
            }}
            className="absolute top-3 right-3 z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-[#3898EC] hover:text-white transition-colors group/fav"
            aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${isFavorite ? "fill-[#ea384c]" : "fill-none"}`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </Link>

      <div className="p-5">
        <div className="mb-2">
          <div className="text-[1.75rem] font-bold text-[#222222] mb-1">{displayPrice}</div>
        </div>

        <Link href={`/propiedad/${property.id}`}>
          <h3 className="text-xl font-semibold text-[#333333] mb-2 line-clamp-2 hover:text-[#3898EC] transition-colors">
            {property.title}
          </h3>
        </Link>

        <div className="flex items-start gap-1 mb-4 text-[#999999] text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[#ea384c] flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="line-clamp-1">{property.location}</span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 mb-5 text-[#758696] text-sm">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
              <span>{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                />
              </svg>
              <span>{property.bathrooms}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
            <span>{formatArea(property.area)}</span>
          </div>
        </div>

        <Link
          href={`/propiedad/${property.id}`}
          className="block w-full bg-[#3898EC] text-white text-center py-3 rounded-lg font-medium hover:bg-[#0082f3] transition-colors"
        >
          Ver Detalles
        </Link>
      </div>
    </article>
  )
}
