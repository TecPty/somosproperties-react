import type { Metadata } from "next"
import { Suspense } from "react"
import ResidencialesContent from "./residenciales-content"

import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.residenciales' })
  
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://somosproperties.com/${locale}/residenciales`,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: "website",
      url: `https://somosproperties.com/${locale}/residenciales`,
      siteName: "SOMOS Properties",
    },
  }
}

export default async function ResidencialesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'common' })

  return (
    <Suspense fallback={<div className="py-12 text-center">{t('loading')}...</div>}>
      <ResidencialesContent />
    </Suspense>
  )
}

