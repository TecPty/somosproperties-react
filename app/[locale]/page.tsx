import Link from "next/link"
import HomeHeroBackground from "@/components/home-hero-background"
import { preload } from "react-dom"
import { getTranslations } from 'next-intl/server'
import PropertyGrid from "@/components/property-grid"
import ContactForm from "@/components/contact-form"
import EmploymentForm from "@/components/employment-form"
import OptimizedImage from "@/components/optimized-image"
import { SchemaMarkupMultiple } from "@/components/schema-markup"
import { GiveawayModal } from "@/components/giveaway-modal"
import { GiveawayConfetti } from "@/components/giveaway-confetti"
import type { Property } from "@/lib/types"
import { properties as allPropertiesData } from "@/lib/properties"
import { formatPrice } from "@/lib/formatters"
import { isPremium } from "@/lib/utils-premium"
import { getOrganizationSchema, getCollectionSchema } from "@/lib/schema"
import { createMetadata } from "@/lib/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.home' })

  return createMetadata({
    title: locale === 'en' ? 'Real Estate in Panama' : 'Bienes Raíces en Panamá',
    description: t('description'),
    path: '',
    locale,
  })
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  preload('/images/hero-poster.webp', { as: 'image', fetchPriority: 'high' })
  const { locale } = await params
  const allProperties: Property[] = allPropertiesData
  
  // Filtrar propiedades con precio definido
  const propertiesWithPrice = allProperties.filter((p) => {
    const hasPrice = (p.operation === "Venta" && p.price > 0) || 
                     (p.operation === "Alquiler" && (p.pricePerMonth || 0) > 0)
    return hasPrice && p.status === "available" && !p.hidden
  })
  
  // Propiedades premium usando función consolidada
  const premiumDefaults = propertiesWithPrice.filter((p) => isPremium(p))
  const premiumOverrideIds = [167, 1]
  const premiumOverrides = premiumOverrideIds
    .map((id) => propertiesWithPrice.find((p) => p.id === id))
    .filter((property): property is Property => Boolean(property && isPremium(property)))
  const premiumProperties = [
    ...premiumOverrides,
    ...premiumDefaults.filter((p) => !premiumOverrideIds.includes(p.id)),
  ].slice(0, 3)
  // Propiedades destacadas (excluir premium)
  const premiumIds = new Set(premiumProperties.map((p) => p.id))
  const featuredProperties = propertiesWithPrice
    .filter((p) => p.featured && !premiumIds.has(p.id))
    .slice(0, 6)

  // Oportunidades comerciales: terrenos reales del catálogo.
  // Nota: hoy existen 8 terrenos reales (type === "Terreno"), no 11 — se muestran todos, sin datos ficticios.
  const commercialOpportunities = allProperties.filter(
    (p) => p.type === "Terreno" && !p.hidden && p.status === "available"
  )

  const t = await getTranslations('home')

  return (
    <>
      <GiveawayModal />
      <GiveawayConfetti />

      {/* Schema Markup for SEO */}
      <SchemaMarkupMultiple
        schemas={[
          getOrganizationSchema(),
          getCollectionSchema(
            propertiesWithPrice,
            "Todas las Propiedades",
            "/propiedades"
          ),
        ].filter(Boolean) as Record<string, unknown>[]}
      />



      {/* Hero Section */}
      <section className="relative min-h-[420px] py-12 md:py-0 md:h-[calc(100vh-80px)] md:min-h-[600px] flex items-center justify-center text-white overflow-hidden">
        <HomeHeroBackground />
        
        {/* Overlay oscuro para legibilidad */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Contenido del Hero - Versión simplificada */}
        <div className="container-custom text-center relative z-10">
          <h1 className="text-4xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg leading-tight max-w-4xl mx-auto tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-12 text-white/95 drop-shadow-md max-w-2xl mx-auto font-light leading-relaxed">
            {t('hero.subtitle')}
          </p>
          
          {/* CTAs */}
          <div className="flex flex-row gap-2 sm:gap-5 justify-center items-center max-w-[360px] sm:max-w-none mx-auto">
            <Link
              href={`/${locale}/premium`}
              className="flex-1 sm:flex-none min-w-0 min-h-[44px] sm:w-auto inline-flex items-center justify-center bg-[#E1C26A] text-[#1a1a1a] px-3 sm:px-10 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-[13px] sm:text-lg leading-snug sm:leading-normal hover:bg-[#D4af37] hover:scale-105 transition-all shadow-xl"
            >
              {t('hero.viewPremium')}
            </Link>
            <Link
              href={`/${locale}/propiedades`}
              className="flex-1 sm:flex-none min-w-0 min-h-[44px] sm:w-auto inline-flex items-center justify-center bg-white text-[#3898EC] px-3 sm:px-10 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-[13px] sm:text-lg leading-snug sm:leading-normal hover:bg-gray-50 hover:scale-105 transition-all shadow-xl border border-gray-100"
            >
              {t('hero.viewProperties')}
            </Link>
          </div>
        </div>
      </section>


      {/* Premium Properties Section */}
      {premiumProperties.length > 0 && (
        <section className="py-10 sm:py-20 bg-gradient-to-br from-[#1a1a1a] via-[#2c2c2c] to-[#1a1a1a] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#d4af37] rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#b8942f] rounded-full blur-3xl"></div>
          </div>
          
          <div className="container-custom relative z-10">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#f4e4b8] text-[#1a1a1a] px-4 py-2 rounded-full text-sm font-bold mb-4">
                <span>{t('premium.badge')}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">{t('premium.title')}</h2>
              <p className="text-lg text-white/80">{t('premium.subtitle')}</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-8 mb-8 sm:mb-12">
              {premiumProperties.map((property) => (
                <Link
                  key={property.id}
                  href={`/${locale}/propiedad/${property.id}`}
                  className="group min-w-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 hover:border-[#d4af37] transition-all"
                >
                  <div className="relative aspect-[4/3] sm:aspect-auto sm:h-48">
                    <OptimizedImage
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      type="propertyCard"
                      fill
                      priority={false}
                      blur
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                      <span className="bg-gradient-to-r from-[#d4af37] to-[#f4e4b8] text-[#1a1a1a] px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold">
                        {t('premium.premiumLabel')}
                      </span>
                    </div>
                  </div>
                  <div className="p-2.5 sm:p-4">
                    <h3 className="text-[13px] sm:text-lg font-semibold sm:font-bold text-white mb-1.5 sm:mb-2 line-clamp-2 min-h-[2.5em]">{property.title}</h3>
                    <p className="text-white/85 text-[11px] sm:text-sm mb-2 sm:mb-3 break-words">{property.district}, {property.city}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm sm:text-2xl font-bold text-[#d4af37] break-words">
                        {property.operation === "Venta" 
                          ? formatPrice(property.price)
                          : `${formatPrice(property.pricePerMonth || 0)}/mes`
                        }
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center">
              <Link
                href={`/${locale}/premium`}
                className="inline-block bg-gradient-to-r from-[#d4af37] to-[#f4e4b8] text-[#1a1a1a] min-h-[44px] px-5 sm:px-8 py-3 sm:py-4 rounded-lg font-medium sm:font-bold text-sm sm:text-lg hover:shadow-2xl hover:scale-105 transition-all"
              >
                {t('premium.viewAll')}
              </Link>
            </div>
          </div>
        </section>
      )}

      <div className="site-background-continuous">
      {/* Featured Properties */}
      <section className="py-10 sm:py-20">
        <div className="container-custom">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-[#222222] mb-4">{t('featured.title')}</h2>
            <p className="text-lg text-[#5d6c7b]">{t('featured.subtitle')}</p>
          </div>
          <PropertyGrid properties={featuredProperties} />
          <div className="text-center mt-12">
            <Link
              href={`/${locale}/propiedades`}
              className="inline-block border-2 border-[#cccccc] text-[#333333] px-8 py-3 rounded-lg font-medium hover:bg-[#f3f3f3] transition-colors"
            >
              {t('featured.viewAll')}
            </Link>
          </div>
        </div>
      </section>

      {/* Oportunidades Comerciales */}
      {commercialOpportunities.length > 0 && (
        <section className="py-10 sm:py-20">
          <div className="container-custom">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                <span>{t('commercial.badge')}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#222222] mb-4">{t('commercial.title')}</h2>
              <p className="text-lg text-[#5d6c7b]">{t('commercial.subtitle')}</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {commercialOpportunities.map((property) => {
                const displayPrice = property.price
                  ? formatPrice(property.price)
                  : property.pricePerMonth
                    ? `${formatPrice(property.pricePerMonth)}/mes`
                    : null
                return (
                  <Link
                    key={property.id}
                    href={`/${locale}/propiedad/${property.id}`}
                    className="group min-w-0 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:border-[#3898EC]/30"
                  >
                    <div className="relative aspect-[4/3] sm:aspect-auto sm:h-44">
                      <OptimizedImage
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        type="propertyCard"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-2.5 sm:p-4">
                      <p className="text-sm sm:text-base font-bold text-[#0082f3] mb-2 break-words">{displayPrice || t('commercial.contactUs')}</p>
                      <span className="block text-xs text-[#555555] mb-1">{property.type}</span>
                      <h3 className="font-bold text-[#1a1a1a] mb-1 line-clamp-2 text-sm leading-snug group-hover:text-[#3898EC] transition-colors">{property.title}</h3>
                      <p className="text-[#5d6c7b] text-xs mb-2">{property.district}, {property.city}</p>
                      {property.area && (
                        <span className="text-xs text-[#666]">{property.area.toLocaleString("es-PA")} m²</span>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>

            <div className="text-center mt-10">
              <Link
                href={`/${locale}/comerciales`}
                className="inline-block border-2 border-[#1a1a1a] text-[#1a1a1a] px-8 py-3 rounded-lg font-medium hover:bg-[#1a1a1a] hover:text-white transition-colors"
              >
                {t('commercial.viewAll')}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-10 sm:py-24 relative overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">{t('testimonials.title')}</h2>
            <div className="w-24 h-1.5 bg-[#3898EC] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 md:gap-10">
            {(t.raw('testimonials.reviews') as { name: string; content: string; role: string }[]).map((review, i) => (
              <div key={i} className="min-w-0 bg-[#fafafa] p-3 sm:p-6 md:p-10 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="flex gap-0.5 sm:gap-1 text-yellow-400 mb-3 sm:mb-6 group-hover:scale-110 transition-transform origin-left">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-5 sm:w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 sm:italic mb-3 sm:mb-8 leading-snug sm:leading-relaxed text-sm sm:text-lg break-words">&ldquo;{review.content}&rdquo;</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 min-w-0">
                  <div className="w-8 h-8 sm:w-14 sm:h-14 shrink-0 rounded-full bg-[#3898EC]/10 flex items-center justify-center text-[#3898EC] font-bold text-xl border-2 border-[#3898EC]/20">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold sm:font-bold text-gray-900 text-xs sm:text-lg break-words">{review.name}</div>
                    <div className="text-xs sm:text-sm text-[#0066cc] font-medium break-words">{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-10 sm:py-20">
        <div className="container-custom">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">{t('whyChooseUs.title')}</h2>
            <p className="text-sm sm:text-xl text-[#555555] max-w-2xl mx-auto">{t('whyChooseUs.subtitle')}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 md:gap-12">
            <div className="min-w-0 text-center bg-[#f8f9fa] rounded-2xl p-3 sm:p-8 transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="w-full max-w-[88px] sm:max-w-[336px] aspect-square flex items-center justify-center mx-auto mb-3 sm:mb-6">
                <img
                  src="/images/icons/asesoria.svg"
                  alt={t('whyChooseUs.advisory.title')}
                  width={336}
                  height={336}
                  className="w-full h-auto max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className="text-[13px] sm:text-2xl font-semibold sm:font-bold text-[#1a1a1a] mb-2 sm:mb-4 break-words">{t('whyChooseUs.advisory.title')}</h3>
              <p className="text-sm sm:text-base text-[#555555] leading-relaxed break-words">
                <span className="sm:hidden">{t('whyChooseUs.advisory.shortDescription')}</span>
                <span className="hidden sm:inline">{t('whyChooseUs.advisory.description')}</span>
              </p>
            </div>
            <div className="min-w-0 text-center bg-[#f8f9fa] rounded-2xl p-3 sm:p-8 transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="w-full max-w-[88px] sm:max-w-[336px] aspect-square flex items-center justify-center mx-auto mb-3 sm:mb-6">
                <img
                  src="/images/icons/precio.svg"
                  alt={t('whyChooseUs.prices.title')}
                  width={336}
                  height={336}
                  className="w-full h-auto max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className="text-[13px] sm:text-2xl font-semibold sm:font-bold text-[#1a1a1a] mb-2 sm:mb-4 break-words">{t('whyChooseUs.prices.title')}</h3>
              <p className="text-sm sm:text-base text-[#555555] leading-relaxed break-words">
                <span className="sm:hidden">{t('whyChooseUs.prices.shortDescription')}</span>
                <span className="hidden sm:inline">{t('whyChooseUs.prices.description')}</span>
              </p>
            </div>
            <div className="min-w-0 text-center bg-[#f8f9fa] rounded-2xl p-3 sm:p-8 transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="w-full max-w-[88px] sm:max-w-[336px] aspect-square flex items-center justify-center mx-auto mb-3 sm:mb-6">
                <img
                  src="/images/icons/seguridad.svg"
                  alt={t('whyChooseUs.security.title')}
                  width={336}
                  height={336}
                  className="w-full h-auto max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className="text-[13px] sm:text-2xl font-semibold sm:font-bold text-[#1a1a1a] mb-2 sm:mb-4 break-words">{t('whyChooseUs.security.title')}</h3>
              <p className="text-sm sm:text-base text-[#555555] leading-relaxed break-words">
                <span className="sm:hidden">{t('whyChooseUs.security.shortDescription')}</span>
                <span className="hidden sm:inline">{t('whyChooseUs.security.description')}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Formularios Section */}
      <section className="py-10 sm:py-20">
        <div className="container-custom">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-[#222222] mb-4">{t('contact.title')}</h2>
            <p className="text-lg text-[#5d6c7b]">{t('contact.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Formulario de Contacto General */}
            <div className="bg-white p-8 rounded-lg shadow-card">
              <h3 className="text-2xl font-semibold text-[#222222] mb-2">{t('contact.formTitle')}</h3>
              <p className="text-[#5d6c7b] mb-6">{t('contact.formSubtitle')}</p>
              <ContactForm compact propertyTitle="" /></div>
            
            {/* Formulario de Empleo */}
            <div className="bg-white p-8 rounded-lg shadow-card">
              <h3 className="text-2xl font-semibold text-[#222222] mb-6">{t('contact.employmentTitle')}</h3>
              <EmploymentForm />
            </div>
          </div>
        </div>
      </section>
      </div>

    </>
  )
}
