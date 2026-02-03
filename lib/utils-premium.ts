import type { Property } from "./types"

/**
 * Determina si una propiedad es Premium
 * Criterio: precio >= $250,000
 */
export function isPremium(property: Property): boolean {
  return Number.isFinite(property.price) && property.price >= 250000
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
