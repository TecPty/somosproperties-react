import { notFound } from "next/navigation"
import type { Metadata } from "next"
import type { Property } from "@/lib/types"
import { properties as propertiesData } from "@/lib/properties"
import PropertyDetailClient from "@/components/property-detail-client"
import { getPropertyPromotions } from "@/lib/promotions"

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const propertyId = Number.parseInt(id, 10)
  const fallbackCanonical = `${siteUrl}/propiedad/${id || ""}`.replace(/\/$/, "")
  const fallbackMetadata: Metadata = {
    title: "Propiedad no encontrada - SOMOS Properties",
    description: "La propiedad que buscas no existe o ya no esta disponible.",
    alternates: {
      canonical: fallbackCanonical || `${siteUrl}/propiedad`,
    },
    openGraph: {
      title: "Propiedad no encontrada - SOMOS Properties",
      description: "La propiedad que buscas no existe o ya no esta disponible.",
      type: "website",
      url: fallbackCanonical || `${siteUrl}/propiedad`,
      images: [
        {
          url: toAbsoluteUrl(fallbackImage),
          width: 1200,
          height: 630,
          alt: "SOMOS Properties",
        },
      ],
      siteName: "SOMOS Properties",
    },
    robots: {
      index: false,
      follow: false,
    },
  }

  if (Number.isNaN(propertyId)) {
    return fallbackMetadata
  }

  const property = getPropertyById(propertyId)

  if (!property) {
    return fallbackMetadata
  }

  const description = buildPropertyDescription(property)
  const propertyUrl = `${siteUrl}/propiedad/${property.id}`
  const ogImage = toAbsoluteUrl(property.image || property.images?.[0] || fallbackImage)

  // CAMBIO: metadata dinamica por propiedad con canonical y OG por imagen principal.
  // RAZÓN: mejora indexacion y compartido social para cada detalle individual.
  return {
    metadataBase: new URL(siteUrl),
    title: `${property.title} | SOMOS Properties`,
    description,
    alternates: {
      canonical: propertyUrl,
    },
    openGraph: {
      title: property.title,
      description,
      type: "website",
      url: propertyUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
      siteName: "SOMOS Properties",
    },
    twitter: {
      card: "summary_large_image",
      title: property.title,
      description,
      images: [ogImage],
      creator: "@SomosProperties",
    },
  }
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
