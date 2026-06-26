import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { createMetadata } from "@/lib/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.terms' })

  return createMetadata({
    title: t('title'),
    description: t('description'),
    path: '/terminos',
    locale,
  })
}

export default async function TerminosPage() {
  const t = await getTranslations('terms')

  return (
    <>
      <div className="min-h-screen bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[#222222] mb-2">{t('title')}</h1>
            <p className="text-[#999999]">{t('lastUpdated')}</p>
          </div>

          <div className="prose prose-sm max-w-none text-[#555555] space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">{t('sections.1.title')}</h2>
              <p>
                {t('sections.1.p1')}
                <Link href="/" className="text-[#3898EC] hover:underline">www.somosproperties.com</Link>
                {t('sections.1.p2')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">{t('sections.2.title')}</h2>
              <p>{t('sections.2.intro')}</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <li key={i}>{t(`sections.2.list.${i}`)}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">{t('sections.3.title')}</h2>
              <p>{t('sections.3.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">{t('sections.4.title')}</h2>
              <p>{t('sections.4.intro')}</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                {[0, 1, 2].map((i) => (
                  <li key={i}>{t(`sections.4.list.${i}`)}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">{t('sections.5.title')}</h2>
              <p>{t('sections.5.intro')}</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                {[0, 1, 2].map((i) => (
                  <li key={i}>{t(`sections.5.list.${i}`)}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">{t('sections.6.title')}</h2>
              <p className="font-semibold text-[#333333]">
                {t('sections.6.disclaimer')}
              </p>
              <p className="mt-3">{t('sections.6.intro')}</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i}>{t(`sections.6.list.${i}`)}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">{t('sections.7.title')}</h2>
              <p>{t('sections.7.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">{t('sections.8.title')}</h2>
              <p>{t('sections.8.intro')}</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i}>{t(`sections.8.list.${i}`)}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">{t('sections.9.title')}</h2>
              <p>{t('sections.9.intro')}</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                {[0, 1, 2].map((i) => (
                  <li key={i}>{t(`sections.9.list.${i}`)}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">{t('sections.10.title')}</h2>
              <p>{t('sections.10.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">{t('sections.11.title')}</h2>
              <p>{t('sections.11.content')}</p>
            </section>

            <section className="bg-[#f9f9f9] p-6 rounded-lg border border-[#eeeeee]">
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">{t('sections.12.title')}</h2>
              <p className="mb-4">
                {t('sections.12.intro')}
              </p>
              <div className="space-y-2">
                <p><strong>{t('sections.12.emailLabel')}</strong> <a href="mailto:ventas@somosproperties.com" className="text-[#3898EC] hover:underline">ventas@somosproperties.com</a></p>
                <p><strong>{t('sections.12.phoneLabel')}</strong> +507 6777-0577</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
