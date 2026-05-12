"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useConsentManager } from "@/hooks/use-consent-manager"
import { Button } from "@/components/ui/button"
import { Copy, CheckCircle2, AlertCircle } from "lucide-react"

export default function CookieSettingsClient() {
  const { consent, setConsent, acceptAll, rejectAll } = useConsentManager()
  const [saved, setSaved] = useState(false)
  const params = useParams()
  const locale = (params?.locale as string) || 'es'
  const [copied, setCopied] = useState(false)

  // Reset saved state after 2 seconds
  useEffect(() => {
    if (saved) {
      const timer = setTimeout(() => setSaved(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [saved])

  const handleToggle = (type: "analytics" | "marketing") => {
    const updated = { ...consent, [type]: !consent[type] }
    setConsent(updated)
    setSaved(true)
  }

  const copyPreferences = () => {
    const text = `Preferencias de cookies:
- Necesarias: ${consent.necessary ? "✓" : "✗"}
- Análisis: ${consent.analytics ? "✓" : "✗"}
- Marketing: ${consent.marketing ? "✓" : "✗"}
Actualizado: ${new Date(consent.timestamp).toLocaleString("es-ES")}`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="divide-y divide-[#eeeeee]">
      {/* Header with status */}
      <div className="p-6 bg-gradient-to-r from-[#f9f9f9] to-white">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-[#222222]">Gestiona tu consentimiento</h2>
            <p className="text-sm text-[#666666] mt-1">
              Personaliza qué tipos de cookies permites usar
            </p>
          </div>
          {saved && (
            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-xs font-medium text-green-700">Guardado</span>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={acceptAll}
            className="bg-[#3898EC] text-white hover:bg-[#2895f7] text-sm"
          >
            Aceptar Todo
          </Button>
          <Button
            onClick={rejectAll}
            variant="outline"
            className="border-[#cccccc] text-[#666666] hover:bg-gray-50 text-sm"
          >
            Rechazar Todo
          </Button>
          <Button
            onClick={copyPreferences}
            variant="outline"
            className="border-[#cccccc] text-[#666666] hover:bg-gray-50 text-sm gap-2"
          >
            <Copy className="h-4 w-4" />
            {copied ? "Copiado" : "Copiar preferencias"}
          </Button>
        </div>
      </div>

      {/* Cookie Categories */}
      <div className="p-6 space-y-4">
        {/* Necessary - Always true */}
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-[#eeeeee]">
          <div className="flex-shrink-0 mt-1">
            <div className="flex items-center justify-center w-6 h-6 bg-[#3898EC] rounded-full">
              <input
                type="checkbox"
                checked={true}
                disabled
                className="w-4 h-4"
                aria-label="Cookies necesarias (siempre activadas)"
              />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[#222222]">🔒 Cookies Necesarias</h3>
            <p className="text-sm text-[#666666] mt-1">
              Esenciales para el funcionamiento y seguridad del sitio. Incluyen autenticación, 
              selecciones de idioma y protección contra ataques. <strong>No se pueden desactivar.</strong>
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-[#999999]">
              <span className="inline-block w-2 h-2 bg-[#3898EC] rounded-full"></span>
              Siempre activas
            </div>
          </div>
        </div>

        {/* Analytics */}
        <div className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${ consent.analytics
            ? "bg-blue-50 border-[#3898EC]/30"
            : "bg-white border-[#eeeeee] hover:border-[#cccccc]"
          }`}>
          <div className="flex-shrink-0 mt-1">
            <input
              type="checkbox"
              id="consent-analytics-settings"
              checked={consent.analytics}
              onChange={() => handleToggle("analytics")}
              className="w-5 h-5"
              aria-label="Cookies de análisis"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="consent-analytics-settings" className="font-semibold text-[#222222] cursor-pointer block">
              📊 Análisis y Rendimiento
            </label>
            <p className="text-sm text-[#666666] mt-1">
              Nos ayudan a entender cómo usas nuestro sitio: páginas visitadas, tiempo de permanencia, botones clicados. 
              Usamos <strong>Google Analytics</strong> con retención de 26 meses para mejorar continuamente nuestra plataforma.
            </p>
            <div className="mt-3 space-y-1">
              <div className="text-xs text-[#999999]">
                <strong>Proveedores:</strong> Google Analytics
              </div>
              <div className="text-xs text-[#999999]">
                <strong>Retención:</strong> 26 meses
              </div>
              <div className="text-xs text-[#999999]">
                <strong>Objetivo:</strong> Optimizar experiencia de usuario
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${ consent.analytics
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
              }`}>
              {consent.analytics ? "Activa" : "Inactiva"}
            </span>
          </div>
        </div>

        {/* Marketing */}
        <div className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${ consent.marketing
            ? "bg-purple-50 border-purple-300/30"
            : "bg-white border-[#eeeeee] hover:border-[#cccccc]"
          }`}>
          <div className="flex-shrink-0 mt-1">
            <input
              type="checkbox"
              id="consent-marketing-settings"
              checked={consent.marketing}
              onChange={() => handleToggle("marketing")}
              className="w-5 h-5"
              aria-label="Cookies de marketing"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="consent-marketing-settings" className="font-semibold text-[#222222] cursor-pointer block">
              📢 Marketing y Publicidad Personalizada
            </label>
            <p className="text-sm text-[#666666] mt-1">
              Permiten crear perfiles de interés y mostrar anuncios más relevantes. 
              Usamos múltiples plataformas para llegar contigo con información de propiedades que te interesan.
            </p>
            <div className="mt-3 space-y-1">
              <div className="text-xs text-[#999999]">
                <strong>Proveedores:</strong> Facebook Pixel, Google Ads, TikTok Pixel
              </div>
              <div className="text-xs text-[#999999]">
                <strong>Retención:</strong> Varía por proveedor (6 meses a 1 año)
              </div>
              <div className="text-xs text-[#999999]">
                <strong>Objetivo:</strong> Campañas personalizadas y remarketing
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${ consent.marketing
                ? "bg-purple-100 text-purple-700"
                : "bg-gray-100 text-gray-700"
              }`}>
              {consent.marketing ? "Activa" : "Inactiva"}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-6 bg-amber-50 border-t border-[#eeeeee]">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-900">
            Puedes cambiar tus preferencias en cualquier momento. 
            <span className="block mt-1 font-medium">
              Los cambios se sincronizarán automáticamente en todas tus pestañas abiertas.
            </span>
          </div>
        </div>
      </div>

      {/* Legal Footer */}
      <div className="p-4 bg-gray-50 text-center text-xs text-[#999999]">
        <p>
          Al usar nuestro sitio, aceptas nuestra{" "}
          <Link href={`/${locale}/politica-cookies`} className="text-[#3898EC] hover:underline">
            Política de Cookies
          </Link>
          {" "}y{" "}
          <Link href={`/${locale}/privacidad`} className="text-[#3898EC] hover:underline">
            Política de Privacidad
          </Link>
        </p>
      </div>
    </div>
  )
}
