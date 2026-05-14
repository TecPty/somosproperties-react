import type { Metadata } from "next"
import { Suspense } from "react"
import { getTranslations } from "next-intl/server"
import PremiumContent from "./premium-content"

import { createMetadata } from "@/lib/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.premium' })
  
  return createMetadata({
    title: t('title'),
    description: t('description'),
    path: "/premium",
    locale
  })
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
