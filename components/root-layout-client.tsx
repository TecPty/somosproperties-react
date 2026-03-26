"use client"

import { ReactNode } from "react"
import { GoogleAnalytics } from "@next/third-parties/google"
import AnalyticsProvider from "@/components/analytics-provider"
import WhatsAppButton from "@/components/whatsapp-button"
import PerformanceProvider from "@/components/performance-provider"

interface RootLayoutClientProps {
  children: ReactNode
  gaId?: string
}

export default function RootLayoutClient({ children, gaId }: RootLayoutClientProps) {
  return (
    <>
      <PerformanceProvider />
      <AnalyticsProvider />
      {children}
      <WhatsAppButton />
      {gaId && gaId !== "G-XXXXXXXXXX" && <GoogleAnalytics gaId={gaId} />}
    </>
  )
}
