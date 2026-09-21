import { notFound } from "next/navigation"
import type { Metadata } from "next"
import type { Property } from "@/lib/types"
import { properties as propertiesData } from "@/lib/properties"
import PropertyDetailClient from "@/components/property-detail-client"
import { SchemaMarkup } from "@/components/schema-markup"
import { getPropertyPromotions } from "@/lib/promotions"
import { getTranslations } from "next-intl/server"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.somosproperties.com"
const fallbackImage = "/placeholder.svg"

function toAbsoluteUrl(path: string): string {
  if (path.startsWith("http")) return path
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`
}

function getPropertyById(id: number): Property | undefined {
  return propertiesData.find((property) => property.id === id && !property.hidden)
}

function withLocaleVideo(property: Property, locale: string): Property {
  if (!property.video) return property

  const localeKey = locale === "en" ? "en" : "es"
  const localizedVideo = property.video[localeKey]

  if (!localizedVideo) {
    const propertyWithoutVideo = { ...property }
    delete propertyWithoutVideo.video
    return propertyWithoutVideo
  }

  return {
    ...property,
    video: {
      [localeKey]: localizedVideo,
    },
  }
}

// CAMBIO: la descripcion generada se arma con etiquetas traducidas y el texto del locale.
// RAZÓN: las paginas /en emitian metadata en espanol pese a declararse en ingles.
type DescriptionLabels = {
  bedrooms: string
  bathrooms: string
  perMonth: string
  inLocation: string
  priceOnRequest: string
  saleLabel: string
  rentLabel: string
  sold: string
  rented: string
}

function getLocalizedDescription(property: Property, locale: string): string {
  return locale === "en" ? property.description_en || property.description : property.description
}

// CAMBIO: "Venta/Alquiler" ahora muestra ambos precios en vez de colapsar a uno solo.
// RAZÓN: el ternario binario original trataba cualquier operacion distinta de "Venta"
// como alquiler puro, ocultando el precio de venta en propiedades duales.
function buildPropertyDescription(property: Property, locale: string, labels: DescriptionLabels): string {
  const numberLocale = locale === "en" ? "en-US" : "es-PA"
  const formatPrice = (value: number) => `$${value.toLocaleString(numberLocale)}`

  const saleText = isPositiveNumber(property.price) ? formatPrice(property.price) : labels.priceOnRequest
  const rentText = isPositiveNumber(property.pricePerMonth)
    ? `${formatPrice(property.pricePerMonth)}${labels.perMonth}`
    : labels.priceOnRequest

  const statusText =
    property.status === "rented"
      ? labels.rented
      : property.status === "sold"
        ? labels.sold
        : ""

  const basePrice =
    property.showPrice === false
      ? statusText
      : property.operation === "Venta/Alquiler"
        ? `${labels.saleLabel}: ${saleText} · ${labels.rentLabel}: ${rentText}`
        : property.operation === "Venta"
          ? saleText
          : rentText

  const bedroomsPart = property.bedrooms
    ? `${property.bedrooms} ${labels.bedrooms}, ${property.bathrooms} ${labels.bathrooms}. `
    : ""
  const description = getLocalizedDescription(property, locale)
  const pricePart = basePrice ? `${basePrice}. ` : ""
  const summary = `${property.title} ${labels.inLocation} ${property.location}. ${bedroomsPart}${pricePart}${description}`
  return summary.length <= 160 ? summary : `${summary.slice(0, 157)}...`
}

// CAMBIO: semantica explicita de transaccion via GoodRelations.
// RAZÓN: un Offer sin businessFunction se interpreta como venta, y los alquileres
// mensuales se publicaban como si fueran precio de compra.
const BUSINESS_FUNCTION_SELL = "http://purl.org/goodrelations/v1#Sell"
const BUSINESS_FUNCTION_LEASE_OUT = "http://purl.org/goodrelations/v1#LeaseOut"

function getAvailability(status: Property["status"]): string {
  if (status === "available") return "https://schema.org/InStock"
  if (status === "sold") return "https://schema.org/SoldOut"
  return "https://schema.org/OutOfStock"
}

function isPositiveNumber(value: number | null | undefined): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0
}

// CAMBIO: se omite el Offer cuando no hay precio real en catalogo.
// RAZÓN: antes se emitia price 0 o null, senalando propiedades gratuitas.
function buildPropertyOffers(property: Property, propertyUrl: string): Record<string, unknown>[] {
  if (property.showPrice === false) return []

  const availability = getAvailability(property.status)
  const offersForSale = property.operation === "Venta" || property.operation === "Venta/Alquiler"
  const offersForRent = property.operation === "Alquiler" || property.operation === "Venta/Alquiler"
  const offers: Record<string, unknown>[] = []

  if (offersForSale && isPositiveNumber(property.price)) {
    offers.push({
      "@type": "Offer",
      businessFunction: BUSINESS_FUNCTION_SELL,
      priceCurrency: "USD",
      price: property.price,
      availability,
      url: propertyUrl,
    })
  }

  if (offersForRent && isPositiveNumber(property.pricePerMonth)) {
    offers.push({
      "@type": "Offer",
      businessFunction: BUSINESS_FUNCTION_LEASE_OUT,
      priceCurrency: "USD",
      availability,
      url: propertyUrl,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: property.pricePerMonth,
        priceCurrency: "USD",
        unitCode: "MON",
        billingDuration: 1,
        billingIncrement: 1,
      },
    })
  }

  return offers
}

// CAMBIO: los datos del inmueble (direccion, area, recamaras, banos, estacionamientos)
// se publican en `mainEntity` en vez de colgarlos del RealEstateListing.
// RAZÓN: RealEstateListing es un WebPage y no admite esas propiedades. El inmueble es un
// Accommodation (residencial) o un Place (comercial/terreno), y son los datos que usan
// los asistentes de IA para responder busquedas como "3 recamaras en Costa del Este".
const ACCOMMODATION_TYPES: Partial<Record<Property["type"], string>> = {
  Apartamento: "Apartment",
  Casa: "House",
  Villa: "House",
}

const ENTITY_LABELS = {
  es: { area: "Área", parking: "Estacionamientos" },
  en: { area: "Area", parking: "Parking spaces" },
}

function buildPropertyEntity(property: Property, locale: string): Record<string, unknown> {
  const labels = ENTITY_LABELS[locale === "en" ? "en" : "es"]
  const accommodationType = ACCOMMODATION_TYPES[property.type]
  const entity: Record<string, unknown> = {
    "@type": accommodationType ?? "Place",
    name: property.title,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.location,
      addressLocality: property.city,
      addressRegion: property.district,
      addressCountry: "PA",
    },
  }

  if (isPositiveNumber(property.parkingSpots)) {
    entity.amenityFeature = {
      "@type": "LocationFeatureSpecification",
      name: labels.parking,
      value: property.parkingSpots,
    }
  }

  // floorSize, numberOfBedrooms, banos y yearBuilt solo existen en Accommodation.
  if (!accommodationType) {
    if (isPositiveNumber(property.area)) {
      entity.additionalProperty = {
        "@type": "PropertyValue",
        name: labels.area,
        value: property.area,
        unitCode: "MTK",
      }
    }
    return entity
  }

  if (isPositiveNumber(property.area)) {
    entity.floorSize = { "@type": "QuantitativeValue", value: property.area, unitCode: "MTK" }
  }

  if (isPositiveNumber(property.bedrooms)) {
    entity.numberOfBedrooms = property.bedrooms
  }

  if (isPositiveNumber(property.bathrooms)) {
    // Convencion RESO que sigue schema.org: 2.5 = 2 banos completos + 1 medio bano, total 3.
    entity.numberOfBathroomsTotal = Math.ceil(property.bathrooms)
    if (!Number.isInteger(property.bathrooms)) {
      entity.numberOfFullBathrooms = Math.floor(property.bathrooms)
      entity.numberOfPartialBathrooms = 1
    }
  }

  if (isPositiveNumber(property.builtYear)) {
    entity.yearBuilt = property.builtYear
  }

  return entity
}

function buildPropertyJsonLd(property: Property, locale: string): Record<string, unknown> {
  const propertyUrl = `${siteUrl}/${locale}/propiedad/${property.id}`
  const primaryImage = toAbsoluteUrl(property.images?.[0] || property.image || fallbackImage)
  const description = getLocalizedDescription(property, locale)
  const inLanguage = locale === "en" ? "en" : "es"
  const offers = buildPropertyOffers(property, propertyUrl)
  const offersField = offers.length === 0 ? {} : { offers: offers.length === 1 ? offers[0] : offers }

  // CAMBIO: JSON-LD principal con `RealEstateListing` y fallback a `Product`.
  // RAZÓN: asegura datos estructurados legibles por buscadores aun si el tipo principal no aplica.
  if (property.location || property.city || property.district) {
    return {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      name: property.title,
      description,
      inLanguage,
      url: propertyUrl,
      image: [primaryImage],
      ...offersField,
      mainEntity: buildPropertyEntity(property, locale),
    }
  }

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.title,
    description,
    inLanguage,
    url: propertyUrl,
    image: [primaryImage],
    ...offersField,
  }
}

import { createMetadata } from "@/lib/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>
}): Promise<Metadata> {
  const { id, locale } = await params
  const propertyId = Number.parseInt(id, 10)
  const t = await getTranslations({ locale, namespace: 'metadata.propertyDetail' })
  
  if (Number.isNaN(propertyId)) {
    return createMetadata({
      title: t('notFoundTitle'),
      description: t('notFoundDescription'),
      path: `/propiedad/${id}`,
      locale,
      robots: { index: false, follow: false }
    })
  }

  const property = getPropertyById(propertyId)

  if (!property) {
    return createMetadata({
      title: t('notFoundTitle'),
      description: t('notFoundDescription'),
      path: `/propiedad/${id}`,
      locale,
      robots: { index: false, follow: false }
    })
  }

  const tCommon = await getTranslations({ locale, namespace: 'common' })
  const description = buildPropertyDescription(property, locale, {
    bedrooms: tCommon('bedrooms'),
    bathrooms: tCommon('bathrooms'),
    perMonth: tCommon('perMonth'),
    inLocation: t('inLocation'),
    priceOnRequest: t('priceOnRequest'),
    saleLabel: t('saleLabel'),
    rentLabel: t('rentLabel'),
    sold: tCommon('sold'),
    rented: tCommon('rented'),
  })
  const ogImage = toAbsoluteUrl(property.image || property.images?.[0] || fallbackImage)

  return createMetadata({
    title: property.title,
    description,
    path: `/propiedad/${property.id}`,
    locale,
    image: ogImage
  })
}

export default async function PropertyDetailsPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params
  const propertyId = Number.parseInt(id, 10)

  if (Number.isNaN(propertyId)) {
    notFound()
  }

  const property = getPropertyById(propertyId)

  if (!property) {
    notFound()
  }

  const similarProperties = propertiesData
    .filter(
      (item) =>
        !item.hidden &&
        item.id !== property.id &&
        item.category === property.category &&
        item.district === property.district,
    )
    .slice(0, 3)

  const promotions = getPropertyPromotions(property.id)
  const propertyJsonLd = buildPropertyJsonLd(property, locale)
  const localizedProperty = withLocaleVideo(property, locale)
  const localizedSimilarProperties = similarProperties.map((item) => withLocaleVideo(item, locale))

  return (
    <>
      {/* CAMBIO: JSON-LD se renderiza en servidor con la pagina de detalle. */}
      {/* RAZÓN: mejora indexacion SEO al entregar datos estructurados en el HTML inicial. */}
      <SchemaMarkup schema={propertyJsonLd} />
      <PropertyDetailClient
        property={localizedProperty}
        similarProperties={localizedSimilarProperties}
        promotions={promotions}
      />
    </>
  )
}
