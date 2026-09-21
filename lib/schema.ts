/**
 * Schema.org JSON-LD generators for structured data
 * Improves SEO and enables rich snippets in search results
 */

import type { Property } from "./types"
import { CONTACT, SOCIAL } from "./config"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.somosproperties.com"

/**
 * Organization schema for homepage and global markup
 *
 * CAMBIO: @id ahora usa fragment (#organization) para distinguir la entidad
 * de negocio de la propia WebPage/WebSite que comparte la misma URL base.
 * Se agrega address (PostalAddress confirmada por el negocio) y email,
 * ausentes hasta ahora en la unica entidad de negocio activa del sitio.
 * RAZÓN: 001B2A — consolidar una identidad de negocio consistente para
 * motores de busqueda y sistemas de IA.
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${baseUrl}/#organization`,
    name: "SOMOS Properties",
    url: baseUrl,
    logo: `${baseUrl}/images/Logo-SP.webp`,
    description: "Encuentra tu propiedad ideal en Panamá. Apartamentos y locales en venta y alquiler.",
    telephone: "+50766770577",
    email: CONTACT.email,
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
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.postalAddress.streetAddress,
      addressLocality: CONTACT.postalAddress.addressLocality,
      addressRegion: CONTACT.postalAddress.addressRegion,
      addressCountry: CONTACT.postalAddress.addressCountry,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      telephone: "+50766770577",
    },
    sameAs: [
      "https://www.facebook.com/somosproperties",
      "https://www.instagram.com/somosproperties",
      SOCIAL.linkedin,
      SOCIAL.tiktok,
    ],
  }
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
    image: `${baseUrl}/images/Logo-SP.webp`,
    description: "Agencia de bienes raíces en Panamá",
    url: baseUrl,
    telephone: "+50766770577",
    email: "ventas@somosproperties.com",
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
      telephone: "+50766770577",
      email: "ventas@somosproperties.com",
    },
  }
}

/**
 * Collection schema for category pages
 * Represents the collection and its members, without price aggregation.
 *
 * CAMBIO: se elimino la agregacion de precios (aggregateOffer y ListItem.price).
 * RAZÓN: la coleccion mezcla ventas y alquileres mensuales, por lo que un unico
 * rango lowPrice/highPrice era semanticamente falso; ademas `|| 0` fabricaba
 * precios cero. Preferimos menos datos estructurados antes que datos falsos.
 */
export function getCollectionSchema(
  properties: Property[],
  category: string,
  path: string
) {
  if (properties.length === 0) return null

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
    })),
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
