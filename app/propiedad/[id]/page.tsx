"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ContactForm from "@/components/contact-form"
import PropertyGrid from "@/components/property-grid"
import propertiesData from "@/data/properties.json"
import type { Property } from "@/lib/types"
import { formatPrice, formatArea } from "@/lib/formatters"

export default function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  const propertyId = Number.parseInt(resolvedParams.id)

  const allProperties: Property[] = propertiesData.properties
  const property = allProperties.find((p) => p.id === propertyId)

  const [selectedImage, setSelectedImage] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [activeTab, setActiveTab] = useState<"description" | "amenities" | "plans">("description")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState("")

  if (!property) {
    notFound()
  }

  const displayPrice =
    property.operation === "Venta" ? formatPrice(property.price) : `${formatPrice(property.pricePerMonth || 0)}/mes`

  const computedHighlights = (() => {
    if (property.highlights && property.highlights.length > 0) {
      return property.highlights
    }

    const items: string[] = []
    if (property.area) items.push(`${formatArea(property.area)} totales`)
    if (property.bedrooms > 0) items.push(`${property.bedrooms} habitaciones`)
    if (property.bathrooms > 0) items.push(`${property.bathrooms} baños`)
    if (property.parkingSpots > 0) items.push(`${property.parkingSpots} estacionamientos`)
    if (property.operation === "Alquiler" && property.pricePerMonth) items.push(`Alquiler ${displayPrice}`)
    if (property.operation === "Venta" && property.price) items.push(`Venta ${formatPrice(property.price)}`)
    items.push(`${property.district}, ${property.city}`)

    if (items.length < 4 && property.amenities?.length) {
      for (const amenity of property.amenities) {
        if (items.length >= 5) break
        items.push(amenity)
      }
    }

    return items.slice(0, 5)
  })()

  // Similar properties
  const similarProperties = allProperties
    .filter((p) => p.id !== property.id && p.category === property.category && p.district === property.district)
    .slice(0, 3)

  return (
    <>
      <Navbar />

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
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightboxImage}
              alt="Vista ampliada"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      <main className="py-12 bg-white">
        <div className="container-custom">
          {/* Gallery */}
          <div className="mb-12">
            <div className="mb-4 relative h-[500px] md:h-[600px] rounded-lg overflow-hidden bg-[#f3f3f3] shadow-lg">
              {!imageError ? (
                <Image
                  src={property.images[selectedImage] || "/placeholder.svg"}
                  alt={`${property.title} - Imagen ${selectedImage + 1}`}
                  fill
                  className="object-cover"
                  priority
                  onError={() => setImageError(true)}
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedImage((prev) => (prev === property.images.length - 1 ? 0 : prev + 1))
                      setImageError(false)
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#333333] p-3 rounded-full transition-all shadow-lg"
                    aria-label="Imagen siguiente"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {property.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImage(index)
                    setImageError(false)
                  }}
                  className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? "border-[#3898EC] scale-105 shadow-lg" 
                      : "border-transparent hover:border-[#cccccc] hover:scale-102"
                  }`}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${property.title} - Miniatura ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Property Info & Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Left Column - Property Info */}
            <div className="lg:col-span-2">
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
                <div className="text-4xl font-bold text-[#3898EC]">{displayPrice}</div>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 mx-auto mb-2 text-[#3898EC]"
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
                    <div className="text-2xl font-bold text-[#222222]">{property.bedrooms}</div>
                    <div className="text-sm text-[#999999]">Habitaciones</div>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 mx-auto mb-2 text-[#3898EC]"
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
                    <div className="text-2xl font-bold text-[#222222]">{property.bathrooms}</div>
                    <div className="text-sm text-[#999999]">Baños</div>
                  </div>
                )}
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 mx-auto mb-2 text-[#3898EC]"
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
                  <div className="text-2xl font-bold text-[#222222]">{formatArea(property.area)}</div>
                  <div className="text-sm text-[#999999]">Área Total</div>
                </div>
                {property.parkingSpots > 0 && (
                  <div className="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 mx-auto mb-2 text-[#3898EC]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                      />
                    </svg>
                    <div className="text-2xl font-bold text-[#222222]">{property.parkingSpots}</div>
                    <div className="text-sm text-[#999999]">Parqueos</div>
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
                    Descripción
                  </button>
                  <button
                    onClick={() => setActiveTab("amenities")}
                    className={`pb-3 px-2 font-medium transition-colors ${
                      activeTab === "amenities"
                        ? "text-[#3898EC] border-b-2 border-[#3898EC]"
                        : "text-[#999999] hover:text-[#333333]"
                    }`}
                  >
                    Amenidades
                  </button>
                  {property.planos && property.planos.length > 0 && (
                    <button
                      onClick={() => setActiveTab("plans")}
                      className={`pb-3 px-2 font-medium transition-colors ${
                        activeTab === "plans"
                          ? "text-[#3898EC] border-b-2 border-[#3898EC]"
                          : "text-[#999999] hover:text-[#333333]"
                      }`}
                    >
                      Planos
                    </button>
                  )}
                </div>

                {/* Tab Content */}
                {activeTab === "description" && (
                  <div>
                    <h2 className="text-2xl font-semibold text-[#222222] mb-4">Descripción</h2>
                    <p className="text-[#333333] leading-relaxed whitespace-pre-line">{property.description}</p>
                  </div>
                )}

                {activeTab === "amenities" && property.amenities.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-semibold text-[#222222] mb-4">Amenidades</h2>
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

                {activeTab === "plans" && property.planos && property.planos.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-semibold text-[#222222] mb-4">Planos Disponibles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {property.planos.map((plano, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setLightboxImage(plano)
                            setLightboxOpen(true)
                          }}
                          className="bg-[#fafafa] rounded-lg overflow-hidden border border-[#eeeeee] hover:border-[#3898EC] transition-all hover:shadow-lg cursor-pointer"
                        >
                          <div className="relative h-[400px]">
                            <Image
                              src={plano}
                              alt={`Plano ${index + 1} - ${property.title}`}
                              fill
                              className="object-contain p-4"
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
                <h3 className="text-lg font-semibold text-[#222222] mb-3">Información Adicional</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-[#999999]">Año de construcción:</span>
                    <span className="ml-2 text-[#333333] font-medium">{property.builtYear}</span>
                  </div>
                  <div>
                    <span className="text-[#999999]">Tipo:</span>
                    <span className="ml-2 text-[#333333] font-medium">{property.type}</span>
                  </div>
                  <div>
                    <span className="text-[#999999]">Categoría:</span>
                    <span className="ml-2 text-[#333333] font-medium">{property.category}</span>
                  </div>
                  <div>
                    <span className="text-[#999999]">Estado:</span>
                    <span className="ml-2 text-[#28a745] font-medium">Disponible</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 bg-[#fafafa] p-6 rounded-lg border border-[#eeeeee]">
                <h3 className="text-xl font-semibold text-[#222222] mb-4">Solicita Información</h3>
                <ContactForm compact propertyTitle={property.title} />
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-[#222222] mb-4">Ubicación</h2>
            <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg border border-[#eeeeee]">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(property.location)}&zoom=15`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Mapa de ${property.location}`}
              />
            </div>
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
                <p className="text-sm text-[#999999]">
                  {property.district}, {property.city}
                </p>
              </div>
            </div>
          </div>

          {/* Similar Properties */}
          {similarProperties.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-[#222222] mb-6">Propiedades Similares</h2>
              <PropertyGrid properties={similarProperties} />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
