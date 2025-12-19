const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || ""

export const initGoogleAds = () => {
  if (typeof window === "undefined" || !GOOGLE_ADS_ID || GOOGLE_ADS_ID === "YOUR_GOOGLE_ADS_ID") return

  // Cargar gtag.js
  const script = document.createElement("script")
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`
  script.async = true
  document.head.appendChild(script)

  // @ts-ignore
  window.dataLayer = window.dataLayer || []
  // @ts-ignore
  function gtag() {
    // @ts-ignore
    dataLayer.push(arguments)
  }
  // @ts-ignore
  gtag("js", new Date())
  // @ts-ignore
  gtag("config", GOOGLE_ADS_ID)
}

export const trackGoogleAdsConversion = (conversionLabel: string, value?: number) => {
  if (typeof window === "undefined" || !GOOGLE_ADS_ID || GOOGLE_ADS_ID === "YOUR_GOOGLE_ADS_ID") return

  // @ts-ignore
  if (window.gtag) {
    // @ts-ignore
    window.gtag("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${conversionLabel}`,
      value: value || 0,
      currency: "USD",
    })
  }
}

export const trackGoogleAdsEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window === "undefined" || !GOOGLE_ADS_ID || GOOGLE_ADS_ID === "YOUR_GOOGLE_ADS_ID") return

  // @ts-ignore
  if (window.gtag) {
    // @ts-ignore
    window.gtag("event", eventName, params)
  }
}
