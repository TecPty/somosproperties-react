import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Nosotros - SOMOS Properties",
  description: "Somos un equipo de profesionales apasionados en bienes raíces, con 15 años en la industria.",
}

const featureCards = [
  {
    title: "Experiencia Comprobada",
    desc: "Más de 15 años en el mercado inmobiliario panameño nos respaldan.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3898EC]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6l-9-4Zm0 2.18 5 2.22V12c0 3.87-2.69 7.19-6 8-3.31-.81-6-4.13-6-8V6.4l5-2.22Z" />
        <path d="M11 7h2v6h-2Zm0 8h2v2h-2Z" />
      </svg>
    ),
  },
  {
    title: "Asesoría Personalizada",
    desc: "Te acompañamos en cada paso hasta encontrar tu propiedad ideal.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3898EC]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-3.33 0-6 1.34-6 3v1h12v-1c0-1.66-2.67-3-6-3Z" />
        <path d="M17 14.5a4.5 4.5 0 0 1 4.5 4.5h-2a2.5 2.5 0 0 0-2.5-2.5Z" />
      </svg>
    ),
  },
  {
    title: "Propiedades Verificadas",
    desc: "Todas nuestras propiedades son rigurosamente verificadas.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3898EC]" viewBox="0 0 24 24" fill="currentColor">
        <path d="m10 14 8.49-8.48 1.41 1.41L10 16.82l-6.36-6.36 1.41-1.41Z" />
      </svg>
    ),
  },
  {
    title: "Mejores Precios",
    desc: "Trabajamos directamente con propietarios para mejores precios.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3898EC]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1 3 5v6c0 5 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5Zm7 10c0 4.35-2.83 8.57-7 9.93C7.83 19.57 5 15.35 5 11V6.3L12 3l7 3.3Z" />
        <path d="M11 7h2v2h2v2h-2v2h-2v-2H9V9h2Z" />
      </svg>
    ),
  },
]

const valueBullets = [
  "Transparencia y comunicación constante.",
  "Velocidad de respuesta y gestión completa.",
  "Cobertura en residencial y comercial.",
  "Equipo dedicado a cada propiedad.",
]

export default function NosotrosPage() {
  return (
    <>
      <Navbar />

      <main className="bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-0">
            <Image
              src="/images/nosotros/hero-0.webp"
              alt="Equipo Somos Properties"
              fill
              className="object-contain"
              priority
              style={{ objectPosition: "50% 45%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/65 via-white/25 to-transparent" />
          </div>
          <div className="container-custom relative py-14 lg:py-16">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-end">
              <div className="text-[#0f172a] max-w-2xl">
                <div className="inline-flex items-center rounded-full bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#0a7cd4]">
                  Quiénes somos
                </div>
                <h1 className="mt-4 text-4xl lg:text-5xl font-bold drop-shadow-sm">Sobre Nosotros</h1>
                <p className="mt-3 text-lg text-[#1e293b] drop-shadow-sm">15 años de experiencia en bienes raíces en Panamá</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/contacto"
                    className="rounded-lg bg-[#3898EC] text-white px-5 py-3 font-semibold hover:bg-[#2e8adb] transition shadow-sm"
                  >
                    Hablemos
                  </Link>
                  <Link
                    href="/propiedades"
                    className="rounded-lg border border-[#dbe7f3] px-5 py-3 font-semibold text-[#0f3d63] hover:bg-[#f5f9fd] transition"
                  >
                    Ver propiedades
                  </Link>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end items-end">
                <div className="relative w-full max-w-[320px] lg:max-w-[360px] flex justify-center pb-2">
                  <Image
                    src="/images/logo-somosproperties-250x250px-transparente.png"
                    alt="Logo SOMOS Properties"
                    width={360}
                    height={360}
                    className="h-auto w-full object-contain"
                    priority
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
              <h2 className="text-3xl font-bold text-[#222222] mb-4">¿Quiénes Somos?</h2>
              <p className="text-lg text-[#333333] leading-relaxed mb-6">
                Somos un equipo de profesionales apasionados en el mundo de bienes raíces, con una trayectoria de 15
                años en la industria. Nos enorgullecemos de ser lí­deres en el mercado inmobiliario, brindando un
                servicio excepcional a nuestros clientes en cada paso del camino.
              </p>

              <h2 className="text-3xl font-bold text-[#222222] mb-4 mt-10">Nuestra Misión</h2>
              <p className="text-lg text-[#333333] leading-relaxed">
                Ayudar a nuestros clientes a encontrar la propiedad ideal que se ajuste a sus necesidades y presupuesto,
                brindando asesorí­a personalizada y acompaí±amiento durante todo el proceso de compra, venta o alquiler.
              </p>
            </div>
          </div>
        </section>

        {/* Why choose us */}
        <section className="pb-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-[#222222] mb-6">¿Por Quí© Elegirnos?</h2>
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
                <h2 className="text-3xl font-bold text-[#222222] mb-4">Nuestros valores</h2>
                <p className="text-lg text-[#333333] leading-relaxed mb-4">
                  Trabajamos con transparencia, velocidad y foco en resultados. Nuestro equipo combina experiencia local
                  con procesos modernos para cerrar operaciones con seguridad y confianza.
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
                    href="/contacto"
                    className="rounded-lg bg-[#3898EC] px-5 py-3 font-semibold text-white hover:bg-[#2e8adb] transition"
                  >
                    Agenda una llamada
                  </Link>
                  <Link
                    href="/propiedades"
                    className="rounded-lg border border-[#dbe7f3] px-5 py-3 font-semibold text-[#0f3d63] hover:bg-[#f5f9fd] transition"
                  >
                    Ver portafolio
                  </Link>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[720px] bg-transparent p-6 self-end lg:-translate-y-10">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#e5f2ff] to-[#f5f9ff] blur-2xl" />
                  <Image
                    src="/images/nosotros/nosotros-equipo.webp"
                    alt="Equipo SOMOS Properties"
                    width={720}
                    height={720}
                    className="relative z-10 h-auto w-full object-contain"
                    priority
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

