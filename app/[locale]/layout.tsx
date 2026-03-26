import type React from "react"
import type { Metadata } from "next"
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n'

import RootLayoutClient from "@/components/root-layout-client"
import { PromotionalModal } from "@/components/promotional-modal"
import ConsentLayout from "@/components/consent-layout"

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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  // Await params en Next.js 15+
  const { locale } = await params
  
  // Validar locale
  if (!locales.includes(locale as any)) {
    notFound()
  }

  // Cargar mensajes
  const messages = await getMessages()
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ConsentLayout>
          <NextIntlClientProvider messages={messages}>
            {/* Modal promocional global navidad-2024 */}
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
          </NextIntlClientProvider>
        </ConsentLayout>
      </body>
    </html>
  )
}
