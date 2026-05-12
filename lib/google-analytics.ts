import { canTrack } from "@/lib/consent-utils"

const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GA_ID || ""

type GaEventParams = Record<string, unknown>

export const trackGaEvent = (eventName: string, params?: GaEventParams) => {
  if (typeof window === "undefined" || !GOOGLE_ANALYTICS_ID || GOOGLE_ANALYTICS_ID === "G-XXXXXXXXXX") return

  // ✅ Validar consentimiento antes de trackear
  if (!canTrack("analytics")) return

  if (window.gtag) {
    window.gtag("event", eventName, {
      send_to: GOOGLE_ANALYTICS_ID,
      ...(params || {}),
    })
  }
}
