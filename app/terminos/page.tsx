import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

export const metadata = {
  title: "Términos de Servicio - SOMOS Properties",
  description: "Términos y Condiciones de uso de SOMOS Properties.",
}

const lastUpdated = "11 de marzo de 2026"

export default function TerminosPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[#222222] mb-2">Términos de Servicio</h1>
            <p className="text-[#999999]">Última actualización: {lastUpdated}</p>
          </div>

          <div className="prose prose-sm max-w-none text-[#555555] space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">1. Aceptación de Términos</h2>
              <p>
                Al acceder y usar este sitio web (<Link href="/" className="text-[#3898EC] hover:underline">www.somosproperties.com</Link>), 
                aceptas estar vinculado por estos Términos de Servicio. Si no estás de acuerdo con alguna parte, 
                por favor no uses el Sitio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">2. Licencia de Uso</h2>
              <p>
                Se te otorga una licencia limitada, no exclusiva y revocable para usar este Sitio únicamente 
                para fines personales y no comerciales. No puedes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Reproducir, distribuir o transmitir contenido sin autorización</li>
                <li>Usar herramientas de scraping o bots para acceder al Sitio</li>
                <li>Modificar, traducir o crear obras derivadas del contenido</li>
                <li>Intentar obtener acceso no autorizado a sistemas o redes</li>
                <li>Usar el Sitio para actividades ilegales o fraudulentas</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">3. Propiedad Intelectual</h2>
              <p>
                Todo contenido del Sitio (textos, imágenes, gráficos, logos, videos) es propiedad de 
                SOMOS Properties o sus proveedores de contenido y está protegido por leyes de derechos de autor.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">4. Exactitud de Información</h2>
              <p>
                Nos esforzamos por mantener la información sobre propiedades precisa y actualizada. Sin embargo:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>No garantizamos que toda la información sea completamente precisa o actualizada</li>
                <li>Los precios, disponibilidad y características pueden cambiar sin previo aviso</li>
                <li>Recomendamos verificar información directamente con nuestros agentes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">5. Datos de Contacto y Formularios</h2>
              <p>
                Al enviar el formulario de contacto, aceptas:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Proporcionar información precisa y completa</li>
                <li>Que SOMOS Properties use tus datos para responder y seguimiento</li>
                <li>La política de privacidad y cookies de SOMOS Properties</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">6. Limitación de Responsabilidad</h2>
              <p className="font-semibold text-[#333333]">
                SOMOS PROPERTIES SE PROPORCIONA "TAL CUAL" SIN GARANTÍAS, EXPRESAS O IMPLÍCITAS.
              </p>
              <p className="mt-3">
                En la máxima medida permitida por la ley, SOMOS Properties no es responsable por:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Daños directos, indirectos, incidentales, o consecuentes</li>
                <li>Pérdida de datos, ingresos o ganancias</li>
                <li>Interrupciones del Sitio o errores técnicos</li>
                <li>Contenido de terceros o enlaces externos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">7. Enlaces Externos</h2>
              <p>
                El Sitio puede contener enlaces a sitios web de terceros. SOMOS Properties no es responsable 
                por el contenido, precisión o prácticas de privacidad de estos sitios. Accedes a ellos por tu 
                propia cuenta y riesgo.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">8. Conducta del Usuario</h2>
              <p>
                Te comprometes a no usar el Sitio para:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Acosar, intimidar o difamar a personas u organizaciones</li>
                <li>Distribuir contenido difamatorio, obsceno o ilegal</li>
                <li>Introducir virus, malware u otros códigos maliciosos</li>
                <li>Espamear o publicar contenido no solicitado</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">9. Indemnización</h2>
              <p>
                Aceptas indemnizar y eximir a SOMOS Properties de cualquier reclamo, daño o gasto 
                (incluyendo honorarios de abogados) derivado de:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Tu violación de estos Términos</li>
                <li>Tu uso del Sitio de manera ilegal</li>
                <li>Violación de derechos de terceros</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">10. Modificación de Términos</h2>
              <p>
                SOMOS Properties se reserva el derecho de modificar estos Términos en cualquier momento. 
                Los cambios serán efectivos cuando se publiquen en el Sitio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">11. Ley Aplicable</h2>
              <p>
                Estos Términos se rigen por las leyes de la República de Panamá. Cualquier disputa será resuelta 
                en los juzgados competentes de Panamá.
              </p>
            </section>

            <section className="bg-[#f9f9f9] p-6 rounded-lg border border-[#eeeeee]">
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">12. Contacto</h2>
              <p className="mb-4">
                Para preguntas sobre estos Términos:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> <a href="mailto:info@somosproperties.com" className="text-[#3898EC] hover:underline">info@somosproperties.com</a></p>
                <p><strong>Teléfono:</strong> +507 6777-0577</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
