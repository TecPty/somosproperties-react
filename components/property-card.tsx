"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useCallback } from "react"
import { MapPin, Bed, Bath, Maximize2, Heart, Images } from "lucide-react"
import type { Property } from "@/lib/types"
import { formatPrice, formatArea } from "@/lib/formatters"
import { isPremium } from "@/lib/utils-premium"
import { trackGoogleAdsEvent } from "@/lib/google-ads"
import { trackGaEvent } from "@/lib/google-analytics"

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isFavorite, setIsFavorite] = useState(() => {
    if (typeof window === "undefined") return false
    try {
      const saved = JSON.parse(localStorage.getItem("sp_favorites") || "[]") as number[]
      return saved.includes(property.id)
    } catch {
      return false
    }
  })
  const [heartAnimating, setHeartAnimating] = useState(false)

  const displayPrice =
    property.operation === "Venta" ? formatPrice(property.price) : `${formatPrice(property.pricePerMonth || 0)}/mes`
  const statusLabel = property.status === "sold" ? "Vendido" : null
  const isRented = property.status === "rented"
  const isPremiumProperty = isPremium(property)
  const imageCount = property.images?.length ?? 1

  const handlePropertyClick = useCallback(() => {
    const eventParams = {
      property_id: property.id,
      property_title: property.title,
      property_type: property.type,
      property_category: property.category,
      operation: property.operation,
      price: property.price || property.pricePerMonth || 0,
      city: property.city,
      district: property.district,
    }

    trackGaEvent("property_click", eventParams)
    trackGoogleAdsEvent("property_click", eventParams)
  }, [property])

  const handleFavoriteToggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setHeartAnimating(true)
    setTimeout(() => setHeartAnimating(false), 400)
    setIsFavorite((prev) => {
      const next = !prev
      try {
        const saved = JSON.parse(localStorage.getItem("sp_favorites") || "[]") as number[]
        const updated = next ? [...saved, property.id] : saved.filter((id) => id !== property.id)
        localStorage.setItem("sp_favorites", JSON.stringify(updated))
      } catch { /* ignore */ }
      return next
    })
  }, [property.id])

  return (
    <article className="relative bg-white rounded-xl border border-[#eeeeee] overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 shadow-card flex flex-col h-full group">
      {/* ── Favorite Button ── */}
      <button
        onClick={handleFavoriteToggle}
        aria-label={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
        aria-pressed={isFavorite}
        className={`absolute top-3 right-3 z-20 flex items-center justify-center w-10 h-10 rounded-full shadow-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC] focus-visible:ring-offset-2 ${
          isFavorite ? "bg-white text-[#ea384c]" : "bg-white/80 text-[#aaaaaa] hover:text-[#ea384c]"
        }`}
      >
        <Heart
          className={`h-5 w-5 transition-all ${isFavorite ? "fill-[#ea384c]" : "fill-none"} ${heartAnimating ? "animate-heart-pop" : ""}`}
          aria-hidden="true"
        />
      </button>

      <Link href={`/propiedad/${property.id}`} className="block relative" onClick={handlePropertyClick} aria-label={`Ver detalles: ${property.title}`}>
        <div className="relative h-56 overflow-hidden bg-[#f3f3f3]">    
          {!imageError ? (
            <Image
              src={property.image || "/placeholder.svg"}
              alt={property.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#f3f3f3] gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-[#cccccc]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs text-[#bbbbbb]">Sin imagen</span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

          {/* Premium badge */}
          {isPremiumProperty && (
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-gradient-to-r from-[#d4af37] to-[#f4e4b8] text-[#1a1a1a] px-3 py-1.5 rounded-full text-xs font-bold shadow-lg tracking-wide">
                ★ PREMIUM
              </span>
            </div>
          )}

          {/* Operation badge */}
          <div className={`absolute z-10 ${isPremiumProperty ? "top-11 left-3" : "top-3 left-3"}`}>
            <span className={`px-2.5 py-1 rounded-md text-xs font-bold text-white shadow-sm tracking-wide ${
              property.operation === "Venta" ? "bg-[#28a745]" : "bg-[#3898EC]"
            }`}>
              {property.operation.toUpperCase()}
            </span>
          </div>

          {/* Photo count */}
          {imageCount > 1 && (
            <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
              <Images className="h-3 w-3" aria-hidden="true" />
              <span>{imageCount}</span>
            </div>
          )}

          {/* Sold / Rented */}
          {isRented && (
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <span className="rotate-[-15deg] border-[3px] border-[#ea384c] text-[#ea384c] text-xl font-black px-4 py-1 rounded opacity-75 select-none">
                ALQUILADO
              </span>
            </div>
          )}
          {statusLabel && (
            <span className="absolute bottom-3 right-3 z-10 rounded-md px-3 py-1 text-xs font-semibold uppercase text-white shadow-sm bg-[#d92d2d]">
              {statusLabel}
            </span>
          )}
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        {/* Price — visual anchor */}
        <div className="flex items-baseline justify-between mb-2">
          <p className={`text-xl font-bold leading-tight ${
            property.operation === "Venta" ? "text-[#1f8f45]" : "text-[#0c6fdc]"
          }`}>
            {displayPrice}
          </p>
          {property.area > 0 && (
            <span className="flex items-center gap-1 text-xs text-[#888888]">
              <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
              {formatArea(property.area)}
            </span>
          )}
        </div>

        <Link href={`/propiedad/${property.id}`} onClick={handlePropertyClick} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC] rounded">
          <h3 className="text-base font-semibold text-[#333333] mb-1.5 line-clamp-2 hover:text-[#3898EC] transition-colors leading-snug min-h-[2.6rem]">
            {property.title}
          </h3>
        </Link>

        <div className="flex items-start gap-1 mb-3 text-[#888888] text-sm">
          <MapPin className="h-4 w-4 text-[#ea384c] flex-shrink-0 mt-0.5" aria-hidden="true" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        {/* Beds / Baths */}
        {(property.bedrooms > 0 || property.bathrooms > 0) && (
          <div className="flex items-center gap-4 mb-4 text-[#758696] text-sm">
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-1.5">
                <Bed className="h-4 w-4" aria-hidden="true" />
                <span>
                  {property.bedrooms}{" "}
                  <span className="hidden sm:inline">{property.bedrooms === 1 ? "hab." : "habs."}</span>
                </span>
              </span>
            )}
            {property.bathrooms > 0 && (
              <span className="flex items-center gap-1.5">
                <Bath className="h-4 w-4" aria-hidden="true" />
                <span>
                  {property.bathrooms}{" "}
                  <span className="hidden sm:inline">{property.bathrooms === 1 ? "baño" : "baños"}</span>
                </span>
              </span>
            )}
          </div>
        )}

        {/* CTAs */}
        <div className="mt-auto flex flex-col gap-2 pt-3 border-t border-[#f0f0f0]">
          <Link
            href={`/propiedad/${property.id}`}
            className="flex items-center justify-center w-full min-h-[44px] bg-[#3898EC] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0082f3] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC] focus-visible:ring-offset-2"
            onClick={handlePropertyClick}
          >
            Ver Detalles
          </Link>

        </div>
      </div>
    </article>
  )
}
