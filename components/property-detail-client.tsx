"use client"

import { useEffect, useRef, useState } from "react"
import { PromotionModal } from "@/components/promotion-modal"
import { usePromotionModal } from "@/hooks/use-promotion-modal"
import { useIntersectionTrigger } from "@/hooks/use-intersection-trigger"
import { useSessionStorage } from "@/hooks/use-session-storage"
import { getAutoOpenPromotion } from "@/lib/promotions"
import ContactForm from "@/components/contact-form"
import LeadQualifier from "@/components/lead-qualifier"
import PropertyGrid from "@/components/property-grid"
import OptimizedImage from "@/components/optimized-image"
import { LazyMap } from "@/components/lazy-map"
import { VirtualGallery } from "@/components/virtual-gallery"
import { PropertyPromotionsGrid } from "@/components/property-promotions-grid"
import type { Property } from "@/lib/types"
import type { Promotion } from "@/types/promotion"
import { formatPrice, formatArea } from "@/lib/formatters"
import { trackGoogleAdsConversion, trackGoogleAdsEvent } from "@/lib/google-ads"
import { trackGaEvent } from "@/lib/google-analytics"
import { useTranslations } from "next-intl"

type PropertyDetailsProps = {
  property: Property
  similarProperties: Property[]
  promotions?: Promotion[]
}

