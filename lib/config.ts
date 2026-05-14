// lib/config.ts
// Configuración centralizada de SOMOS Properties
// Última actualización: Marzo 16, 2026

/**
 * Datos de contacto
 */
export const CONTACT = {
  // WhatsApp
  whatsapp: {
    phone: "+507 6677-0577",
    raw: "50766770577", // Sin formato, para URLs
    link: "https://wa.me/50766770577",
  },

  // Email general
  email: "info@somosproperties.com",

  // Email para leads/ventas (formularios)
  sales_email: "ventas@somosproperties.com",

  // Teléfono principal
  phone: "+507 6677-0577",

  // Dirección
  address: "Vía España - Avenida Aquilino de la Guardia, Panamá",
  city: "Panamá",
  country: "República de Panamá",
} as const

/**
 * Redes sociales
 */
export const SOCIAL = {
  facebook: "https://facebook.com/somosproperties",
  instagram: "https://instagram.com/somosproperties",
  linkedin: "https://linkedin.com/company/somos-properties",
  whatsapp: CONTACT.whatsapp.link,
} as const

/**
 * Información de la empresa
 */
export const COMPANY = {
  name: "SOMOS Properties",
  tagline: "Plataforma inmobiliaria de confianza en Panamá",
  description:
    "SOMOS Properties es la plataforma líder en venta y alquiler de propiedades en Panamá. Con más de 150 propiedades certificadas y un equipo profesional dedicado.",
  website: "https://somosproperties.com",
  email: CONTACT.email,
  phone: CONTACT.phone,
  address: CONTACT.address,
} as const

/**
 * Configuraciones de UI/UX
 */
export const UI = {
  // Propiedades por página en grid
  propertiesPerPage: 12,

  // Calidad de imagen (0-100)
  imageQuality: {
    thumbnail: 60,
    card: 75,
    detail: 85,
    hero: 90,
  },

  // Breakpoints (deben coincidir con tailwind.config.ts)
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  },

  // Animaciones
  animations: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
  },
} as const

/**
 * Configuraciones de performance
 */
export const PERFORMANCE = {
  // Prefetch strategy
  prefetchStrategy: "smart", // "all" | "smart" | "none"

  // Lazy loading de imágenes
  lazyLoad: {
    enabled: true,
    threshold: 0.1, // Cuando 10% visible
  },

  // Caché de datos
  cache: {
    properties: 3600, // 1 hora en segundos
    pages: 86400, // 24 horas
  },

  // Timeout para requests
  requestTimeout: 10000, // 10 segundos
} as const

/**
 * Configuraciones de formularios
 */
export const FORMS = {
  // Tipos de consulta disponibles
  consultationTypes: [
    "Información sobre propiedad",
    "Solicitar visita",
    "Ofrecer propiedad",
    "Inversión",
    "Otro",
  ],

  // Validación
  validation: {
    nameMinLength: 2,
    phoneMinLength: 8,
    messageMinLength: 10,
  },

  // Mensajes predefinidos
  messages: {
    whatsappDefault:
      "Hola, me gustaría recibir información sobre propiedades disponibles.",
  },
} as const

/**
 * Configuración de SEO/Meta
 */
export const SEO = {
  title: "SOMOS Properties | Venta y Alquiler de Propiedades en Panamá",
  description:
    "Encuentra las mejores propiedades en venta y alquiler en Panamá. Apartamentos, casas, locales comerciales y más. Plataforma segura y confiable.",
  keywords: [
    "propiedades panamá",
    "venta de casas",
    "alquiler de apartamentos",
    "inmobiliaria panamá",
    "bienes raíces",
  ],
  ogImage: "https://somosproperties.com/og-image.webp",
  ogType: "website",
  twitterHandle: "@somosproperties",
} as const

/**
 * Rutas de la aplicación
 */
export const ROUTES = {
  home: "/",
  propiedades: "/propiedades",
  residenciales: "/residenciales",
  comerciales: "/comerciales",
  premium: "/premium",
  propiedad: (id: number | string) => `/propiedad/${id}`,
  contacto: "/contacto",
  empleo: "/empleo",
  blog: "/blog",
  nosotros: "/nosotros",
  privacidad: "/privacidad",
  terminos: "/terminos",
  politicaCookies: "/politica-cookies",
  preferenciasCookies: "/preferencias-cookies",
  card: (slug: string) => `/card/${slug}`,
} as const

/**
 * Configuración de imagen
 */
export const IMAGE_CONFIG = {
  // Dominio permitido para imágenes externas
  allowedDomains: ["somosproperties.com", "images.unsplash.com"],

  // Placeholder blur data URL (generado con imagen 10px)
  blurDataURL:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23f3f3f3' width='100' height='100'/%3E%3C/svg%3E",

  // Formatos disponibles
  formats: {
    original: "image/jpeg",
    optimized: "image/webp",
  },
} as const

/**
 * Función helper para construir URL de WhatsApp con mensaje
 */
export function buildWhatsAppUrl(message?: string): string {
  const body = message || FORMS.messages.whatsappDefault
  return `${CONTACT.whatsapp.link}?text=${encodeURIComponent(body)}`
}

/**
 * Helper para obtener número de teléfono sin formato
 */
export function getPhoneRaw(phone: string = CONTACT.phone): string {
  return phone.replace(/[^\d]/g, "")
}

/**
 * Helper para construir URL de mailto
 */
export function buildMailToUrl(
  to: string = CONTACT.email,
  subject?: string,
  body?: string,
): string {
  const params = new URLSearchParams()
  if (subject) params.append("subject", subject)
  if (body) params.append("body", body)

  const queryString = params.toString()
  return `mailto:${to}${queryString ? "?" + queryString : ""}`
}

// Validación en tiempo de importación
if (
  !CONTACT.email ||
  !CONTACT.phone ||
  !CONTACT.whatsapp.raw ||
  !COMPANY.name
) {
  console.error("❌ CONFIG: Faltan valores críticos de configuración")
}
