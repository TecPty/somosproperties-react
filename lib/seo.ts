export const siteConfig = {
  name: "SOMOS Properties",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://somosproperties.com",
  description: "Encuentra tu propiedad ideal en Panamá. Apartamentos y locales en venta y alquiler.",
  ogImage: "/images/logo-somosproperties-1200x630px.png",
  creator: "@SomosProperties",
  keywords: [
    "propiedades en Panamá",
    "bienes raíces Panamá",
    "apartamentos en venta",
    "locales comerciales",
    "alquiler Panamá",
    "real estate Panama",
    "homes for sale Panama",
    "apartments Panama City",
  ],
}

// Optimized keywords by category for better targeting
export const categoryKeywords = {
  Residencial: [
    "apartamentos en Panamá",
    "casas en venta Panamá",
    "viviendas en alquiler",
    "pisos Panamá",
    "viviendas residenciales",
    "departamentos Panamá",
  ],
  Comercial: [
    "locales comerciales Panamá",
    "oficinas en Panamá",
    "espacios comerciales",
    "alquiler comercial",
    "locales para negocios",
    "propiedades comerciales",
  ],
}

export const metadataBase = new URL(siteConfig.url)

export function createMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
  keywords,
}: {
  title: string
  description?: string
  path?: string
  image?: string
  noIndex?: boolean
  keywords?: string[]
}) {
  const url = `${siteConfig.url}${path}`
  const ogImage = image || siteConfig.ogImage
  const metaKeywords = keywords || siteConfig.keywords

  return {
    metadataBase,
    title,
    description: description || siteConfig.description,
    keywords: metaKeywords,
    ...(noIndex && { robots: { index: false, follow: false } }),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title,
      description: description || siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description || siteConfig.description,
      creator: siteConfig.creator,
      images: [ogImage],
    },
  }
}
