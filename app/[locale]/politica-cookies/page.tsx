import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.cookies' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

const lastUpdated = "11 de marzo de 2026"

export default function PoliticaCookiesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[#222222] mb-2">Política de Cookies</h1>
            <p className="text-[#999999]">Última actualización: {lastUpdated}</p>
          </div>

          <div className="prose prose-sm max-w-none text-[#555555] space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">1. ¿Qué son las Cookies?</h2>
              <p>
                Las cookies son pequeños archivos de datos almacenados en tu dispositivo (computadora, tablet o móvil) 
                cuando visitas nuestro sitio. Contienen identificadores únicos y pueden ser accedidas por el servidor 
                web en futuras visitas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">2. Consentimiento</h2>
              <p>
                Cumplimos con regulaciones internacionales de cookies. Nuestro 
                <Link href="/" className="text-[#3898EC] hover:underline"> banner de consentimiento</Link> 
                {" "}te permite:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Aceptar todas:</strong> Activar cookies necesarias, analíticas y de marketing</li>
                <li><strong>Rechazar:</strong> Solo usar cookies necesarias</li>
                <li><strong>Personalizar:</strong> Elegir qué tipos de cookies permitir</li>
              </ul>
              <p className="mt-3 text-sm text-[#999999]">
                El acceso al Sitio se permite sin consentimiento de cookies de marketing/análisis.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">3. Tipos de Cookies Utilizadas</h2>

              <h3 className="text-lg font-semibold text-[#333333] mb-2">3.1 Cookies Necesarias (No requieren consentimiento)</h3>
              <div className="bg-[#f0f7ff] border border-[#3898EC] rounded p-4 mb-4">
                <p className="text-sm">
                  <strong>Ejemplos:</strong> Sesión de usuario, preferencias de idioma, información de carrito
                </p>
              </div>
              <ul className="list-disc pl-6 space-y-2">
                <li>Mantienen tu sesión activa en el Sitio</li>
                <li>Permiten el funcionamiento de formularios</li>
                <li>Guardan preferencias de visualización</li>
                <li><strong>Proveedor:</strong> SOMOS Properties</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#333333] mb-2 mt-4">3.2 Cookies Analíticas (Consentimiento requerido)</h3>
              <div className="bg-[#f0f7ff] border border-[#3898EC] rounded p-4 mb-4">
                <p className="text-sm">
                  <strong>Google Analytics (GA4):</strong> Para entender cómo usas nuestro Sitio
                </p>
              </div>
              <ul className="list-disc pl-6 space-y-2">
                <li>Páginas visitadas, duración de sesión, acciones de usuario</li>
                <li>Dispositivo, navegador, ubicación aproximada</li>
                <li><strong>Período de retención:</strong> 26 meses por defecto</li>
                <li><strong>ID Cookie:</strong> `_ga`, `_ga_[measurement-id]`</li>
                <li><strong>Política:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#3898EC] hover:underline">Google Privacy Policy</a></li>
              </ul>

              <h3 className="text-lg font-semibold text-[#333333] mb-2 mt-4">3.3 Cookies de Marketing (Consentimiento requerido)</h3>
              
              <div className="bg-[#f0f7ff] border border-[#3898EC] rounded p-4 mb-4 mt-3">
                <p className="text-sm font-semibold">Facebook Pixel</p>
                <p className="text-sm">Para rastrear conversiones y crear campañas personalizadas</p>
              </div>
              <ul className="list-disc pl-6 space-y-2">
                <li>ID de usuario, eventos de conversión, datos de compra</li>
                <li><strong>ID Pixel:</strong> Configurado en el Sitio</li>
                <li><strong>Política:</strong> <a href="https://www.facebook.com/policies/cookies/" target="_blank" rel="noopener noreferrer" className="text-[#3898EC] hover:underline">Meta Cookies Policy</a></li>
              </ul>

              <div className="bg-[#f0f7ff] border border-[#3898EC] rounded p-4 mb-4 mt-3">
                <p className="text-sm font-semibold">Google Ads (Google Ads Pixel)</p>
                <p className="text-sm">Para optimizar campañas de publicidad</p>
              </div>
              <ul className="list-disc pl-6 space-y-2">
                <li>Datos de conversión, comportamiento de usuario</li>
                <li><strong>Política:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#3898EC] hover:underline">Google Privacy Policy</a></li>
              </ul>

              <div className="bg-[#f0f7ff] border border-[#3898EC] rounded p-4 mb-4 mt-3">
                <p className="text-sm font-semibold">TikTok Pixel</p>
                <p className="text-sm">Para rastrear eventos en campañas de TikTok</p>
              </div>
              <ul className="list-disc pl-6 space-y-2">
                <li>Datos de conversión, interacciones con contenido</li>
                <li><strong>Política:</strong> <a href="https://www.tiktok.com/legal/page/us/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-[#3898EC] hover:underline">TikTok Privacy Policy</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">4. Cómo Controlar Cookies</h2>
              
              <h3 className="text-lg font-semibold text-[#333333] mb-2">4.1 A través de SOMOS Properties</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Haz clic en &ldquo;Personalizar&rdquo; en nuestro banner de consentimiento</li>
                <li>Selecciona qué tipos de cookies permitir</li>
                <li>Tu preferencia se guarda por 12 meses</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#333333] mb-2 mt-4">4.2 A través de tu Navegador</h3>
              <p className="text-sm text-[#666666]">Puedes eliminar o desactivar cookies en la configuración de tu navegador:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                <li><strong>Firefox:</strong> Preferencias → Privacidad → Cookies</li>
                <li><strong>Safari:</strong> Preferencias → Privacidad</li>
                <li><strong>Edge:</strong> Configuración → Privacidad → Cookies</li>
              </ul>
              <p className="mt-3 text-sm text-[#999999]">
                <strong>Nota:</strong> Desactivar cookies puede afectar la funcionalidad del Sitio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">5. Otros Rastreadores</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google Maps:</strong> Integración de mapas (requiere consentimiento implícito)</li>
                <li><strong>Botones de redes sociales:</strong> Facebook, Instagram, TikTok</li>
                <li><strong>Web beacons y etiquetas de píxel:</strong> Para medir eficacia</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">6. Tus Derechos</h2>
              <p>
                Bajo la Ley 81 de Panamá y regulaciones internacionales:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Derecho a saber qué cookies se usan</li>
                <li>Derecho a rechazar cookies no esenciales</li>
                <li>Derecho a cambiar preferencias en cualquier momento</li>
                <li>Derecho a solicitar información sobre datos recopilados</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">7. Cambios a Esta Política</h2>
              <p>
                Podemos actualizar esta Política de Cookies periódicamente. La fecha de &ldquo;Última actualización&rdquo; 
                en la parte superior reflejará cualquier cambio.
              </p>
            </section>

            <section className="bg-[#f9f9f9] p-6 rounded-lg border border-[#eeeeee]">
              <h2 className="text-2xl font-semibold text-[#222222] mb-4">8. Contacto</h2>
              <p className="mb-4">
                Para preguntas sobre esta Política de Cookies:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> <a href="mailto:privacidad@somosproperties.com" className="text-[#3898EC] hover:underline">privacidad@somosproperties.com</a></p>
                <p><strong>Teléfono:</strong> +507 6777-0577</p>
              </div>
              <p className="mt-4">
                Consulta también nuestra{" "}
                <Link href="/privacidad" className="text-[#3898EC] hover:underline">
                  Política de Privacidad
                </Link>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
