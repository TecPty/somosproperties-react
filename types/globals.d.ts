// Global type declarations for third-party window APIs

declare global {
  interface Window {
    // Google Analytics / Google Ads (gtag.js)
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void

    // Meta Pixel (fbq)
    fbq: (action: string, event: string, params?: Record<string, unknown>) => void
    _fbq: typeof window.fbq

    // TikTok Pixel (ttq)
    ttq: {
      track: (event: string, params?: Record<string, unknown>) => void
      page: () => void
      load: (pixelId: string) => void
      identify: (params: Record<string, unknown>) => void
    }

    // LinkedIn Pixel
    lintrk: (action: string, params?: Record<string, unknown>) => void
    _linkedin_data_partner_ids: string[]
  }
}

export {}
