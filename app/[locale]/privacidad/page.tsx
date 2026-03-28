import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.privacy' })
  
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function PrivacidadPage() {
  const t = await getTranslations('privacy')

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[#222222] mb-2">{t('title')}</h1>
            <p className="text-[#999999]">{t('lastUpdated')}</p>
          </div>

          <div className="prose prose-sm max-w-none text-[#555555] space-y-6">
            {/* Introducción */}
            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">{t('sections.1.title')}</h2>
              <p>
                {t('sections.1.p1')}
                <Link href="/" className="text-[#3898EC] hover:underline"> www.somosproperties.com</Link> 
                {t('sections.1.p2')}
              </p>
              <p className="mt-3 text-sm font-semibold text-[#333333]">
                {t('sections.1.lawText')}
              </p>
            </section>

            {/* Datos que recopilamos */}
            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">{t('sections.2.title')}</h2>
              
              <h3 className="text-lg font-semibold text-[#333333] mb-2">{t('sections.2.sub1')}</h3>
              <ul className="list-disc pl-6 space-y-2">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i}>{t(`sections.2.list1.${i}`)}</li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-[#333333] mb-2 mt-4">{t('sections.2.sub2')}</h3>
              <ul className="list-disc pl-6 space-y-2">
                {[0, 1, 2, 3].map((i) => {
                  const item = t(`sections.2.list2.${i}`)
                  const [boldPart, rest] = item.split(': ')
                  return (
                    <li key={i}>
                      {rest ? (
                        <><strong>{boldPart}:</strong> {rest}</>
                      ) : (
                        item
                      )}
                    </li>
                  )
                })}
              </ul>
            </section>

            {/* Uso de datos */}
            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">{t('sections.3.title')}</h2>
              <ul className="list-disc pl-6 space-y-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <li key={i}>{t(`sections.3.list.${i}`)}</li>
                ))}
              </ul>
            </section>

            {/* Base legal */}
            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">{t('sections.4.title')}</h2>
              <p>{t('sections.4.intro')}</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                {[0, 1, 2, 3].map((i) => {
                  const item = t(`sections.4.list.${i}`)
                  const [boldPart, rest] = item.split(': ')
                  return (
                    <li key={i}>
                      {rest ? (
                        <><strong>{boldPart}:</strong> {rest}</>
                      ) : (
                        item
                      )}
                    </li>
                  )
                })}
              </ul>
            </section>

            {/* Compartición de datos */}
            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">{t('sections.5.title')}</h2>
              <p>{t('sections.5.intro')}</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i}>{t(`sections.5.list.${i}`)}</li>
                ))}
              </ul>
            </section>

            {/* Cookies y tracking */}
            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">{t('sections.6.title')}</h2>
              <p>
                {t('sections.6.intro')}{" "}
                <Link href="/politica-cookies" className="text-[#3898EC] hover:underline">{t('sections.6.link')}</Link> 
                {" "}{t('sections.6.outro')}
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                {[0, 1, 2].map((i) => {
                  const item = t(`sections.6.list.${i}`)
                  const [boldPart, rest] = item.split(': ')
                  return (
                    <li key={i}>
                      {rest ? (
                        <><strong>{boldPart}:</strong> {rest}</>
                      ) : (
                        item
                      )}
                    </li>
                  )
                })}
              </ul>
            </section>

            {/* Derechos */}
            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">{t('sections.7.title')}</h2>
              <p>{t('sections.7.intro')}</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                {[0, 1, 2, 3, 4].map((i) => {
                  const item = t(`sections.7.list.${i}`)
                  const [boldPart, rest] = item.split(': ')
                  return (
                    <li key={i}>
                      {rest ? (
                        <><strong>{boldPart}:</strong> {rest}</>
                      ) : (
                        item
                      )}
                    </li>
                  )
                })}
              </ul>
              <p className="mt-4">
                {t('sections.7.contactIntro')}
                <a href="mailto:privacidad@somosproperties.com" className="text-[#3898EC] hover:underline">
                  privacidad@somosproperties.com
                </a>
              </p>
            </section>

            {/* Seguridad */}
            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">{t('sections.8.title')}</h2>
              <p>{t('sections.8.intro')}</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i}>{t(`sections.8.list.${i}`)}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-[#999999]">
                {t('sections.8.disclaimer')}
              </p>
            </section>

            {/* Retención */}
            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">{t('sections.9.title')}</h2>
              <ul className="list-disc pl-6 space-y-2">
                {[0, 1, 2].map((i) => {
                  const item = t(`sections.9.list.${i}`)
                  const [boldPart, rest] = item.split(': ')
                  return (
                    <li key={i}>
                      {rest ? (
                        <><strong>{boldPart}:</strong> {rest}</>
                      ) : (
                        item
                      )}
                    </li>
                  )
                })}
              </ul>
            </section>

            {/* Cambios */}
            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">{t('sections.10.title')}</h2>
              <p>{t('sections.10.content')}</p>
            </section>

            {/* Contacto */}
            <section className="bg-[#f9f9f9] p-6 rounded-lg border border-[#eeeeee]">
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">{t('sections.11.title')}</h2>
              <p className="mb-4">
                {t('sections.11.intro')}
              </p>
              <div className="space-y-2">
                <p><strong>{t('sections.11.emailLabel')}</strong> <a href="mailto:info@somosproperties.com" className="text-[#3898EC] hover:underline">info@somosproperties.com</a></p>
                <p><strong>{t('sections.11.privacyLabel')}</strong> <a href="mailto:privacidad@somosproperties.com" className="text-[#3898EC] hover:underline">privacidad@somosproperties.com</a></p>
                <p><strong>{t('sections.11.phoneLabel')}</strong> +507 6777-0577</p>
                <p><strong>{t('sections.11.locationLabel')}</strong> Panamá, República de Panamá</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
