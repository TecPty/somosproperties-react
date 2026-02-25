import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SearchBar from "@/components/search-bar"
import PropertyGrid from "@/components/property-grid"
import ContactForm from "@/components/contact-form"
import type { Property } from "@/lib/types"
import { properties as allPropertiesData } from "@/lib/properties"
import { formatPrice } from "@/lib/formatters"
import { createMetadata } from "@/lib/seo"
import { isPremium } from "@/lib/utils-premium"

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
        {/* Contenido del Hero */}
        <div className="container-custom text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">Encuentra tu Propiedad Ideal en Panamá</h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 drop-shadow-lg">Apartamentos y locales. Venta y alquiler</p>
          <SearchBar className="mx-auto mb-6" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/residenciales"
              className="inline-block bg-[#3898EC] text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-[#0082f3] transition-colors shadow-lg"
            >
              Ver Residenciales
            </Link>
            <Link
              href="/comerciales"
              className="inline-block bg-white text-[#3898EC] px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Ver Comerciales
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
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
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
                <Image src="/images/icons/icon-security-3d.png" alt="Confianza y Seguridad" width={128} height={128} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-semibold text-[#333333] mb-3">Confianza y Seguridad</h3>
              <p className="text-[#999999] leading-relaxed">
                Más de 15 años en el mercado inmobiliario panameño respaldándonos. Todas nuestras propiedades son
                verificadas.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 flex items-center justify-center mx-auto mb-6">
                <Image src="/images/icons/icon-price-3d.png" alt="Mejores Precios" width={128} height={128} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-semibold text-[#333333] mb-3">Mejores Precios</h3>
              <p className="text-[#999999] leading-relaxed">
                Trabajamos directamente con propietarios para ofrecerte los mejores precios del mercado sin
                intermediarios.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 flex items-center justify-center mx-auto mb-6">
                <Image src="/images/icons/icon-support-3d.png" alt="Asesoría Personalizada" width={128} height={128} className="w-full h-full object-contain" />
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
              <form className="space-y-4">
                <div>
                  <label htmlFor="emp-name" className="block text-sm font-medium text-[#333333] mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="emp-name"
                    className="w-full px-4 py-3 border border-[#cccccc] rounded-lg focus:border-[#3898EC] focus:outline-2 focus:outline-[#2895f7] bg-white"
                    placeholder="Tu nombre"
                  />
                </div>
                
                <div>
                  <label htmlFor="emp-email" className="block text-sm font-medium text-[#333333] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="emp-email"
                    className="w-full px-4 py-3 border border-[#cccccc] rounded-lg focus:border-[#3898EC] focus:outline-2 focus:outline-[#2895f7] bg-white"
                    placeholder="tu@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="emp-phone" className="block text-sm font-medium text-[#333333] mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="emp-phone"
                    className="w-full px-4 py-3 border border-[#cccccc] rounded-lg focus:border-[#3898EC] focus:outline-2 focus:outline-[#2895f7] bg-white"
                    placeholder="+507 6789-0123"
                  />
                </div>
                
                <div>
                  <label htmlFor="emp-education" className="block text-sm font-medium text-[#333333] mb-2">
                    Nivel de educación *
                  </label>
                  <select
                    id="emp-education"
                    className="w-full px-4 py-3 border border-[#cccccc] rounded-lg focus:border-[#3898EC] focus:outline-2 focus:outline-[#2895f7] bg-white text-[#333333]"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="secundaria">Secundaria</option>
                    <option value="tecnico">Técnico</option>
                    <option value="universitario">Universitario</option>
                    <option value="postgrado">Postgrado</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="emp-cv" className="block text-sm font-medium text-[#333333] mb-2">
                    Adjuntar CV *
                  </label>
                  <input
                    type="file"
                    id="emp-cv"
                    accept=".pdf,.doc,.docx"
                    className="w-full px-4 py-3 border border-[#cccccc] rounded-lg focus:border-[#3898EC] bg-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#3898EC] file:text-white hover:file:bg-[#0082f3]"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-[#3898EC] text-white py-3 rounded-lg font-medium hover:bg-[#0082f3] transition-colors"
                >
                  Enviar Solicitud
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
