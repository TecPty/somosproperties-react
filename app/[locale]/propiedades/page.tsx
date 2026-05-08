import type { Metadata } from "next"
import { Suspense } from "react"
import { getTranslations } from "next-intl/server"
import PropiedadesContent from "./propiedades-content"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.propiedades' })
  
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://somosproperties.com/${locale}/propiedades`,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: "website",
      url: `https://somosproperties.com/${locale}/propiedades`,
      siteName: "SOMOS Properties",
    },
  }
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
