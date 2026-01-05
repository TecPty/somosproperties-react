import { useEffect } from "react"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
  }
}

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || ""

const ensurePixel = () => {
  if (typeof window === "undefined" || !PIXEL_ID) return false
  if (window.fbq) return true

  const fbq = function (...args: unknown[]) {
    fbq.callMethod ? fbq.callMethod(...args) : fbq.queue.push(args)
  } as typeof window.fbq & {
    callMethod?: (...args: unknown[]) => void
    queue: unknown[]
    loaded?: boolean
    version?: string
  }

  fbq.queue = []
  fbq.loaded = true
  fbq.version = "2.0"

  window.fbq = fbq
  window._fbq = fbq

  const script = document.createElement("script")
  script.async = true
  script.src = "https://connect.facebook.net/en_US/fbevents.js"
  document.head.appendChild(script)

  fbq("init", PIXEL_ID)
  return true
}

export const initFacebookPixel = () => {
  ensurePixel()
}

export const trackPageView = () => {
  if (!ensurePixel() || !window.fbq) return
  window.fbq("track", "PageView")
}

export const trackEvent = (eventName: string, data?: Record<string, unknown>) => {
  if (!ensurePixel() || !window.fbq) return
  window.fbq("track", eventName, data || {})
}

// Eventos personalizados para inmobiliaria
export const trackViewProperty = (propertyId: string, propertyName: string, price: number, type: string) => {
  trackEvent("ViewContent", {
    content_ids: [propertyId],
    content_name: propertyName,
    content_type: "product",
    value: price,
    currency: "USD",
    custom_property_type: type,
  })
}

export const trackSearch = (searchQuery: string) => {
  trackEvent("Search", {
    search_string: searchQuery,
  })
}

export const trackContact = (method: "whatsapp" | "phone" | "email", propertyId?: string) => {
  trackEvent("Contact", {
    contact_method: method,
    content_ids: propertyId ? [propertyId] : [],
  })
}

export const trackLead = (formName: string) => {
  trackEvent("Lead", {
    content_name: formName,
  })
}

export const useFacebookPixel = () => {
  useEffect(() => {
    initFacebookPixel()
    trackPageView()
  }, [])
}
