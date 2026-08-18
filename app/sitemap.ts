import { MetadataRoute } from 'next'
import { properties as allPropertiesData } from '@/lib/properties'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://somosproperties.com'
const locales = ['es', 'en'] as const

const staticPaths = [
  { path: '', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/residenciales', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/comerciales', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/propiedades', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/premium', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/nosotros', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/contacto', priority: 0.7, changeFrequency: 'monthly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = staticPaths.flatMap(({ path, priority, changeFrequency }) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    }))
  )

  const propertyRoutes: MetadataRoute.Sitemap = allPropertiesData
    .filter((property) => !property.hidden)
    .flatMap((property) =>
      locales.map((locale) => ({
        url: `${baseUrl}/${locale}/propiedad/${property.id}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
      }))
    )

  return [...staticRoutes, ...propertyRoutes]
}
