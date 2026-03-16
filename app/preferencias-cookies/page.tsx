import { Metadata } from "next"
import Link from "next/link"
import CookiePreferencesWrapper from "./wrapper"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Preferencias de Cookies | SOMOS Properties",
  description: "Gestiona tus preferencias de consentimiento de cookies y datos personales",
}

export default function CookiePrefencesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f9f9] to-white py-12 px-4">
      <div className="container-custom max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-[#3898EC] hover:underline text-sm font-medium mb-4 inline-flex items-center gap-1">
            ← Volver al inicio
          </Link>
          <h1 className="text-4xl font-bold text-[#222222] mb-4">Preferencias de Cookies</h1>
          <p className="text-lg text-[#666666]">
            Gestiona cómo utilizamos cookies y datos para personalizar tu experiencia
          </p>
        </div>

        {/* Main Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#eeeeee] overflow-hidden mb-12">
          <CookiePreferencesWrapper />
        </div>

        {/* Information Section */}
        <div className="space-y-8">
          {/* What are cookies */}
          <div className="bg-white rounded-xl p-6 border border-[#eeeeee]">
            <h2 className="text-xl font-semibold text-[#222222] mb-3">¿Qué son las cookies?</h2>
            <p className="text-[#666666] leading-relaxed">
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web. 
              Nos ayudan a recordar tus preferencias, mejorar tu experiencia de navegación y analizar cómo usas nuestro sitio.
            </p>
          </div>

          {/* Types of cookies */}
          <div className="bg-white rounded-xl p-6 border border-[#eeeeee]">
            <h2 className="text-xl font-semibold text-[#222222] mb-4">Tipos de cookies que utilizamos</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[#222222] mb-1">🔒 Cookies Necesarias</h3>
                <p className="text-sm text-[#666666]">
                  Esenciales para el funcionamiento del sitio web. Incluyen seguridad, autenticación y selecciones de idioma. 
                  <strong className="block mt-1">No se pueden desactivar.</strong>
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#222222] mb-1">📊 Cookies de Análisis</h3>
                <p className="text-sm text-[#666666]">
                  Nos ayudan a entender cómo interactúas con el sitio (páginas visitadas, tiempo de permanencia, etc.). 
                  Utilizamos <strong>Google Analytics</strong> con retención de 26 meses.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#222222] mb-1">📢 Cookies de Marketing</h3>
                <p className="text-sm text-[#666666]">
                  Permiten crear perfiles de interés y mostrar anuncios personalizados. Incluye 
                  <strong> Facebook Pixel</strong>, <strong>Google Ads</strong> y <strong>TikTok Pixel</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Retention */}
          <div className="bg-blue-50 rounded-xl p-6 border border-[#3898EC]/20">
            <h2 className="text-xl font-semibold text-[#222222] mb-3">📅 Períodos de retención</h2>
            <ul className="space-y-2 text-sm text-[#666666]">
              <li><strong>Google Analytics:</strong> 26 meses desde la última actividad</li>
              <li><strong>Facebook Pixel:</strong> 1 año (datos agregados para campañas)</li>
              <li><strong>Google Ads:</strong> 540 días (conversiones y remarketing)</li>
              <li><strong>TikTok Pixel:</strong> 6 meses (eventos de conversión)</li>
              <li><strong>Cookies de sesión necesarias:</strong> Duración de la sesión</li>
            </ul>
          </div>

          {/* Your rights */}
          <div className="bg-white rounded-xl p-6 border border-[#eeeeee]">
            <h2 className="text-xl font-semibold text-[#222222] mb-3">✋ Tus derechos</h2>
            <p className="text-[#666666] mb-4">
              Bajo la <strong>Ley 81 de 2019</strong> de Panamá y regulaciones de privacidad internacional, tienes derecho a:
            </p>
            <ul className="space-y-2 text-sm text-[#666666]">
              <li>✓ <strong>Acceder</strong> a tus datos personales</li>
              <li>✓ <strong>Rectificar</strong> datos inexactos</li>
              <li>✓ <strong>Eliminar</strong> tus datos (derecho al olvido)</li>
              <li>✓ <strong>Portabilidad</strong> de tus datos</li>
              <li>✓ <strong>Oponertes</strong> al procesamiento para marketing</li>
              <li>✓ <strong>Revocar</strong> consentimiento en cualquier momento</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-xl p-6 border border-[#eeeeee]">
            <h2 className="text-xl font-semibold text-[#222222] mb-3">📧 Contacto</h2>
            <p className="text-[#666666] mb-4">
              Si tienes preguntas sobre nuestras prácticas de cookies o deseas ejercer tus derechos:
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <p className="text-[#666666]">
                <strong>SOMOS Properties</strong><br />
                Calle 50, Bella Vista<br />
                Ciudad de Panamá, Panamá
              </p>
              <p className="text-[#666666]">
                <strong>Email:</strong>{" "}
                <a href="mailto:info@somosproperties.com" className="text-[#3898EC] hover:underline">
                  info@somosproperties.com
                </a>
              </p>
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-center text-xs text-[#999999] py-4 border-t border-[#eeeeee]">
            <p>Última actualización: 11 de marzo de 2026</p>
            <p className="mt-1">
              Para más información, consulta nuestra{" "}
              <Link href="/privacidad" className="text-[#3898EC] hover:underline">
                Política de Privacidad
              </Link>
              {" "}y{" "}
              <Link href="/politica-cookies" className="text-[#3898EC] hover:underline">
                Política de Cookies
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
