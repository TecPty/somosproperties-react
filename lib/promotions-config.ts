/**
 * Configuración Central del Sistema de Promociones
 * 
 * Este archivo centraliza:
 * - Mapeo slug ↔ property ID
 * - Promociones compartidas entre múltiples propiedades
 * - Configuración de rutas y convenciones
 */

import type { PropertySlugMapping, SharedPromotionConfig } from '@/types/promotions'

/**
 * MAPEO SLUG → PROPERTY ID
 * 
 * Vincula los slugs de carpetas con los IDs numéricos del sistema.
 * IMPORTANTE: Mantener sincronizado con los datos de propiedades.
 */
export const PROPERTY_SLUG_MAPPINGS: PropertySlugMapping[] = [
  { slug: 'kings-park', id: 1, name: 'Kings Park - Torre 500, Apto 3-B' },
  { slug: 'kings-park', id: 238, name: 'Kings Park - Torre 500, Apto 10-B' },
  { slug: 'torre-azul', id: 2, name: 'Torre Azul' },
  { slug: 'residencial-verde', id: 3, name: 'Residencial Verde' },
  { slug: 'plaza-central', id: 4, name: 'Plaza Central' },
  { slug: 'evolution-tower', id: 5, name: 'Evolution Tower' },
  { slug: 'new-west', id: 6, name: 'New West' },
  { slug: 'pacific-point', id: 7, name: 'Pacific Point' },
  { slug: 'playa-escondida', id: 8, name: 'Playa Escondida' },
  { slug: 'praderas-de-arraijan', id: 9, name: 'Praderas de Arraiján' },
  { slug: 'rali', id: 10, name: 'Rali' },
  { slug: 'sunset-strip', id: 11, name: 'Sunset Strip' },
  { slug: 'the-towers-business-plaza', id: 12, name: 'The Towers Business Plaza' },
  { slug: 'the-towers-residences', id: 13, name: 'The Towers Residences' },
  { slug: 'balboa-boutique', id: 14, name: 'Balboa Boutique' },
  { slug: 'boulevard-plaza', id: 15, name: 'Boulevard Plaza' },
  { slug: 'central-plaza', id: 16, name: 'Central Plaza' },
  { slug: 'plaza-guayacanes', id: 17, name: 'Plaza Guayacanes' },
  // Agregar más según sea necesario
]

/**
 * PROMOCIONES COMPARTIDAS
 * 
 * Define promociones que se muestran en múltiples propiedades.
 * Evita duplicar archivos de imagen.
 * 
 * Estructura en disco:
 * /public/images/promotions/shared/{promo-id}/
 *   ├── desktop.png
 *   ├── mobile.png
 */
export const SHARED_PROMOTIONS: SharedPromotionConfig[] = [
  {
    id: 'financiamiento-30-anos',
    title: 'Financiamiento hasta 30 años - Tasa preferencial',
    propertySlugs: [
      'kings-park',
      'evolution-tower',
      'new-west',
      'pacific-point',
      'the-towers-residences',
    ],
    images: {
      desktop: '/images/promotions/shared/financiamiento-30-anos/desktop.png',
      mobile: '/images/promotions/shared/financiamiento-30-anos/mobile.png',
      thumbnail: '/images/promotions/shared/financiamiento-30-anos/mobile.png',
    },
    // validUntil: new Date('2026-12-31'), // Ejemplo: promoción con fecha de expiración
  },
  {
    id: 'areas-sociales-premium',
    title: 'Áreas sociales premium incluidas',
    propertySlugs: [
      'evolution-tower',
      'the-towers-residences',
      'balboa-boutique',
    ],
    images: {
      desktop: '/images/promotions/shared/areas-sociales-premium/desktop.png',
      mobile: '/images/promotions/shared/areas-sociales-premium/mobile.png',
      thumbnail: '/images/promotions/shared/areas-sociales-premium/mobile.png',
    },
  },
  // Agregar más promociones compartidas aquí
]

/**
 * CONVENCIONES DE NOMENCLATURA
 * 
 * Patrones de nombres para promociones específicas de propiedad
 */
export const PROMOTION_NAMING_CONVENTIONS = {
  propertySpecific: {
    desktop: (slug: string) => `/images/properties/${slug}/promotional/modal-desktop-${slug}.png`,
    mobile: (slug: string) => `/images/properties/${slug}/promotional/modal-mobile-${slug}.png`,
  },
} as const

/**
 * Helpers para buscar en configuración
 */

export function getPropertyIdBySlug(slug: string): number | null {
  const mapping = PROPERTY_SLUG_MAPPINGS.find((m) => m.slug === slug)
  return mapping?.id ?? null
}

export function getPropertySlugById(id: number): string | null {
  const mapping = PROPERTY_SLUG_MAPPINGS.find((m) => m.id === id)
  return mapping?.slug ?? null
}

export function getSharedPromotionsForSlug(slug: string): SharedPromotionConfig[] {
  return SHARED_PROMOTIONS.filter((promo) => {
    // Filtrar promociones expiradas
    if (promo.validUntil && promo.validUntil < new Date()) {
      return false
    }
    return promo.propertySlugs.includes(slug)
  })
}
