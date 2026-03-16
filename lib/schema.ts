/**
 * Schema.org JSON-LD generators for structured data
 * Improves SEO and enables rich snippets in search results
 */

import type { Property } from "./types"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://somosproperties.com"

/**
 * Organization schema for homepage and global markup
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": baseUrl,
    name: "SOMOS Properties",
    url: baseUrl,
    logo: `${baseUrl}/images/Logo-SP.png`,
    description: "Encuentra tu propiedad ideal en Panamá. Apartamentos y locales en venta y alquiler.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/propiedades?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Panamá",
        "@id": "https://www.wikidata.org/wiki/Q804",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      telephone: "+507-XXXX-XXXX",
    },
    sameAs: [
      "https://www.facebook.com/somosproperties",
      "https://www.instagram.com/somosproperties",
      "https://www.linkedin.com/company/somosproperties",
    ],
  }
}

/**
 * Property Listing schema for individual properties
 * Enables rich snippets with images, price, and details
 */
export function getPropertyListingSchema(property: Property, imageUrl?: string) {
  const price =
    property.operation === "Venta"
      ? property.price
      : property.pricePerMonth || 0

  const priceCurrency = "USD"
  const priceValidUntil = new Date()
  priceValidUntil.setDate(priceValidUntil.getDate() + 90) // Valid for 90 days

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "PropertyListing",
    "@id": `${baseUrl}/propiedad/${property.id}`,
    name: property.title,
    description: property.description,
    url: `${baseUrl}/propiedad/${property.id}`,
    image: imageUrl || property.image || `${baseUrl}/placeholder.svg`,
    datePublished: new Date().toISOString(),
    priceCurrency,
    price: price.toString(),
    priceValidUntil: priceValidUntil.toISOString(),
    availability:
      property.status === "available"
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    location: {
      "@type": "Place",
      name: property.location,
      address: {
        "@type": "PostalAddress",
        streetAddress: property.location,
        addressRegion: property.district,
        addressLocality: property.city,
        addressCountry: "PA",
      },
    },
  }

  // Add real estate specific details
  if (property.bedrooms > 0) {
    schema.numberOfRooms = property.bedrooms
  }

  if (property.bathrooms > 0) {
    schema.numberOfBathroomsTotal = property.bathrooms
  }

  if (property.area) {
    schema.floorSize = {
      "@type": "QuantitativeValue",
      value: property.area,
      unitCode: "MTK", // Square meter
    }
  }

  if (property.parkingSpots > 0) {
    schema.parkingCount = property.parkingSpots
  }

  // Type of property
  const typeMap: Record<string, string> = {
    Apartamento: "Apartment",
    Casa: "House",
    Local: "CommercialProperty",
    "Oficina": "Office",
    "Lote": "Land",
    "Único": "SingleFamilyResidence",
  }

  if (property.type && typeMap[property.type]) {
    schema.propertyType = typeMap[property.type]
  }

  // Operation type (sale or rent)
  const listingType =
    property.operation === "Venta" ? "For Sale" : "For Rent"

  schema.inLanguage = "es"
  schema.breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: property.category || "Propiedades",
        item: `${baseUrl}/${
          property.category === "Residencial"
            ? "residenciales"
            : "comerciales"
        }`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: property.title,
        item: `${baseUrl}/propiedad/${property.id}`,
      },
    ],
  }

  return schema
}

/**
 * Breadcrumb List schema for navigation structure
 */
export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${baseUrl}${item.url}`,
    })),
  }
}

/**
 * Local Business schema for contact pages
 */
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "SOMOS Properties",
    image: `${baseUrl}/images/Logo-SP.png`,
    description: "Agencia de bienes raíces en Panamá",
    url: baseUrl,
    telephone: "+507-XXXX-XXXX",
    email: "info@somosproperties.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Panama City",
      addressRegion: "PA",
      addressCountry: "PA",
    },
    areaServed: {
      "@type": "City",
      name: "Panamá",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "+507-XXXX-XXXX",
      email: "info@somosproperties.com",
    },
  }
}

/**
 * Collection/Aggregate schema for category pages
 * Shows price aggregation (min, max, average)
 */
export function getCollectionSchema(
  properties: Property[],
  category: string,
  path: string
) {
  if (properties.length === 0) return null

  const prices = properties
    .map((p) => (p.operation === "Venta" ? p.price : p.pricePerMonth || 0))
    .filter((p): p is number => typeof p === "number")

  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category,
    url: `${baseUrl}${path}`,
    description: `Propiedades ${category.toLowerCase()} en Panamá`,
    itemListElement: properties.slice(0, 10).map((property, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: `${baseUrl}/propiedad/${property.id}`,
      name: property.title,
      image: property.image,
      price: String(
        property.operation === "Venta"
          ? property.price
          : property.pricePerMonth || 0
      ),
    })),
    aggregateOffer: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: String(minPrice),
      highPrice: String(maxPrice),
      offerCount: properties.length,
    },
  }
}

/**
 * FAQ schema for structured FAQ sections
 */
export function getFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

/**
 * Video schema for embedded property videos/tours
 */
export function getVideoSchema(
  title: string,
  description: string,
  thumbnailUrl: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: title,
    description,
    thumbnailUrl: thumbnailUrl,
    uploadDate: new Date().toISOString(),
    duration: "PT1M", // Adjust as needed
  }
}
