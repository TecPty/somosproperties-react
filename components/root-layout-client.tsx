"use client"

import { ReactNode } from "react"
import { GoogleAnalytics } from "@next/third-parties/google"
import AnalyticsProvider from "@/components/analytics-provider"
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
      {gaId && gaId !== "G-XXXXXXXXXX" && <GoogleAnalytics gaId={gaId} />}
    </>
  )
}
