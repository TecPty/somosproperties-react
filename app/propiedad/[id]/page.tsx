import { notFound } from "next/navigation"
import type { Metadata } from "next"
import type { Property } from "@/lib/types"
import { properties as allPropertiesData } from "@/lib/properties"
import PropertyDetails from "@/components/property-details"
import { getPropertyPromotions } from "@/lib/promotions"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://somosproperties.com"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const propertyId = Number.parseInt(id, 10)

  if (Number.isNaN(propertyId)) {
    return {
      title: "Propiedad no encontrada",
      description: "La propiedad que buscas no existe.",
    }
  }

  const allProperties: Property[] = allPropertiesData
  const property = allProperties.find((p) => p.id === propertyId && !p.hidden)

  if (!property) {
    return {
      title: "Propiedad no encontrada",
      description: "La propiedad que buscas no existe.",
    }
  }

  const price =
    property.operation === "Venta"
      ? `$${property.price.toLocaleString()}`
      : `$${property.pricePerMonth?.toLocaleString() || 0}/mes`

  const description = `${property.title} en ${property.location}. ${property.bedrooms} habitaciones, ${property.bathrooms} baños. ${price}. ${property.description}`.substring(
    0,
    160
  )

  return {
    title: `${property.title} - SOMOS Properties`,
    description,
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      title: property.title,
      description,
      type: "website",
      url: `${baseUrl}/propiedad/${property.id}`,
      images: [
        {
          url: property.image || "/placeholder.svg",
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
      images: [property.image || "/placeholder.svg"],
      creator: "@SomosProperties",
    },
    alternates: {
      canonical: `${baseUrl}/propiedad/${property.id}`,
    },
  }
}

export default async function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const propertyId = Number.parseInt(id, 10)
  if (Number.isNaN(propertyId)) {
    notFound()
  }

  const allProperties: Property[] = allPropertiesData
  const property = allProperties.find((p) => p.id === propertyId && !p.hidden)

  if (!property) {
    notFound()
  }

  const similarProperties = allProperties
    .filter(
      (p) =>
        !p.hidden &&
        p.id !== property.id &&
        p.category === property.category &&
        p.district === property.district,
    )
    .slice(0, 3)

  // Obtener promociones para esta propiedad
  const promotions = getPropertyPromotions(property.slug || propertyId)

  return (
    <PropertyDetails 
      property={property} 
      similarProperties={similarProperties} 
      promotions={promotions}
    />
  )
}
