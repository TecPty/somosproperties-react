/**
 * Sistema de Promociones para Páginas de Propiedades
 * Tipos TypeScript para gestión de promociones específicas y compartidas
 */

/**
 * Tipo de promoción
 * - property-specific: Solo aplica a una propiedad
 * - shared: Se comparte entre múltiples propiedades
 */
export type PromotionType = 'property-specific' | 'shared'

/**
 * Imágenes de una promoción
 * Todas las rutas son relativas a /public/
 */
export interface PromotionImages {
  desktop: string      // Imagen desktop (aprox. 1200x800px)
  mobile: string       // Imagen mobile (aprox. 600x1000px, vertical)
  thumbnail: string    // Thumbnail para grid (usamos mobile por defecto)
}

/**
 * Definición de una promoción
 */
export interface Promotion {
  id: string                          // Identificador único (e.g., 'kings-park-descuento-10')
  title: string                       // Título descriptivo para alt text
  type: PromotionType                 // Tipo de promoción
  images: PromotionImages             // Rutas de imágenes
  propertySlug?: string               // Slug de propiedad (solo para type: 'property-specific')
  validUntil?: Date                   // Fecha de expiración (opcional)
}

/**
 * Configuración de una promoción compartida
 * Define qué propiedades incluyen la promoción
 */
export interface SharedPromotionConfig {
  id: string                          // ID único de la promoción compartida
  title: string                       // Título descriptivo
  propertySlugs: string[]             // Array de slugs de propiedades que la incluyen
  images: PromotionImages             // Imágenes compartidas
  validUntil?: Date                   // Fecha de expiración opcional
}

/**
 * Mapeo de slug a property ID
 * Necesario porque las carpetas usan slugs pero el sistema usa IDs numéricos
 */
export interface PropertySlugMapping {
  slug: string
  id: number
  name: string  // Nombre legible para debugging
}
