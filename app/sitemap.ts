import { MetadataRoute } from 'next'
import { properties as allPropertiesData } from '@/lib/properties'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://somosproperties.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/residenciales`,
      lastModified: new Date(), 
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/comerciales`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/propiedades`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Rutas dinámicas para propiedades
  const propertyRoutes: MetadataRoute.Sitemap = allPropertiesData
    .filter((property) => !property.hidden)
    .map((property) => ({
      url: `${baseUrl}/propiedad/${property.id}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }))

  return [...staticRoutes, ...propertyRoutes]
}
