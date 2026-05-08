import type { Metadata } from "next"
import { Suspense } from "react"
import ComercialesContent from "./comerciales-content"

import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.comerciales' })
  
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://somosproperties.com/${locale}/comerciales`,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: "website",
      url: `https://somosproperties.com/${locale}/comerciales`,
      siteName: "SOMOS Properties",
    },
  }
}

export default async function ComercialesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'common' })

  return (
    <Suspense fallback={<div className="py-12 text-center">{t('loading')}...</div>}>
      <ComercialesContent />
    </Suspense>
  )
}

