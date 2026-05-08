import type { Property } from "./types"

/**
 * Determina si una propiedad es Premium
 * Criterio: Venta >= $250,000 o Alquiler >= $2,500/mes
 */
export function isPremium(property: Property): boolean {
  const salePrice = Number(property.price) || 0
  const rentPrice = Number(property.pricePerMonth) || 0
  return salePrice >= 250000 || rentPrice >= 2500
}

/**
 * Filtra propiedades premium disponibles
 */
export function getPremiumProperties(properties: Property[]): Property[] {
  return properties.filter((p) => !p.hidden && isPremium(p) && p.status === "available")
}

/**
 * Filtra propiedades estándar (no premium) disponibles
 */
export function getStandardProperties(properties: Property[]): Property[] {
  return properties.filter((p) => !p.hidden && !isPremium(p) && p.status === "available")
}
