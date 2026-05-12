const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || ""

export const initLinkedInPixel = () => {
  if (
    typeof window === "undefined" ||
    !LINKEDIN_PARTNER_ID ||
    LINKEDIN_PARTNER_ID === "YOUR_LINKEDIN_PARTNER_ID"
  )
    return

  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []
  window._linkedin_data_partner_ids.push(LINKEDIN_PARTNER_ID)

  // Cargar el script de LinkedIn Insight Tag
  ;(function (l) {
    if (!l) {
      window.lintrk = function (a, b) {
        // Queue calls until the script loads
        console.debug("[LinkedIn]", a, b)
      }
    }
    const s = document.getElementsByTagName("script")[0]
    const b = document.createElement("script")
    b.type = "text/javascript"
    b.async = true
    b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js"
    s.parentNode?.insertBefore(b, s)
  })(window.lintrk)
}

export const trackLinkedInConversion = (conversionId: string) => {
  if (
    typeof window === "undefined" ||
    !LINKEDIN_PARTNER_ID ||
    LINKEDIN_PARTNER_ID === "YOUR_LINKEDIN_PARTNER_ID"
  )
    return

  if (window.lintrk) {
    window.lintrk("track", { conversion_id: conversionId })
  }
}

export const trackLinkedInEvent = (eventName: string) => {
  if (
    typeof window === "undefined" ||
    !LINKEDIN_PARTNER_ID ||
    LINKEDIN_PARTNER_ID === "YOUR_LINKEDIN_PARTNER_ID"
  )
    return

  if (window.lintrk) {
    window.lintrk("track", { event: eventName })
  }
}
