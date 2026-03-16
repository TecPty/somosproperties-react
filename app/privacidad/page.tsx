import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

export const metadata = {
  title: "Política de Privacidad - SOMOS Properties",
  description: "Política de Privacidad de SOMOS Properties conforme a la Ley 81 de 2019 de Panamá.",
}

const lastUpdated = "11 de marzo de 2026"

export default function PrivacidadPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[#222222] mb-2">Política de Privacidad</h1>
            <p className="text-[#999999]">Última actualización: {lastUpdated}</p>
          </div>

          <div className="prose prose-sm max-w-none text-[#555555] space-y-6">
            {/* Introducción */}
            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">1. Introducción</h2>
              <p>
                SOMOS Properties ("nosotros", "nuestro" o "la Empresa") respeta tu privacidad y se compromete a 
                proteger tus datos personales. Esta Política de Privacidad explica cómo recopilamos, utilizamos, 
                divulgamos y salvaguardamos tus datos cuando visitas nuestro sitio web 
                <Link href="/" className="text-[#3898EC] hover:underline"> www.somosproperties.com</Link> 
                (el "Sitio").
              </p>
              <p className="mt-3 text-sm font-semibold text-[#333333]">
                Cumplimos con la <strong>Ley 81 de 2019 sobre la Protección de Datos Personales</strong> (República de Panamá) 
                y regulaciones internacionales de protección de datos.
              </p>
            </section>

            {/* Datos que recopilamos */}
            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">2. Datos que Recopilamos</h2>
              
              <h3 className="text-lg font-semibold text-[#333333] mb-2">2.1 Información que nos proporcionas directamente:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nombre, email, teléfono y dirección (a través de formularios de contacto)</li>
                <li>Preferencias de propiedades e intereses inmobiliarios</li>
                <li>Mensajes y consultas enviados a través del formulario de contacto</li>
                <li>Datos de solicitud de empleo (si aplica)</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#333333] mb-2 mt-4">2.2 Información recopilada automáticamente:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Cookies y tecnologías similares:</strong> Información sobre tu navegador, sistema operativo, URL de referencia y páginas visitadas</li>
                <li><strong>Google Analytics:</strong> Datos sobre comportamiento de navegación (sujeto a consentimiento)</li>
                <li><strong>Facebook Pixel:</strong> Información sobre conversiones y comportamiento (sujeto a consentimiento)</li>
                <li><strong>Dirección IP:</strong> Con fines de seguridad y análisis</li>
              </ul>
            </section>

            {/* Uso de datos */}
            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">3. Cómo Utilizamos tus Datos</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Responder a tus consultas y solicitudes de información</li>
                <li>Enviar actualizaciones sobre propiedades, promociones y ofertas especiales</li>
                <li>Mejorar la experiencia del usuario y personalizar el contenido</li>
                <li>Analizar tendencias y optimizar el sitio web</li>
                <li>Cumplir obligaciones legales y resolver disputas</li>
                <li>Prevenir fraude y actividades ilícitas</li>
              </ul>
            </section>

            {/* Base legal */}
            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">4. Base Legal (Ley 81 de 2019)</h2>
              <p>
                El tratamiento de tus datos personales se basa en:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Consentimiento:</strong> Que proporcionas al aceptar esta política y nuestro banner de cookies</li>
                <li><strong>Ejecución de contrato:</strong> Cuando solicitas información sobre propiedades</li>
                <li><strong>Cumplimiento de obligación legal:</strong> Según leyes panameñas aplicables</li>
                <li><strong>Interés legítimo:</strong> Mejorar nuestros servicios y experiencia del usuario</li>
              </ul>
            </section>

            {/* Compartición de datos */}
            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">5. Compartición de Datos</h2>
              <p>
                No vendemos, alquilamos ni compartimos tus datos personales con terceros, excepto:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Proveedores de servicios (email, hosting, análisis) bajo acuerdos confidenciales</li>
                <li>Agentes inmobiliarios asociados (solo si lo solicitas explícitamente)</li>
                <li>Requisitos legales o regulatorios de autoridades panameñas</li>
                <li>Protección de derechos, privacidad y seguridad</li>
              </ul>
            </section>

            {/* Cookies y tracking */}
            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">6. Cookies y Tecnologías de Seguimiento</h2>
              <p>
                Utilizamos cookies para mejorar tu experiencia. Nuestro 
                <Link href="/politica-cookies" className="text-[#3898EC] hover:underline"> banner de consentimiento</Link> 
                {" "}permite personalizar tu experiencia:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Cookies necesarias:</strong> Funcionamiento del sitio (sin consentimiento requerido)</li>
                <li><strong>Cookies analíticas:</strong> Google Analytics (consentimiento requerido)</li>
                <li><strong>Cookies de marketing:</strong> Facebook Pixel, TikTok Pixel (consentimiento requerido)</li>
              </ul>
            </section>

            {/* Derechos */}
            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">7. Tus Derechos (Ley 81 de 2019)</h2>
              <p>
                Tienes derecho a:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Acceso:</strong> Solicitar copia de tus datos personales</li>
                <li><strong>Rectificación:</strong> Corregir información inexacta</li>
                <li><strong>Cancelación:</strong> Solicitar eliminación bajo ciertas circunstancias</li>
                <li><strong>Oposición:</strong> Objetar el procesamiento de tus datos</li>
                <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado</li>
              </ul>
              <p className="mt-4">
                Para ejercer estos derechos, contacta a{" "}
                <a href="mailto:privacidad@somosproperties.com" className="text-[#3898EC] hover:underline">
                  privacidad@somosproperties.com
                </a>
              </p>
            </section>

            {/* Seguridad */}
            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">8. Seguridad de Datos</h2>
              <p>
                Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger tus datos:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Cifrado HTTPS en todas las transmisiones</li>
                <li>Firewalls y sistemas de detección de intrusiones</li>
                <li>Acceso restringido a información personal</li>
                <li>Capacitación regular del personal en privacidad</li>
              </ul>
              <p className="mt-3 text-sm text-[#999999]">
                Sin embargo, ningún sistema es 100% seguro. No podemos garantizar seguridad absoluta.
              </p>
            </section>

            {/* Retención */}
            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">9. Retención de Datos</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Datos de contacto:</strong> Mientras mantengas interés en nuestros servicios (máx. 2 años sin contacto)</li>
                <li><strong>Datos analíticos:</strong> 26 meses (configuración estándar de Google Analytics)</li>
                <li><strong>Cookies:</strong> Según configuración del navegador (típicamente 1-2 años)</li>
              </ul>
            </section>

            {/* Cambios */}
            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">10. Cambios a Esta Política</h2>
              <p>
                Podemos actualizar esta Política de Privacidad periódicamente. Te notificaremos sobre cambios 
                significativos publicando la política actualizada en el Sitio. La fecha de "Última actualización" 
                será revisada para reflejar cualquier cambio.
              </p>
            </section>

            {/* Contacto */}
            <section className="bg-[#f9f9f9] p-6 rounded-lg border border-[#eeeeee]">
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">11. Contacto</h2>
              <p className="mb-4">
                Si tienes preguntas sobre esta Política de Privacidad o nuestras prácticas de privacidad:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> <a href="mailto:info@somosproperties.com" className="text-[#3898EC] hover:underline">info@somosproperties.com</a></p>
                <p><strong>Privacidad:</strong> <a href="mailto:privacidad@somosproperties.com" className="text-[#3898EC] hover:underline">privacidad@somosproperties.com</a></p>
                <p><strong>Teléfono:</strong> +507 6777-0577</p>
                <p><strong>Ubicación:</strong> Panamá, República de Panamá</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
