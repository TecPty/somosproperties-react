import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"

export const metadata = {
  title: "Nosotros - SOMOS Properties",
  description: "Somos un equipo de profesionales apasionados en el mundo de bienes raíces, con 15 años en la industria.",
}

export default function NosotrosPage() {
  return (
    <>
      <Navbar />

      <main className="bg-white">
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center justify-center text-white bg-gradient-to-r from-[#3898EC] to-[#0082f3]">
          <div className="container-custom text-center">
            <h1 className="text-5xl font-bold mb-4">Sobre Nosotros</h1>
            <p className="text-xl text-white/90">15 años de experiencia en bienes raíces en Panamá</p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-[#222222] mb-6">¿Quiénes Somos?</h2>
                <p className="text-lg text-[#333333] leading-relaxed mb-6">
                  Somos un equipo de profesionales apasionados en el mundo de bienes raíces, con una trayectoria de 15
                  años en la industria. Nos enorgullecemos de ser líderes en el mercado inmobiliario, brindando un
                  servicio excepcional a nuestros clientes en cada paso del camino.
                </p>

                <h2 className="text-3xl font-bold text-[#222222] mb-6 mt-12">Nuestra Misión</h2>
                <p className="text-lg text-[#333333] leading-relaxed mb-6">
                  Ayudar a nuestros clientes a encontrar la propiedad ideal que se ajuste a sus necesidades y
                  presupuesto, brindando asesoría personalizada y acompañamiento durante todo el proceso de compra,
                  venta o alquiler.
                </p>

                <h2 className="text-3xl font-bold text-[#222222] mb-6 mt-12">¿Por Qué Elegirnos?</h2>
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div className="bg-[#fafafa] p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-[#222222] mb-3">Experiencia Comprobada</h3>
                    <p className="text-[#333333]">
                      Más de 15 años en el mercado inmobiliario panameño nos respaldan.
                    </p>
                  </div>
                  <div className="bg-[#fafafa] p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-[#222222] mb-3">Asesoría Personalizada</h3>
                    <p className="text-[#333333]">
                      Te acompañamos en cada paso hasta encontrar tu propiedad ideal.
                    </p>
                  </div>
                  <div className="bg-[#fafafa] p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-[#222222] mb-3">Propiedades Verificadas</h3>
                    <p className="text-[#333333]">Todas nuestras propiedades son rigurosamente verificadas.</p>
                  </div>
                  <div className="bg-[#fafafa] p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-[#222222] mb-3">Mejores Precios</h3>
                    <p className="text-[#333333]">Trabajamos directamente con propietarios para mejores precios.</p>
                  </div>
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
