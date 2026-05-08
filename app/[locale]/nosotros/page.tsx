import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import OptimizedImage from "@/components/optimized-image"
import Link from "next/link"
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.about' })
  
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function NosotrosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })

  const featureCards = [
    {
      title: t('whyChooseUs.features.0.title'),
      desc: t('whyChooseUs.features.0.desc'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3898EC]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6l-9-4Zm0 2.18 5 2.22V12c0 3.87-2.69 7.19-6 8-3.31-.81-6-4.13-6-8V6.4l5-2.22Z" />
          <path d="M11 7h2v6h-2Zm0 8h2v2h-2Z" />
        </svg>
      ),
    },
    {
      title: t('whyChooseUs.features.1.title'),
      desc: t('whyChooseUs.features.1.desc'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3898EC]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-3.33 0-6 1.34-6 3v1h12v-1c0-1.66-2.67-3-6-3Z" />
          <path d="M17 14.5a4.5 4.5 0 0 1 4.5 4.5h-2a2.5 2.5 0 0 0-2.5-2.5Z" />
        </svg>
      ),
    },
    {
      title: t('whyChooseUs.features.2.title'),
      desc: t('whyChooseUs.features.2.desc'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3898EC]" viewBox="0 0 24 24" fill="currentColor">
          <path d="m10 14 8.49-8.48 1.41 1.41L10 16.82l-6.36-6.36 1.41-1.41Z" />
        </svg>
      ),
    },
    {
      title: t('whyChooseUs.features.3.title'),
      desc: t('whyChooseUs.features.3.desc'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3898EC]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1 3 5v6c0 5 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5Zm7 10c0 4.35-2.83 8.57-7 9.93C7.83 19.57 5 15.35 5 11V6.3L12 3l7 3.3Z" />
          <path d="M11 7h2v2h2v2h-2v2h-2v-2H9V9h2Z" />
        </svg>
      ),
    },
  ]

  const valueBullets = [
    t('values.bullets.0'),
    t('values.bullets.1'),
    t('values.bullets.2'),
    t('values.bullets.3'),
  ]

  return (
    <>
      <Navbar />

      <main className="bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-0">
            <OptimizedImage
              src="/images/nosotros/hero-0.webp"
              alt="Equipo Somos Properties"
              type="hero"
              fill
              priority
              blur={false}
              objectPosition="50% 45%"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/65 via-white/25 to-transparent" />
          </div>
          <div className="container-custom relative py-14 lg:py-16">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-end">
              <div className="text-[#0f172a] max-w-2xl">
                <div className="inline-flex items-center rounded-full bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#0a7cd4]">
                  {t('hero.tag')}
                </div>
                <h1 className="mt-4 text-4xl lg:text-5xl font-bold drop-shadow-sm">{t('hero.title')}</h1>
                <p className="mt-3 text-lg text-[#1e293b] drop-shadow-sm">{t('hero.subtitle')}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/${locale}/contacto`}
                    className="rounded-lg bg-[#3898EC] text-white px-5 py-3 font-semibold hover:bg-[#2e8adb] transition shadow-sm"
                  >
                    {t('hero.talkBtn')}
                  </Link>
                  <Link
                    href={`/${locale}/propiedades`}
                    className="rounded-lg border border-[#dbe7f3] px-5 py-3 font-semibold text-[#0f3d63] hover:bg-[#f5f9fd] transition"
                  >
                    {t('hero.portfolioBtn')}
                  </Link>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end items-end">
                <div className="relative w-full max-w-[320px] lg:max-w-[360px] flex justify-center pb-2">
                  <OptimizedImage
                    src="/images/logo-somosproperties-250x250px-transparente.png"
                    alt="Logo SOMOS Properties"
                    type="small"
                    width={360}
                    height={360}
                    priority
                    blur={false}
                    className="h-auto w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-16 bg-white rounded-t-[48px]" />
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-[#222222] mb-4">{t('whoWeAre.title')}</h2>
              <p className="text-lg text-[#333333] leading-relaxed mb-6">
                {t('whoWeAre.content')}
              </p>

              <h2 className="text-3xl font-bold text-[#222222] mb-4 mt-10">{t('mission.title')}</h2>
              <p className="text-lg text-[#333333] leading-relaxed">
                {t('mission.content')}
              </p>
            </div>
          </div>
        </section>

        {/* Why choose us */}
        <section className="pb-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-[#222222] mb-6">{t('whyChooseUs.title')}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {featureCards.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[#e8eef5] bg-[#f7fafc] p-5 shadow-sm hover:shadow-md transition"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[#222222] mb-1">{item.title}</h3>
                  <p className="text-sm text-[#444444] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="pb-20">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-2 items-end">
              <div className="rounded-2xl border border-[#e6edf5] bg-white p-8 shadow-sm">
                <h2 className="text-3xl font-bold text-[#222222] mb-4">{t('values.title')}</h2>
                <p className="text-lg text-[#333333] leading-relaxed mb-4">
                  {t('values.content')}
                </p>
                <ul className="space-y-3">
                  {valueBullets.map((v) => (
                    <li key={v} className="flex items-start gap-3 text-[#222222]">
                      <span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#3898EC]" />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/${locale}/contacto`}
                    className="rounded-lg bg-[#3898EC] px-5 py-3 font-semibold text-white hover:bg-[#2e8adb] transition"
                  >
                    {t('values.callBtn')}
                  </Link>
                  <Link
                    href={`/${locale}/propiedades`}
                    className="rounded-lg border border-[#dbe7f3] px-5 py-3 font-semibold text-[#0f3d63] hover:bg-[#f5f9fd] transition"
                  >
                    {t('values.portfolioBtn')}
                  </Link>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[720px] bg-transparent p-6 self-end lg:-translate-y-10">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#e5f2ff] to-[#f5f9ff] blur-2xl" />
                  <OptimizedImage
                    src="/images/nosotros/nosotros-equipo.webp"
                    alt="Equipo SOMOS Properties"
                    type="hero"
                    width={720}
                    height={720}
                    priority
                    blur={false}
                    className="relative z-10 h-auto w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
