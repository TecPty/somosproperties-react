const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || ""

export const initLinkedInPixel = () => {
  if (
    typeof window === "undefined" ||
    !LINKEDIN_PARTNER_ID ||
    LINKEDIN_PARTNER_ID === "YOUR_LINKEDIN_PARTNER_ID"
  )
    return

  // @ts-ignore
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []
  // @ts-ignore
  window._linkedin_data_partner_ids.push(LINKEDIN_PARTNER_ID)

  // Cargar el script de LinkedIn Insight Tag
  // @ts-ignore
  ;(function (l) {
    if (!l) {
      // @ts-ignore
      window.lintrk = function (a, b) {
        // @ts-ignore
        window.lintrk.q.push([a, b])
      }
      // @ts-ignore
      window.lintrk.q = []
    }
    var s = document.getElementsByTagName("script")[0]
    var b = document.createElement("script")
    b.type = "text/javascript"
    b.async = true
    b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js"
    // @ts-ignore
    s.parentNode.insertBefore(b, s)
    // @ts-ignore
  })(window.lintrk)
}

export const trackLinkedInConversion = (conversionId: string) => {
  if (
    typeof window === "undefined" ||
    !LINKEDIN_PARTNER_ID ||
    LINKEDIN_PARTNER_ID === "YOUR_LINKEDIN_PARTNER_ID"
  )
    return

  // @ts-ignore
  if (window.lintrk) {
    // @ts-ignore
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

  // @ts-ignore
  if (window.lintrk) {
    // @ts-ignore
    window.lintrk("track", { event: eventName })
  }
}
