import type { Metadata } from "next"
import { Suspense } from "react"
import { getTranslations } from "next-intl/server"
import { createMetadata } from "@/lib/seo"
import PropertyCategoryView from "@/components/property-category-view"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.residenciales' })
  
  return createMetadata({
    title: t('title'),
    description: t('description'),
    path: "/residenciales",
    locale
  })
}

export default async function ResidencialesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'propiedades' })

  return (
    <Suspense fallback={<div className="py-12 text-center">{t('loading')}</div>}>
      <PropertyCategoryView category="Residencial" namespace="residenciales" />
    </Suspense>
  )
}

