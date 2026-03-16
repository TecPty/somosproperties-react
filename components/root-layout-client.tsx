"use client"

import { ReactNode } from "react"
import { GoogleAnalytics } from "@next/third-parties/google"
import AnalyticsProvider from "@/components/analytics-provider"
import ConsentBanner from "@/components/consent-banner"
import WhatsAppButton from "@/components/whatsapp-button"
import PerformanceProvider from "@/components/performance-provider"
import { ConsentProvider } from "@/hooks/use-consent-manager"

interface RootLayoutClientProps {
  children: ReactNode
  gaId?: string
}

export default function RootLayoutClient({ children, gaId }: RootLayoutClientProps) {
  return (
    <ConsentProvider>
      <PerformanceProvider />
      <AnalyticsProvider />
      <ConsentBanner />
      {children}
      <WhatsAppButton />
      {gaId && gaId !== "G-XXXXXXXXXX" && <GoogleAnalytics gaId={gaId} />}
    </ConsentProvider>
  )
}
