"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import PropertyGrid from "@/components/property-grid"
import { properties as allPropertiesData } from "@/lib/properties"
import { getPremiumProperties } from "@/lib/utils-premium"
import { useTranslations } from "next-intl"

export default function PremiumContent() {
  const t = useTranslations('premium')
  const params = useParams()
  const locale = params?.locale || 'es'
  const premiumProperties = getPremiumProperties(allPropertiesData)

  const [showHeroVideo, setShowHeroVideo] = useState(false)

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)")
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    const evaluate = () => {
      setShowHeroVideo(desktopQuery.matches && !reducedMotionQuery.matches)
    }

    evaluate()

    desktopQuery.addEventListener("change", evaluate)
    reducedMotionQuery.addEventListener("change", evaluate)

    return () => {
      desktopQuery.removeEventListener("change", evaluate)
      reducedMotionQuery.removeEventListener("change", evaluate)
    }
  }, [])

  return (
    <>
      {/* Hero Premium */}
      <section className="relative h-[600px] flex items-center justify-center text-white overflow-hidden -mt-20 pt-20">
        {/* Background: gradiente base + poster (siempre) + video (solo desktop sin reduced-motion) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2c2c2c] to-[#1a1a1a]" />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-premium-poster.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {showHeroVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero-premium-desktop-FINAL.mp4" type="video/mp4" />
          </video>
        )}

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d4af37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#b8942f] rounded-full blur-3xl"></div>
        </div>

        <div className="absolute inset-0 bg-black/40" />

        {/* Contenido del Hero */}
        <div className="container-custom text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#f4e4b8] text-[#1a1a1a] px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
            <span>{t('badge')}</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">{t('hero.title')}</h1>

          <p className="text-xl md:text-2xl mb-8 text-white/90 drop-shadow-lg max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#propiedades-premium"
              className="inline-block bg-gradient-to-r from-[#d4af37] to-[#f4e4b8] text-[#1a1a1a] px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all shadow-lg"
            >
              {t('hero.viewProperties')}
            </a>
            <Link
              href={`/${locale}/contacto`}
              className="inline-block bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all shadow-lg"
            >
              {t('hero.scheduleTour')}
            </Link>
          </div>
        </div>
      </section>

      {/* Propuesta de Valor */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#222222] mb-4">{t('whyChoose.title')}</h2>
            <p className="text-lg text-[#999999] max-w-2xl mx-auto">
              {t('whyChoose.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Valor 1 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#d4af37] to-[#f4e4b8] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-[#1a1a1a]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#222222] mb-3">{t('values.0.title')}</h3>
              <p className="text-[#999999] leading-relaxed">
                {t('values.0.desc')}
              </p>
            </div>

            {/* Valor 2 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#d4af37] to-[#f4e4b8] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-[#1a1a1a]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#222222] mb-3">{t('values.1.title')}</h3>
              <p className="text-[#999999] leading-relaxed">
                {t('values.1.desc')}
              </p>
            </div>

            {/* Valor 3 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#d4af37] to-[#f4e4b8] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-[#1a1a1a]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#222222] mb-3">{t('values.2.title')}</h3>
              <p className="text-[#999999] leading-relaxed">
                {t('values.2.desc')}
              </p>
            </div>

            {/* Valor 4 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#d4af37] to-[#f4e4b8] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-[#1a1a1a]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#222222] mb-3">{t('values.3.title')}</h3>
              <p className="text-[#999999] leading-relaxed">
                {t('values.3.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Propiedades Premium */}
      <section id="propiedades-premium" className="py-20 bg-[#fafafa]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#222222] mb-4">{t('propertiesHeading')}</h2>
            <p className="text-lg text-[#999999]">{t('propertiesCount', { count: premiumProperties.length })}</p>
          </div>

          {premiumProperties.length > 0 ? (
            <PropertyGrid properties={premiumProperties} />
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#d4af37] to-[#f4e4b8] rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-[#1a1a1a]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#222222] mb-4">{t('noProperties.title')}</h3>
              <p className="text-[#999999] mb-8 max-w-md mx-auto">
                {t('noProperties.subtitle')}
              </p>
              <Link
                href={`/${locale}/contacto`}
                className="inline-block bg-gradient-to-r from-[#d4af37] to-[#f4e4b8] text-[#1a1a1a] px-8 py-4 rounded-lg font-bold hover:shadow-xl transition-all"
              >
                {t('noProperties.contactBtn')}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-[#1a1a1a] via-[#2c2c2c] to-[#1a1a1a] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37] rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('cta.title')}</h2>
          <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/contacto`}
              className="inline-block bg-gradient-to-r from-[#d4af37] to-[#f4e4b8] text-[#1a1a1a] px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              {t('cta.contactBtn')}
            </Link>
            <Link
              href={`/${locale}/propiedades`}
              className="inline-block bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all"
            >
              {t('cta.viewAllBtn')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
