"use client"

import Link from "next/link"
import { useState, useCallback } from "react"
import { MapPin, Images, MessageCircle } from "lucide-react"
import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import type { Property } from "@/lib/types"
import { formatPrice, formatArea } from "@/lib/formatters"
import { isPremium } from "@/lib/utils-premium"
import { trackGoogleAdsEvent } from "@/lib/google-ads"
import { trackGaEvent } from "@/lib/google-analytics"
import OptimizedImage from "@/components/optimized-image"

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations('common')
  const [imageError, setImageError] = useState(false)

  const displayPrice =
    property.operation === "Venta" 
      ? (property.price > 0 ? formatPrice(property.price) : "Consultar Precio")
      : ((property.pricePerMonth || 0) > 0 ? `${formatPrice(property.pricePerMonth || 0)}${t('perMonth')}` : "Consultar Precio")
  const statusLabel = property.status === "sold" ? t('sold') : null
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

  return (
    <article className="relative bg-white rounded-xl border border-[#eeeeee] overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 shadow-card flex flex-col h-full group">
      <Link href={`/${locale}/propiedad/${property.id}`} className="block relative" onClick={handlePropertyClick} aria-label={`Ver detalles: ${property.title}`}>
        <div className="relative h-56 overflow-hidden bg-[#f3f3f3]">    
          {/* CAMBIO: la imagen principal de la card es siempre la primera imagen de la propiedad */}
          {/* RAZÓN: coherencia visual con el hero de la página de detalle */}
          {!imageError && property.images && property.images.length > 0 ? (
            <OptimizedImage
              src={property.images[0]}
              alt={property.title}
              type="propertyCard"
              fill
              priority={false}
              blur
              onError={() => setImageError(true)}
              className="group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#e5e7eb] gap-2 rounded-md border border-[#e0e0e0]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#cccccc]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="4" stroke="#cccccc" strokeWidth="1.5" fill="#f3f3f3" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 15l2.5-3 2.5 3 3.5-4.5L21 18H3l5-6z" />
              </svg>
              <span className="text-xs text-[#bbbbbb]">{t('noImage')}</span>
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
              <span className="rotate-[-15deg] border-[3px] border-[#ea384c] text-[#ea384c] text-xl font-black px-4 py-1 rounded opacity-75 select-none uppercase">
                {t('rented')}
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
        <div className="flex items-baseline justify-between mb-2 gap-2">
          <p className="text-2xl font-bold leading-tight text-[#3898EC] truncate">
            {displayPrice}
          </p>
          {property.area > 0 && (
            <span className="flex items-center gap-1.5 text-xs text-[#888888] flex-shrink-0 whitespace-nowrap">
              <img src="/images/icons/icon-metraje.png" alt={t('area')} className="h-4 w-4 object-contain opacity-70" />
              {formatArea(property.area)}
            </span>
          )}
        </div>

        <Link href={`/${locale}/propiedad/${property.id}`} onClick={handlePropertyClick} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC] rounded">
          <h3 className="text-base font-semibold text-[#333333] mb-1.5 line-clamp-2 hover:text-[#3898EC] transition-colors leading-snug min-h-[2.6rem]">
            {property.title}
          </h3>
        </Link>

        <div className="flex items-start gap-1.5 mb-3 text-[#555555] text-base font-medium">
          <MapPin className="h-4 w-4 text-[#ea384c] flex-shrink-0 mt-0.5" aria-hidden="true" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        {/* Beds / Baths */}
        {(property.bedrooms > 0 || property.bathrooms > 0) && (
          <div className="flex items-center gap-4 mb-4 text-[#758696] text-sm">
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-1.5">
                <img src="/images/icons/icon-cama.png" alt={t('beds')} className="h-4 w-4 object-contain" />
                <span>
                  {property.bedrooms}{" "}
                  <span className="hidden sm:inline">{property.bedrooms === 1 ? t('bed') : t('beds')}</span>
                </span>
              </span>
            )}
            {property.bathrooms > 0 && (
              <span className="flex items-center gap-1.5">
                <img src="/images/icons/icon-bano.png" alt={t('bathrooms')} className="h-4 w-4 object-contain" />
                <span>
                  {property.bathrooms}{" "}
                  <span className="hidden sm:inline">{property.bathrooms === 1 ? t('bath') : t('baths')}</span>
                </span>
              </span>
            )}
          </div>
        )}

        {/* CTAs */}
        <div className="mt-auto pt-3 border-t border-[#f0f0f0]">
          <Link
            href={`/${locale}/propiedad/${property.id}`}
            className="flex items-center justify-center w-full min-h-[44px] bg-[#3898EC] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0082f3] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC] focus-visible:ring-offset-2"
            onClick={handlePropertyClick}
          >
            {t('viewDetails')}
          </Link>
        </div>
      </div>
    </article>
  )
}
