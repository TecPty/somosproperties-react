import type React from "react"
import type { Metadata } from "next"
import { GoogleAnalytics } from "@next/third-parties/google"

import WhatsAppButton from "@/components/whatsapp-button"
import AnalyticsProvider from "@/components/analytics-provider"
import ConsentBanner from "@/components/consent-banner"
import RootLayoutClient from "@/components/root-layout-client"
import { PromotionalModal } from "@/components/promotional-modal"
import "./globals.css"

export const metadata: Metadata = {
  title: "SOMOS Properties - Propiedades en Panamá",
  description: "Encuentra tu propiedad ideal en Panamá. Apartamentos y locales en venta y alquiler.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="es" suppressHydrationWarning>
      <body className="font-sans antialiased">
        {/* CAMBIO: Modal promocional global navidad-2024 */}
        {/* RAZÓN: accesibilidad, control de frecuencia y props flexibles */}
        <PromotionalModal
          id="navidad-2024"
          showOncePerSession
          endsAt={new Date('2025-01-06')}
          desktop="/images/promo-navidad-desktop.png"
          mobile="/images/promo-navidad-mobile.png"
          badge="¡Navidad!"
          headline="Promoción especial de Navidad"
          ctaText="Solicita tu regalo"
          ctaAction="contact"
        />
        <RootLayoutClient gaId={gaId}>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  )
}
