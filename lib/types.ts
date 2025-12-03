export interface Property {
  id: number
  title: string
  type: "Apartamento" | "Casa" | "Local" | "Terreno"
  category: "Residencial" | "Comercial"
  operation: "Venta" | "Alquiler"
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
  planos?: string[]
  description: string
  amenities: string[]
  featured: boolean
  status: "available" | "sold" | "rented"
}

export interface PropertyFilters {
  operation?: "Venta" | "Alquiler"
  types?: string[]
  priceMin?: number
  priceMax?: number
  bedrooms?: number
  location?: string
  category?: "Residencial" | "Comercial"
  search?: string
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  consultationType: string
  message: string
  terms: boolean
}
