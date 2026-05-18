// Global type declarations for third-party window APIs

declare global {
  interface FbqFunction {
    (...args: unknown[]): void
    callMethod?: (...args: unknown[]) => void
    queue: unknown[]
    loaded?: boolean
    version?: string
  }

  interface Window {
    // Google Analytics / Google Ads (gtag.js)
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void

    // Meta Pixel (fbq)
    fbq?: FbqFunction
    _fbq?: FbqFunction

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
