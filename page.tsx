// filepath: c:\Users\HP 15\somosproperties-react\app\propiedad\[id]\page.tsx
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import type { Property } from "@/lib/types"
import { properties as allPropertiesData } from "@/lib/properties"
import PropertyDetails from "@/components/property-details"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://somosproperties.com"

const getPropertyById = (id: string): Property | undefined => {
  const propertyId = Number.parseInt(id, 10)
  if (Number.isNaN(propertyId)) return undefined
  return allPropertiesData.find((p) => p.id === propertyId)
}

const formatPrice = (property: Property): string => {
  return property.operation === "Venta"
    ? `$${property.price.toLocaleString()}`
    : `$${property.pricePerMonth?.toLocaleString() || 0}/mes`
}

const generateDescription = (property: Property): string => {
  return `${property.title} en ${property.location}. ${property.bedrooms} habitaciones, ${property.bathrooms} baños. ${formatPrice(property)}. ${property.description}`.substring(0, 160)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const property = getPropertyById(id)

  if (!property) {
    return {
      title: "Propiedad no encontrada",
      description: "La propiedad que buscas no existe.",
    }
  }

  const description = generateDescription(property)

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

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const property = getPropertyById(id)

  if (!property) {
    notFound()
  }

  const similarProperties = allPropertiesData
    .filter(
      (p) =>
        p.id !== property.id &&
        p.category === property.category &&
        p.district === property.district
    )
    .slice(0, 3)

  return <PropertyDetails property={property} similarProperties={similarProperties} />
}