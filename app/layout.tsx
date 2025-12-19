import type React from "react"
import type { Metadata } from "next"
import { GoogleAnalytics } from "@next/third-parties/google"
import ChristmasModal from "@/components/christmas-modal"
import WhatsAppButton from "@/components/whatsapp-button"
import FacebookPixelProvider from "@/components/facebook-pixel-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "SOMOS Properties - Propiedades en Panamá",
  description: "Encuentra tu propiedad ideal en Panamá. Apartamentos y locales en venta y alquiler.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
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
        <FacebookPixelProvider />
        <ChristmasModal />
        {children}
        <WhatsAppButton />
        {gaId && gaId !== "G-XXXXXXXXXX" && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  )
}
