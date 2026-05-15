export interface Property {
  id: number
  title: string
  type: "Apartamento" | "Casa" | "Local" | "Terreno" | "Villa" | "Oficina"
  category: "Residencial" | "Comercial"
  operation: "Venta" | "Alquiler" | "Venta/Alquiler"
  price: number
  pricePerMonth: number | null
  location: string
  city: string
  district: string
  bedrooms: number
  bathrooms: number
  parkingSpots: number
  area: number
  builtYear: number
  image: string
  images: string[]
  thumbnail?: string // Imagen cuadrada optimizada para thumbnail
  planos?: string[]
  highlights?: string[]
  virtualTour?: string
  description: string
  description_en?: string
  amenities: string[]
  minIncome?: number
  requirements?: string[]
  incentives?: string[]
  hidden?: boolean
  featured: boolean
  status: "available" | "sold" | "rented"
  tier?: "premium" | "standard"
  promo?: PromotionalFlyer
}

export interface PromotionalFlyer {
  desktop: string  // Path to desktop flyer image
  mobile: string   // Path to mobile flyer image
  headline?: string
  badge?: string
  cta?: {
    text: string
    action: "contact" | "whatsapp" | "close"
  }
  showDelay?: number  // Milliseconds before showing (default: 2000)
  showOnce?: boolean  // Show only once per session (default: true)
}

export interface PropertyFilters {
  operation?: "Venta" | "Alquiler" | "Venta/Alquiler"
  types?: string[]
  priceMin?: number
  priceMax?: number
  bedrooms?: number
  location?: string
  category?: "Residencial" | "Comercial"
  search?: string
  tier?: "premium" | "standard"
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  consultationType: string
  message: string
  terms: boolean
}