// CAMBIO: este componente concentra todo el estado interactivo de detalle de propiedad.
// RAZÓN: permite mantener `app/propiedad/[id]/page.tsx` como Server Component con SEO completo.
export default function PropertyDetailClient({ property, similarProperties, promotions = [] }: PropertyDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [activeTab, setActiveTab] = useState<"description" | "amenities" | "plans">("description")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState("")
  const tCommon = useTranslations('common')
  const tDetail = useTranslations('propertyDetail')
  const hasTrackedView = useRef(false)
  const [urgencyCount] = useState(() => Math.floor(Math.random() * 8) + 5)

  // --- PROMOCIONES Y MODAL INTELIGENTE ---
  const { isOpen, promotion, openModal, closeModal } = usePromotionModal();
  const { ref: heroRef, isVisible } = useIntersectionTrigger(0.5);
  const sessionKey = `promo-${property.id}-seen`;
  const { set: setSession } = useSessionStorage(sessionKey);
  const autoPromo = getAutoOpenPromotion(promotions || []);

  // Lógica de apertura automática del modal promocional
  useEffect(() => {
    if (!autoPromo) return;
    if (!isVisible) return;
    // Solo abrir si hay promo autoOpen
    const delay = autoPromo.config?.showDelayMs ?? 2500;
    const timer = setTimeout(() => {
      openModal(autoPromo);
      setSession && setSession("true"); // opcional: puedes eliminar esta línea si no quieres guardar nada
    }, delay);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [autoPromo, isVisible]);

  const displayPrice =
    property.operation === "Venta" ? formatPrice(property.price) : `${formatPrice(property.pricePerMonth || 0)}/mes`

  const computedHighlights = (() => {
    if (property.highlights && property.highlights.length > 0) {
      return property.highlights
    }

    const items: string[] = []
    if (property.area) items.push(`${formatArea(property.area)} ${tDetail('highlights.total')}`)
    if (property.bedrooms > 0) items.push(`${property.bedrooms} ${tDetail('highlights.bedrooms')}`)
    if (property.bathrooms > 0) items.push(`${property.bathrooms} ${tDetail('highlights.bathrooms')}`)
    if (property.parkingSpots > 0) items.push(`${property.parkingSpots} ${tDetail('highlights.parking')}`)
    if (property.operation === "Alquiler" && property.pricePerMonth) items.push(`${tDetail('highlights.rent')} ${displayPrice}`)
    if (property.operation === "Venta" && property.price) items.push(`${tDetail('highlights.sale')} ${formatPrice(property.price)}`)
    items.push(`${property.district}, ${property.city}`)

    if (items.length < 4 && property.amenities?.length) {
      for (const amenity of property.amenities) {
        if (items.length >= 5) break
        items.push(amenity)
      }
    }

    return items.slice(0, 5)
  })()

  const hasAmenities = Array.isArray(property.amenities) && property.amenities.length > 0
  const hasPlanos = Array.isArray(property.planos) && property.planos.length > 0
  const hasRequirements = Array.isArray(property.requirements) && property.requirements.length > 0
  const hasIncentives = Array.isArray(property.incentives) && property.incentives.length > 0
  const hasEligibility = typeof property.minIncome === "number" && Number.isFinite(property.minIncome)

  const googleMapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY
  const mapSrc = googleMapsKey
    ? `https://www.google.com/maps/embed/v1/place?key=${googleMapsKey}&q=${encodeURIComponent(property.location)}&zoom=15`
    : null

  useEffect(() => {
    if (hasTrackedView.current) return
    hasTrackedView.current = true

    const conversionLabel = "6XybCKvqrtkbEKua17RC"
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

    trackGaEvent("property_view", eventParams)
    trackGoogleAdsEvent("property_view", eventParams)
    trackGoogleAdsConversion(conversionLabel, 1)
  }, [property])

  return (
    <>
      {/* Modal Promocional Inteligente */}
      <PromotionModal isOpen={isOpen} promotion={promotion} onClose={closeModal} />



      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Cerrar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative w-full h-[90vh] max-w-7xl mx-auto flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <OptimizedImage
              src={lightboxImage}
              alt="Vista ampliada"
              type="hero"
              fill
              priority
              blur={false}
              objectFit="contain"
            />
          </div>
        </div>
      )}

      <main className="py-12 bg-white">
        <div className="container-custom max-w-screen-2xl mx-auto px-4">
          {/* Gallery */}
          <div className="mb-12">
            <div ref={heroRef as React.RefObject<HTMLDivElement>} className="mb-4 relative h-[500px] md:h-[600px] rounded-lg overflow-hidden bg-[#f3f3f3] shadow-lg">
              {!imageError ? (
                <OptimizedImage
                  src={property.images[selectedImage] || "/placeholder.svg"}
                  alt={`${property.title} - Imagen ${selectedImage + 1}`}
                  type="hero"
                  fill
                  priority
                  blur
                  onError={() => setImageError(true)}
                  objectFit="cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 text-[#cccccc]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}

              {/* Image counter */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-medium">
                {selectedImage + 1} / {property.images.length}
              </div>

              {/* Navigation arrows */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={() => {
                      setSelectedImage((prev) => (prev === 0 ? property.images.length - 1 : prev - 1))
                      setImageError(false)
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#333333] p-3 rounded-full transition-all shadow-lg"
                    aria-label="Imagen anterior"
                  >
                    <img src="/images/icons/left-arrow.svg" alt="Anterior" className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedImage((prev) => (prev === property.images.length - 1 ? 0 : prev + 1))
                      setImageError(false)
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#333333] p-3 rounded-full transition-all shadow-lg"
                    aria-label="Imagen siguiente"
                  >
                    <img src="/images/icons/right-arrow.svg" alt="Siguiente" className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails - Virtualized Gallery */}
            <VirtualGallery
              images={property.images}
              selectedImage={selectedImage}
              onSelectImage={(index) => {
                setSelectedImage(index)
                setImageError(false)
              }}
              propertyTitle={property.title}
            />
          </div>

          {/* Main Content Grid: Info (left), Sidebar (right) */}
          <div className="grid-60-40 mb-16">
            {/* Columna principal (60%) */}
            <div>
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold text-white ${
                      property.operation === "Venta" ? "bg-[#28a745]" : "bg-[#3898EC]"
                    }`}
                  >
                    {property.operation.toUpperCase()}
                  </span>
                  <span className="px-3 py-1 rounded text-xs font-semibold bg-[#f3f3f3] text-[#333333]">
                    {property.type}
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-[#222222] mb-3">{property.title}</h1>
                <div className="flex items-center gap-2 text-[#999999] mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#ea384c]"
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{property.location}</span>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="text-4xl font-bold text-[#3898EC]">{displayPrice}</div>
                  <div className="flex items-center gap-2 bg-[#ea384c]/10 text-[#ea384c] px-3 py-1.5 rounded-full text-xs font-bold animate-pulse">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ea384c] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ea384c]"></span>
                    </span>
                    {tCommon('urgency', { count: urgencyCount })}
                  </div>
                </div>
                {computedHighlights.length > 0 && (
                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#333333]">
                    {computedHighlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[#3898EC]" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-6 bg-[#fafafa] rounded-lg">
                {property.bedrooms > 0 && (
                  <div className="text-center">
                    <div className="h-16 flex items-center justify-center mb-2">
                      <img src="/images/icons/icon-cama.png" alt="Camas" className="h-8 w-8 object-contain" />
                    </div>
                    <div className="text-2xl font-bold text-[#222222]">{property.bedrooms}</div>
                    <div className="text-sm text-[#999999]">{tDetail('bedrooms')}</div>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="text-center">
                    <div className="h-16 flex items-center justify-center mb-2">
                      <img src="/images/icons/icon-bano.png" alt="Baños" className="h-8 w-8 object-contain" />
                    </div>
                    <div className="text-2xl font-bold text-[#222222]">{property.bathrooms}</div>
                    <div className="text-sm text-[#999999]">{tDetail('bathrooms')}</div>
                  </div>
                )}
                <div className="text-center">
                  <div className="h-16 flex items-center justify-center mb-2">
                    <img src="/images/icons/icon-metraje.png" alt="Área" className="h-8 w-8 object-contain" />
                  </div>
                  <div className="text-2xl font-bold text-[#222222]">{formatArea(property.area)}</div>
                  <div className="text-sm text-[#999999]">{tDetail('totalArea')}</div>
                </div>
                {property.parkingSpots > 0 && (
                  <div className="text-center">
                    <div className="h-16 flex items-center justify-center mb-2">
                      <img src="/images/icons/icon-carro.png" alt="Estacionamientos" className="h-16 w-16 object-contain" />
                    </div>
                    <div className="text-2xl font-bold text-[#222222]">{property.parkingSpots}</div>
                    <div className="text-sm text-[#999999]">{tDetail('parking')}</div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                {/* Tabs */}
                <div className="flex gap-4 mb-6 border-b border-[#eeeeee]">
                  <button
                    onClick={() => setActiveTab("description")}
                    className={`pb-3 px-2 font-medium transition-colors ${
                      activeTab === "description"
                        ? "text-[#3898EC] border-b-2 border-[#3898EC]"
                        : "text-[#999999] hover:text-[#333333]"
                    }`}
                  >
                    {tDetail('tabDescription')}
                  </button>
                  <button
                    onClick={() => setActiveTab("amenities")}
                    className={`pb-3 px-2 font-medium transition-colors ${
                      activeTab === "amenities"
                        ? "text-[#3898EC] border-b-2 border-[#3898EC]"
                        : "text-[#999999] hover:text-[#333333]"
                    }`}
                  >
                    {tDetail('tabAmenities')}
                  </button>
                  {hasPlanos && (
                    <button
                      onClick={() => setActiveTab("plans")}
                      className={`pb-3 px-2 font-medium transition-colors ${
                        activeTab === "plans"
                          ? "text-[#3898EC] border-b-2 border-[#3898EC]"
                          : "text-[#999999] hover:text-[#333333]"
                      }`}
                    >
                      {tDetail('tabPlans')}
                    </button>
                  )}
                </div>

                {/* Tab Content */}
                {activeTab === "description" && (
                  <div>
                    <h2 className="text-2xl font-semibold text-[#222222] mb-4">{tDetail('descriptionHeading')}</h2>
                    <p className="text-[#333333] leading-relaxed whitespace-pre-line">{property.description}</p>
                  </div>
                )}

                {activeTab === "amenities" && hasAmenities && (
                  <div>
                    <h2 className="text-2xl font-semibold text-[#222222] mb-4">{tDetail('amenitiesHeading')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {property.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-[#fafafa] rounded-lg">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-[#28a745] flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-[#333333]">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "plans" && hasPlanos && (
                  <div>
                    <h2 className="text-2xl font-semibold text-[#222222] mb-4">{tDetail('plansHeading')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {property.planos?.map((plano, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setLightboxImage(plano)
                            setLightboxOpen(true)
                          }}
                          className="bg-[#fafafa] rounded-lg overflow-hidden border border-[#eeeeee] hover:border-[#3898EC] transition-all hover:shadow-lg cursor-pointer"
                        >
                          <div className="relative h-[250px] w-full">
                            <OptimizedImage
                              src={plano}
                              alt={`Plano ${index + 1} - ${property.title}`}
                              type="hero"
                              fill
                              priority={false}
                              blur
                              objectFit="contain"
                            />
                          </div>
                          <div className="p-4 bg-white border-t border-[#eeeeee]">
                            <h3 className="font-semibold text-[#333333]">
                              {index === 0 ? "Modelo A" : index === 1 ? "Modelo B" : `Modelo ${index + 1}`}
                            </h3>
                            <p className="text-sm text-[#999999] mt-1 flex items-center gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                />
                              </svg>
                              Haz clic para ampliar
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Info */}
              <div className="p-6 bg-[#fafafa] rounded-lg">
                <h3 className="text-lg font-semibold text-[#222222] mb-3">{tDetail('additionalInfo')}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-[#999999]">{tDetail('yearBuilt')}:</span>
                    <span className="ml-2 text-[#333333] font-medium">{property.builtYear}</span>
                  </div>
                  <div>
                    <span className="text-[#999999]">{tDetail('typeLabel')}:</span>
                    <span className="ml-2 text-[#333333] font-medium">
                      {property.type ? tDetail(`types.${property.type}` as 'types.Apartamento') : property.type}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#999999]">{tDetail('categoryLabel')}:</span>
                    <span className="ml-2 text-[#333333] font-medium">
                      {property.category ? tDetail(`categories.${property.category}` as 'categories.Residencial') : property.category}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#999999]">{tDetail('statusLabel')}:</span>
                    <span className={`ml-2 font-medium ${property.status === 'sold' ? 'text-[#dc3545]' : property.status === 'rented' ? 'text-[#ff9500]' : 'text-[#28a745]'}`}>
                      {property.status ? tDetail(`statuses.${property.status}` as 'statuses.available') : ''}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha optimizada: sticky, espaciado, responsive y jerarquía visual */}
            {/* Sidebar/Formulario (40%) */}
            <aside className="sidebar-formulario">
              {/* Imagen miniatura */}

              {/* Promociones (si existen) */}
              {promotions && promotions.length > 0 && (
                <PropertyPromotionsGrid 
                  promotions={promotions} 
                  onSelect={openModal}
                />
              )}

              {/* Formulario Califica en 30 segundos */}
              <section className="formulario-califica">
                <h3 className="formulario-titulo">{tDetail('qualifyTitle')}</h3>
                <p className="formulario-subtexto">
                  {tDetail('qualifySubtitle')}
                </p>
                <LeadQualifier
                  propertyId={property.id}
                  propertyTitle={property.title}
                  minIncome={property.minIncome}
                />
              </section>

              {/* Formulario de contacto clásico */}
              <section className="formulario-contacto">
                <h3 className="formulario-titulo">{tDetail('requestInfoTitle')}</h3>
                <ContactForm compact propertyTitle={property.title} />
              </section>
            </aside>
          </div>

          {(hasEligibility || hasRequirements || hasIncentives) && (
            <div className="mb-16 rounded-lg border border-[#eeeeee] bg-[#fafafa] p-6">
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">{tDetail('requirementsTitle')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#333333]">
                <div className="space-y-4">
                  {hasEligibility && (
                    <div>
                      <h3 className="font-semibold text-[#222222] mb-2">{tDetail('householdIncomeLabel')}</h3>
                      <p className="text-[#555555]">
                        {tDetail('householdIncomeMin', { amount: formatPrice(property.minIncome || 0) })}
                      </p>
                    </div>
                  )}
                  {hasIncentives && (
                    <div>
                      <h3 className="font-semibold text-[#222222] mb-2">{tDetail('benefitsLabel')}</h3>
                      <ul className="list-disc list-inside space-y-1 text-[#555555]">
                        {property.incentives?.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {hasRequirements && (
                  <div>
                    <h3 className="font-semibold text-[#222222] mb-2">{tDetail('requirementsLabel')}</h3>
                    <ul className="list-disc list-inside space-y-1 text-[#555555]">
                      {property.requirements?.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Virtual Tour */}
          {property.virtualTour && (
            <div className="mb-16">
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">{tDetail('virtualTourTitle')}</h2>
              <div className="bg-gradient-to-r from-[#3898EC] to-[#2e8adb] p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-full flex items-center justify-center">
                      <img src="/images/icons/play.svg" alt="Play" className="h-8 w-8" />
                    </div>
                    <div className="text-white">
                      <h3 className="text-lg font-semibold">{tDetail('virtualTourTagline')}</h3>
                      <p className="text-sm text-white/90">{tDetail('virtualTourSubtitle')}</p>
                    </div>
                  </div>
                  <a
                    href={property.virtualTour}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-[#3898EC] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg flex items-center gap-2"
                  >
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
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {tDetail('virtualTourCta')}
                  </a>
                </div>
              </div>
            </div>
          )}


          {/* Thumbnail promocional después de requisitos y antes del mapa */}
          {/* RAZÓN: UX solicitado, solo si hay promoción activa y thumbnail */}
          {promotion?.images?.thumbnail && (
            <button
              className="mx-auto my-12 block promotion-thumbnail transition-transform hover:scale-105 focus:ring-2 focus:ring-blue-500"
              aria-label={tDetail('promoBannerAriaLabel', { title: promotion.title })}
              onClick={() => openModal(promotion)}
            >
              <img
                src={promotion.images.thumbnail}
                alt={promotion.title}
                className="w-full max-w-xs h-auto object-contain rounded-lg shadow-lg border border-[#e5e7eb] bg-white"
                loading="lazy"
              />
            </button>
          )}


          {/* Mapa de ubicación después del thumbnail */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-[#222222] mb-4">{tDetail('locationTitle')}</h2>
            <LazyMap mapSrc={mapSrc} propertyLocation={property.location} />
            <div className="mt-4 flex items-start gap-3 p-4 bg-[#fafafa] rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#ea384c] flex-shrink-0 mt-1"
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div>
                <h3 className="font-semibold text-[#333333] mb-1">{property.location}</h3>
                {property.location.toLowerCase().includes(property.district.toLowerCase()) && 
                 property.location.toLowerCase().includes(property.city.toLowerCase()) ? null : (
                  <p className="text-sm text-[#999999]">
                    {property.district}, {property.city}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Similar Properties */}
          {similarProperties.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-[#222222] mb-6">{tDetail('similarTitle')}</h2>
              <PropertyGrid properties={similarProperties} />
            </div>
          )}
        </div>
      </main>


      {/* Mobile Sticky CTA Bar */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] flex gap-3 animate-slide-up">
        <a
          href={`https://wa.me/50766770577?text=${encodeURIComponent(tDetail('mobileWhatsapp', { title: property.title }))}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-bold text-sm shadow-sm active:scale-95 transition-all"
        >
          <img src="/images/icons/whatsapp.webp" alt="WhatsApp" className="h-5 w-5 object-contain" />
          WhatsApp
        </a>
        <button
          onClick={() => {
            const contactSection = document.querySelector('.formulario-contacto');
            contactSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex-1 bg-[#3898EC] text-white py-3 rounded-xl font-bold text-sm shadow-sm active:scale-95 transition-all"
        >
          {tCommon('whatsappQuery')}
        </button>
      </div>
    </>
  )
}


