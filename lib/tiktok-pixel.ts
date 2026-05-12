const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || ""

export const initTikTokPixel = () => {
  if (typeof window === "undefined" || !TIKTOK_PIXEL_ID || TIKTOK_PIXEL_ID === "YOUR_TIKTOK_PIXEL_ID") return

  // Cargar el script del TikTok Pixel
  const script = document.createElement("script")
  script.type = "text/javascript"
  script.async = true
  script.src = `https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${TIKTOK_PIXEL_ID}&lib=ttq`
  const firstScript = document.getElementsByTagName("script")[0]
  firstScript.parentNode?.insertBefore(script, firstScript)

  // Inicializar después de cargar
  script.onload = () => {
    if (window.ttq) {
      window.ttq.load(TIKTOK_PIXEL_ID)
      window.ttq.page()
    }
  }
}

export const trackTikTokEvent = (eventName: string, data?: Record<string, unknown>) => {
  if (typeof window === "undefined" || !TIKTOK_PIXEL_ID || TIKTOK_PIXEL_ID === "YOUR_TIKTOK_PIXEL_ID") return

  if (window.ttq) {
    window.ttq.track(eventName, data)
  }
}

export const trackTikTokPageView = () => {
  if (typeof window === "undefined" || !TIKTOK_PIXEL_ID || TIKTOK_PIXEL_ID === "YOUR_TIKTOK_PIXEL_ID") return

  if (window.ttq) {
    window.ttq.page()
  }
}
