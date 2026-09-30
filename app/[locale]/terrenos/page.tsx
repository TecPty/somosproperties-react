import type { Metadata } from "next"
import { Suspense } from "react"
import { getTranslations } from "next-intl/server"
import { createMetadata } from "@/lib/seo"
import TerrenosContent from "./terrenos-content"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.terrenos' })
  
  return createMetadata({
    title: t('title'),
    description: t('description'),
    path: "/terrenos",
    locale
  })
}

export default async function TerrenosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'terrenos' })
  
  return (
    <Suspense fallback={<div className="py-12 text-center">{t('loading')}</div>}>
      <TerrenosContent />
    </Suspense>
  )
}
