import Link from "next/link"
import { getTranslations } from 'next-intl/server'
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PropertyGrid from "@/components/property-grid"
import ContactForm from "@/components/contact-form"
import EmploymentForm from "@/components/employment-form"
import OptimizedImage from "@/components/optimized-image"
import { SchemaMarkupMultiple } from "@/components/schema-markup"
import type { Property } from "@/lib/types"
import { properties as allPropertiesData } from "@/lib/properties"
import { formatPrice } from "@/lib/formatters"
import { isPremium } from "@/lib/utils-premium"
import { getOrganizationSchema, getCollectionSchema } from "@/lib/schema"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.home' })
  
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
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

  const t = await getTranslations('home')

  return (
    <>
      {/* Schema Markup for SEO */}
      <SchemaMarkupMultiple
        schemas={[
          getOrganizationSchema(),
          getCollectionSchema(
            propertiesWithPrice,
            "Todas las Propiedades",
            "/propiedades"
          ),
        ].filter(Boolean)}
      />

      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[600px] flex items-center justify-center text-white overflow-hidden -mt-20 pt-20">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/hero-poster.webp"
        >
          <source src="/videos/hero-video-desktop_webm.webm" type="video/webm" />
          <source src="/videos/hero-video-desktop.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay oscuro para legibilidad */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Contenido del Hero - Versión simplificada */}
        <div className="container-custom text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg leading-tight max-w-4xl mx-auto">{t('hero.title')}</h1>
          <p className="text-lg md:text-xl mb-10 text-white/95 drop-shadow-md max-w-2xl mx-auto font-light">{t('hero.subtitle')}</p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/premium`}
              className="inline-block bg-gradient-to-r from-[#d4af37] to-[#f4e4b8] text-[#1a1a1a] px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform shadow-xl"
            >
              {t('hero.viewPremium')}
            </Link>
            <Link
              href={`/${locale}/propiedades`}
              className="inline-block bg-white text-[#3898EC] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
            >
              {t('hero.viewProperties')}
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Properties Section */}
      {premiumProperties.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-[#1a1a1a] via-[#2c2c2c] to-[#1a1a1a] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#d4af37] rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#b8942f] rounded-full blur-3xl"></div>
          </div>
          
          <div className="container-custom relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#f4e4b8] text-[#1a1a1a] px-4 py-2 rounded-full text-sm font-bold mb-4">
                <span>{t('premium.badge')}</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">{t('premium.title')}</h2>
              <p className="text-lg text-white/80">{t('premium.subtitle')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {premiumProperties.map((property) => (
                <Link
                  key={property.id}
                  href={`/${locale}/propiedad/${property.id}`}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 hover:border-[#d4af37] transition-all"
                >
                  <div className="relative h-48">
                    <OptimizedImage
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      type="propertyCard"
                      fill
                      priority={false}
                      blur
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-gradient-to-r from-[#d4af37] to-[#f4e4b8] text-[#1a1a1a] px-3 py-1 rounded-full text-xs font-bold">
                        {t('premium.premiumLabel')}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{property.title}</h3>
                    <p className="text-white/60 text-sm mb-3">{property.district}, {property.city}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#d4af37]">
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
                className="inline-block bg-gradient-to-r from-[#d4af37] to-[#f4e4b8] text-[#1a1a1a] px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
              >
                {t('premium.viewAll')}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Properties */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#222222] mb-4">{t('featured.title')}</h2>
            <p className="text-lg text-[#999999]">{t('featured.subtitle')}</p>
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

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">{t('whyChooseUs.title')}</h2>
            <p className="text-xl text-[#555555] max-w-2xl mx-auto">{t('whyChooseUs.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center bg-[#f8f9fa] rounded-2xl p-8 transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="w-[336px] h-[336px] flex items-center justify-center mx-auto mb-6">
                <img
                  src="/images/icons/asesoria.svg"
                  alt={t('whyChooseUs.advisory.title')}
                  width={336}
                  height={336}
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">{t('whyChooseUs.advisory.title')}</h3>
              <p className="text-base text-[#555555] leading-relaxed">
                {t('whyChooseUs.advisory.description')}
              </p>
            </div>
            <div className="text-center bg-[#f8f9fa] rounded-2xl p-8 transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="w-[336px] h-[336px] flex items-center justify-center mx-auto mb-6">
                <img
                  src="/images/icons/precio.svg"
                  alt={t('whyChooseUs.prices.title')}
                  width={336}
                  height={336}
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">{t('whyChooseUs.prices.title')}</h3>
              <p className="text-base text-[#555555] leading-relaxed">
                {t('whyChooseUs.prices.description')}
              </p>
            </div>
            <div className="text-center bg-[#f8f9fa] rounded-2xl p-8 transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="w-[336px] h-[336px] flex items-center justify-center mx-auto mb-6">
                <img
                  src="/images/icons/seguridad.svg"
                  alt={t('whyChooseUs.security.title')}
                  width={336}
                  height={336}
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">{t('whyChooseUs.security.title')}</h3>
              <p className="text-base text-[#555555] leading-relaxed">
                {t('whyChooseUs.security.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Formularios Section */}
      <section className="py-20 bg-[#fafafa]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#222222] mb-4">{t('contact.title')}</h2>
            <p className="text-lg text-[#999999]">{t('contact.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Formulario de Contacto General */}
            <div className="bg-white p-8 rounded-lg shadow-card">
              <h3 className="text-2xl font-semibold text-[#222222] mb-2">{t('contact.formTitle')}</h3>
              <p className="text-[#999999] mb-6">{t('contact.formSubtitle')}</p>
              <ContactForm compact propertyTitle="" /></div>
            
            {/* Formulario de Empleo */}
            <div className="bg-white p-8 rounded-lg shadow-card">
              <h3 className="text-2xl font-semibold text-[#222222] mb-6">{t('contact.employmentTitle')}</h3>
              <EmploymentForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
