import { useEffect } from "react"
import ReactPixel from "react-facebook-pixel"

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || ""

export const initFacebookPixel = () => {
  if (PIXEL_ID && typeof window !== "undefined") {
    ReactPixel.init(PIXEL_ID, undefined, {
      autoConfig: true,
      debug: false,
    })
  }
}

export const trackPageView = () => {
  if (PIXEL_ID) {
    ReactPixel.pageView()
  }
}

export const trackEvent = (eventName: string, data?: Record<string, unknown>) => {
  if (PIXEL_ID) {
    ReactPixel.track(eventName, data)
  }
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
