import Link from "next/link"
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
import { createMetadata } from "@/lib/seo"
import { isPremium } from "@/lib/utils-premium"
import { getOrganizationSchema, getCollectionSchema } from "@/lib/schema"

export const metadata = createMetadata({
  title: "SOMOS Properties - Propiedades en Panamá | Venta y Alquiler",
  description:
    "Encuentra tu propiedad ideal en Panamá. Apartamentos y locales en venta y alquiler en las mejores ubicaciones.",
  path: "/",
})

export default function HomePage() {
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg leading-tight max-w-4xl mx-auto">Propiedades que transforman vidas</h1>
          <p className="text-lg md:text-xl mb-10 text-white/95 drop-shadow-md max-w-2xl mx-auto font-light">Tu asesor inmobiliario de confianza en Panamá</p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/premium"
              className="inline-block bg-gradient-to-r from-[#d4af37] to-[#f4e4b8] text-[#1a1a1a] px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform shadow-xl"
            >
              Ver Premium
            </Link>
            <Link
              href="/propiedades"
              className="inline-block bg-white text-[#3898EC] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
            >
              Ver Propiedades
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
                <span>PROPIEDADES PREMIUM</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Vive la Excelencia</h2>
              <p className="text-lg text-white/80">Propiedades exclusivas con ubicaciones privilegiadas y acabados de lujo</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {premiumProperties.map((property) => (
                <Link
                  key={property.id}
                  href={`/propiedad/${property.id}`}
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
                        PREMIUM
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
                href="/premium"
                className="inline-block bg-gradient-to-r from-[#d4af37] to-[#f4e4b8] text-[#1a1a1a] px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
              >
                Ver Todas las Propiedades Premium
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Properties */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#222222] mb-4">Propiedades Destacadas</h2>
            <p className="text-lg text-[#999999]">Descubre las mejores oportunidades del mercado inmobiliario</p>
          </div>
          <PropertyGrid properties={featuredProperties} />
          <div className="text-center mt-12">
            <Link
              href="/propiedades"
              className="inline-block border-2 border-[#cccccc] text-[#333333] px-8 py-3 rounded-lg font-medium hover:bg-[#f3f3f3] transition-colors"
            >
              Ver Todas las Propiedades
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#ebecec]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#222222] mb-4">¿Por Qué Elegirnos?</h2>
            <p className="text-lg text-[#999999]">Somos tu mejor opción para encontrar la propiedad perfecta</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-32 h-32 flex items-center justify-center mx-auto mb-6">
                <OptimizedImage
                  src="/images/icons/icon-security-3d.png"
                  alt="Confianza y Seguridad"
                  width={128}
                  height={128}
                  type="small"
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-semibold text-[#333333] mb-3">Confianza y Seguridad</h3>
              <p className="text-[#999999] leading-relaxed">
                Más de 15 años en el mercado inmobiliario panameño respaldándonos. Todas nuestras propiedades son
                verificadas.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 flex items-center justify-center mx-auto mb-6">
                <OptimizedImage
                  src="/images/icons/icon-price-3d.png"
                  alt="Mejores Precios"
                  width={128}
                  height={128}
                  type="small"
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-semibold text-[#333333] mb-3">Mejores Precios</h3>
              <p className="text-[#999999] leading-relaxed">
                Trabajamos directamente con propietarios para ofrecerte los mejores precios del mercado sin
                intermediarios.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 flex items-center justify-center mx-auto mb-6">
                <OptimizedImage
                  src="/images/icons/icon-support-3d.png"
                  alt="Asesoría Personalizada"
                  width={160}
                  height={160}
                  type="small"
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-semibold text-[#333333] mb-3">Asesoría Personalizada</h3>
              <p className="text-[#999999] leading-relaxed">
                Nuestro equipo de expertos te acompaña en cada paso del proceso hasta encontrar tu propiedad ideal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Formularios Section */}
      <section className="py-20 bg-[#fafafa]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#222222] mb-4">Contáctanos</h2>
            <p className="text-lg text-[#999999]">Estamos aquí para ayudarte</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Formulario de Contacto General */}
            <div className="bg-white p-8 rounded-lg shadow-card">
              <h3 className="text-2xl font-semibold text-[#222222] mb-2">Conoce tu próxima propiedad</h3>
              <p className="text-[#999999] mb-6">Agenda tu cita</p>
              <ContactForm compact propertyTitle="" /></div>
            
            {/* Formulario de Empleo */}
            <div className="bg-white p-8 rounded-lg shadow-card">
              <h3 className="text-2xl font-semibold text-[#222222] mb-6">Únete a Nuestro Equipo</h3>
              <EmploymentForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
