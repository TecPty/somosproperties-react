/**
 * Configuración para optimización de imágenes
 * Breakpoints responsivos y formatos soportados
 */

export const IMAGE_SIZES = {
  // Para imágenes de tarjetas de propiedades
  propertyCard: {
    mobile: 320,
    tablet: 480,
    desktop: 640,
    max: 1280,
  },
  // Para imágenes hero/banner
  hero: {
    mobile: 480,
    tablet: 960,
    desktop: 1920,
    max: 2560,
  },
  // Para thumbnails
  thumbnail: {
    mobile: 100,
    tablet: 150,
    desktop: 200,
    max: 400,
  },
  // Para avatars/pequeñas
  small: {
    mobile: 48,
    tablet: 64,
    desktop: 96,
    max: 256,
  },
} as const

/**
 * Genera srcSet responsivo para imágenes
 */
export function generateSrcSet(
  basePath: string,
  sizes: Record<string, number>,
  format: "png" | "jpg" | "webp" = "jpg"
): string {
  return Object.values(sizes)
    .filter((size) => size > 0)
    .map((size) => {
      const ext = format === "webp" ? "webp" : format
      return `${basePath}?w=${size}&q=80&fm=${ext} ${size}w`
    })
    .join(", ")
}

/**
 * Genera tamaños media query para el HTML sizes attribute
 */
export function generateSizes(
  breakpoints: {
    mobile?: number
    tablet?: number
    desktop?: number
  } = {}
): string {
  const defaults = {
    mobile: 100,
    tablet: 90,
    desktop: 80,
  }

  const sizes = { ...defaults, ...breakpoints }

  return `
    (max-width: 640px) ${sizes.mobile}vw,
    (max-width: 1024px) ${sizes.tablet}vw,
    ${sizes.desktop}vw
  `
    .trim()
    .replace(/\n\s+/g, " ")
}

/**
 * URL base para optimización (Vercel Image Optimization si está disponible)
 */
export const IMAGE_OPTIMIZATION_URL = process.env.NEXT_PUBLIC_IMAGE_OPTIMIZATION_URL || ""

/**
 * Soporte para WebP
 */
export const SUPPORTS_WEBP = true
export const DEFAULT_IMAGE_FORMAT = "webp"
export const FALLBACK_IMAGE_FORMAT = "jpg"

/**
 * Configuración de blur placeholder
 */
export const BLUR_DATA_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23f3f3f3'/%3E%3C/svg%3E"
