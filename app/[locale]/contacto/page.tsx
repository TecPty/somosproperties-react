import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { getTranslations } from "next-intl/server"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.contacto' })
  
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://somosproperties.com/${locale}/contacto`,
    },
  }
}

export default async function ContactoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contacto' })
  return (
    <>
      <Navbar />

      <main className="py-12 bg-[#fafafa] min-h-screen">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#222222] mb-4">{t('title')}</h1>
            <p className="text-lg text-[#999999]">{t('subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-card">
              <h2 className="text-2xl font-semibold text-[#222222] mb-6">{t('formHeading')}</h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <div className="bg-white p-8 rounded-lg shadow-card mb-6">
                <h2 className="text-2xl font-semibold text-[#222222] mb-6">{t('infoHeading')}</h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#3898EC] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#222222] mb-1">{t('phone')}</h3>
                      <p className="text-[#999999]">+507 6677-0577</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#3898EC] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#222222] mb-1">{t('email')}</h3>
                      <a
                        href="mailto:ventas@somosproperties.com"
                        className="text-[#3898EC] hover:underline"
                      >
                        ventas@somosproperties.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#3898EC] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#222222] mb-1">{t('address')}</h3>
                      <a
                        href="https://www.google.com/maps/place/Somos+Properties/@8.980677,-79.5244254,21z/data=!4m6!3m5!1s0x8faca9087f0a1529:0xdf82217316d458da!8m2!3d8.9806391!4d-79.5243692!16s%2Fg%2F11pz09nkcx?authuser=0&entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#3898EC] hover:underline"
                      >
                        {t('addressText')}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#3898EC] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#222222] mb-1">{t('hours')}</h3>
                      <p className="text-[#999999]">{t('hoursWeekdays')}</p>
                      <p className="text-[#999999]">{t('hoursSaturday')}</p>
                      <p className="text-[#999999]">{t('hoursSunday')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white p-8 rounded-lg shadow-card">
                <h3 className="text-xl font-semibold text-[#222222] mb-4">Nuestra Ubicación</h3>
                <div className="w-full overflow-hidden rounded-lg border border-[#eeeeee]">
                  <iframe
                    title="Mapa Somos Properties"
                    src="https://www.google.com/maps?q=8.9806391,-79.5243692&hl=es&z=18&output=embed"
                    className="w-full h-64"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
