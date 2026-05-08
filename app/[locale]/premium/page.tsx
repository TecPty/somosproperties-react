import type { Metadata } from "next"
import { Suspense } from "react"
import { getTranslations } from "next-intl/server"
import PremiumContent from "./premium-content"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.premium' })
  const tPremium = await getTranslations({ locale, namespace: 'premium' })
  
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://somosproperties.com/${locale}/premium`,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: "website",
      url: `https://somosproperties.com/${locale}/premium`,
      siteName: "SOMOS Properties",
    },
  }
}

export default async function PremiumPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'premium' })
  
  return (
    <Suspense fallback={<div className="py-12 text-center">{t('hero.title')}...</div>}>
      <PremiumContent />
    </Suspense>
  )
}
