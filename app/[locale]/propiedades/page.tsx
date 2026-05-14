import type { Metadata } from "next"
import { Suspense } from "react"
import { getTranslations } from "next-intl/server"
import { createMetadata } from "@/lib/seo"
import PropiedadesContent from "./propiedades-content"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.propiedades' })
  
  return createMetadata({
    title: t('title'),
    description: t('description'),
    path: "/propiedades",
    locale
  })
}

export default async function PropiedadesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'propiedades' })
  
  return (
    <Suspense fallback={<div className="py-12 text-center">{t('loading')}</div>}>
      <PropiedadesContent />
    </Suspense>
  )
}
