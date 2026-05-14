import { notFound } from "next/navigation"
import type { Metadata } from "next"
import type { Property } from "@/lib/types"
import { properties as propertiesData } from "@/lib/properties"
import PropertyDetailClient from "@/components/property-detail-client"
import { getPropertyPromotions } from "@/lib/promotions"
import { getTranslations } from "next-intl/server"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://somosproperties.com"
const fallbackImage = "/placeholder.svg"

function toAbsoluteUrl(path: string): string {
  if (path.startsWith("http")) return path
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`
}

function getPropertyById(id: number): Property | undefined {
  return propertiesData.find((property) => property.id === id && !property.hidden)
}

function buildPropertyDescription(property: Property): string {
  const basePrice =
    property.operation === "Venta"
      ? `$${property.price.toLocaleString("es-PA")}`
      : `$${(property.pricePerMonth ?? 0).toLocaleString("es-PA")}/mes`

  const summary = `${property.title} en ${property.location}. ${property.bedrooms} habitaciones, ${property.bathrooms} banos. ${basePrice}. ${property.description}`
  return summary.length <= 160 ? summary : `${summary.slice(0, 157)}...`
}

function buildPropertyJsonLd(property: Property): Record<string, unknown> {
  const propertyUrl = `${siteUrl}/propiedad/${property.id}`
  const primaryImage = toAbsoluteUrl(property.images?.[0] || property.image || fallbackImage)
  const listingPrice = property.operation === "Venta" ? property.price : property.pricePerMonth ?? property.price

  const offers = {
    "@type": "Offer",
    priceCurrency: "USD",
    price: listingPrice,
    availability:
      property.status === "available"
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    url: propertyUrl,
  }

  // CAMBIO: JSON-LD principal con `RealEstateListing` y fallback a `Product`.
  // RAZÓN: asegura datos estructurados legibles por buscadores aun si el tipo principal no aplica.
  if (property.location || property.city || property.district) {
    return {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      name: property.title,
      description: property.description,
      url: propertyUrl,
      image: [primaryImage],
      offers,
      address: {
        "@type": "PostalAddress",
        streetAddress: property.location,
        addressLocality: property.city,
        addressRegion: property.district,
        addressCountry: "PA",
      },
    }
  }

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.title,
    description: property.description,
    url: propertyUrl,
    image: [primaryImage],
    offers,
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

  const description = buildPropertyDescription(property)
  const ogImage = toAbsoluteUrl(property.image || property.images?.[0] || fallbackImage)

  return createMetadata({
    title: `${property.title} | SOMOS Properties`,
    description,
    path: `/propiedad/${property.id}`,
    locale,
    image: ogImage
  })
}

export default async function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
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
  const propertyJsonLd = buildPropertyJsonLd(property)

  return (
    <>
      {/* CAMBIO: JSON-LD se renderiza en servidor con la pagina de detalle. */}
      {/* RAZÓN: mejora indexacion SEO al entregar datos estructurados en el HTML inicial. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(propertyJsonLd) }}
      />
      <PropertyDetailClient
        property={property}
        similarProperties={similarProperties}
        promotions={promotions}
      />
    </>
  )
}
