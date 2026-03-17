/**
 * Lógica de Carga de Promociones
 * 
 * Funciones para obtener promociones de una propiedad con verificación
 * de existencia de archivos en el servidor.
 */

import { existsSync } from 'fs'
import { join } from 'path'
import type { Promotion } from '@/types/promotions'
import {
  getPropertySlugById,
  getSharedPromotionsForSlug,
  PROMOTION_NAMING_CONVENTIONS,
} from './promotions-config'

/**
 * Obtiene todas las promociones para una propiedad específica
 * 
 * Combina:
 * 1. Promociones específicas de la propiedad (si existen archivos)
 * 2. Promociones compartidas aplicables
 * 
 * @param propertyId - ID numérico de la propiedad
 * @returns Array de promociones disponibles (verificadas en disco)
 */
export async function getPromotionsForProperty(propertyId: number): Promise<Promotion[]> {
  const slug = getPropertySlugById(propertyId)
  
  if (!slug) {
    console.warn(`[Promotions] No slug found for property ID: ${propertyId}`)
    return []
  }

  console.log(`[Promotions] Processing property ${propertyId} (${slug})`)
  const promotions: Promotion[] = []

  // 1. Verificar promoción específica de la propiedad
  const propertyPromotion = await getPropertySpecificPromotion(slug)
  if (propertyPromotion) {
    console.log(`[Promotions] ✓ Found property-specific promotion for ${slug}`)
    promotions.push(propertyPromotion)
  } else {
    console.log(`[Promotions] ✗ No property-specific promotion for ${slug}`)
  }

  // 2. Obtener promociones compartidas
  const sharedPromotions = getSharedPromotionsForSlug(slug)
  for (const sharedConfig of sharedPromotions) {
    // Verificar existencia de archivos compartidos
    const desktopExists = verifyImageExists(sharedConfig.images.desktop)
    const mobileExists = verifyImageExists(sharedConfig.images.mobile)

    if (desktopExists && mobileExists) {
      promotions.push({
        id: sharedConfig.id,
        title: sharedConfig.title,
        type: 'shared',
        images: sharedConfig.images,
        validUntil: sharedConfig.validUntil,
      })
    } else {
      console.warn(
        `[Promotions] Missing images for shared promotion: ${sharedConfig.id} (desktop: ${desktopExists}, mobile: ${mobileExists})`
      )
    }
  }

  return promotions
}

/**
 * Obtiene la promoción específica de una propiedad
 * Solo retorna si ambos archivos (desktop + mobile) existen
 */
async function getPropertySpecificPromotion(slug: string): Promise<Promotion | null> {
  const desktopPath = PROMOTION_NAMING_CONVENTIONS.propertySpecific.desktop(slug)
  const mobilePath = PROMOTION_NAMING_CONVENTIONS.propertySpecific.mobile(slug)

  console.log(`[Promotions] Checking files for ${slug}:`)
  console.log(`  Desktop: ${desktopPath}`)
  console.log(`  Mobile: ${mobilePath}`)

  const desktopExists = verifyImageExists(desktopPath)
  const mobileExists = verifyImageExists(mobilePath)

  console.log(`  Desktop exists: ${desktopExists}`)
  console.log(`  Mobile exists: ${mobileExists}`)

  if (!desktopExists || !mobileExists) {
    console.log(`[Promotions] Missing images for ${slug}`)
    return null
  }

  console.log(`[Promotions] All images found for ${slug}!`)

  return {
    id: `${slug}-specific`,
    title: `Promoción especial para ${slug}`,
    type: 'property-specific',
    images: {
      desktop: desktopPath,
      mobile: mobilePath,
      thumbnail: mobilePath, // Usamos mobile como thumbnail
    },
    propertySlug: slug,
  }
}

/**
 * Verifica si una imagen existe en el sistema de archivos
 * 
 * @param imagePath - Ruta de imagen relativa a /public/ (ejemplo: '/images/...')
 * @returns true si el archivo existe
 */
function verifyImageExists(imagePath: string): boolean {
  // Convertir ruta pública a ruta del sistema de archivos
  // imagePath viene como '/images/properties/...'
  // Debemos buscar en 'public/images/properties/...'
  const publicDir = join(process.cwd(), 'public')
  const fullPath = join(publicDir, imagePath)

  return existsSync(fullPath)
}

/**
 * Helper para debugging: Lista todas las promociones disponibles
 */
export async function debugListAllPromotions(): Promise<Record<number, Promotion[]>> {
  const debug: Record<number, Promotion[]> = {}
  
  // Puedes expandir esto para iterar todas las propiedades
  // Por ahora solo un ejemplo con IDs conocidos
  const testIds = [1, 2, 3, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17]
  
  for (const id of testIds) {
    debug[id] = await getPromotionsForProperty(id)
  }
  
  return debug
}
