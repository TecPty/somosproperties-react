"use client"

import { useState } from "react"
import Link from "next/link"
import { useConsentManager } from "@/hooks/use-consent-manager"
import { Button } from "@/components/ui/button"

export default function ConsentBannerContent() {
  const { showBanner, acceptAll, rejectAll, setConsent, consent } = useConsentManager()
  const [expanded, setExpanded] = useState(false)

  if (!showBanner) return null

  return (
    <>
      {/* Backdrop - Solo cuando expandido */}
      {expanded && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setExpanded(false)}
          aria-hidden="true"
        />
      )}

      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#eeeeee] shadow-lg">
        <div className="container-custom py-6 px-4">
          {!expanded ? (
            // Modo compacto
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-[#222222] mb-2">Consentimiento de Cookies</h3>
                <p className="text-sm text-[#666666] mb-2">
                  Usamos cookies y tecnologías similares para mejorar tu experiencia. 
                  <Link href="/politica-cookies" className="text-[#3898EC] hover:underline ml-1">
                    Más información
                  </Link>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button
                  onClick={() => setExpanded(true)}
                  variant="outline"
                  className="text-[#3898EC] border-[#3898EC] hover:bg-[#3898EC]/5 w-full sm:w-auto"
                >
                  Personalizar
                </Button>
                <Button
                  onClick={rejectAll}
                  variant="outline"
                  className="border-[#cccccc] text-[#666666] hover:bg-gray-50 w-full sm:w-auto"
                >
                  Rechazar
                </Button>
                <Button
                  onClick={acceptAll}
                  className="bg-[#3898EC] text-white hover:bg-[#2895f7] w-full sm:w-auto"
                >
                  Aceptar Todo
                </Button>
              </div>
            </div>
          ) : (
            // Modo expandido - Personalización
            <div className="max-w-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#222222]">Gestionar Consentimiento</h2>
                <button
                  onClick={() => setExpanded(false)}
                  className="text-[#999999] hover:text-[#222222] text-2xl leading-none"
                  aria-label="Cerrar"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {/* Necessary - Always enabled */}
                <div className="flex items-start gap-3 p-4 bg-[#f9f9f9] rounded-lg border border-[#eeeeee]">
                  <input
                    type="checkbox"
                    id="consent-necessary"
                    checked={true}
                    disabled
                    className="mt-1"
                    aria-label="Cookies necesarias (siempre activadas)"
                  />
                  <div className="flex-1">
                    <label htmlFor="consent-necessary" className="font-medium text-[#222222] block">
                      Cookies Necesarias
                    </label>
                    <p className="text-sm text-[#666666] mt-1">
                      Esenciales para la funcionalidad del sitio. No se pueden desactivar.
                    </p>
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-[#eeeeee]">
                  <input
                    type="checkbox"
                    id="consent-analytics"
                    checked={consent.analytics}
                    onChange={(e) =>
                      setConsent({ ...consent, analytics: e.target.checked })
                    }
                    className="mt-1"
                    aria-label="Cookies de análisis"
                  />
                  <div className="flex-1">
                    <label htmlFor="consent-analytics" className="font-medium text-[#222222] block">
                      Análisis
                    </label>
                    <p className="text-sm text-[#666666] mt-1">
                      Google Analytics para entender cómo usas nuestro sitio.
                    </p>
                  </div>
                </div>

                {/* Marketing */}
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-[#eeeeee]">
                  <input
                    type="checkbox"
                    id="consent-marketing"
                    checked={consent.marketing}
                    onChange={(e) =>
                      setConsent({ ...consent, marketing: e.target.checked })
                    }
                    className="mt-1"
                    aria-label="Cookies de marketing"
                  />
                  <div className="flex-1">
                    <label htmlFor="consent-marketing" className="font-medium text-[#222222] block">
                      Marketing
                    </label>
                    <p className="text-sm text-[#666666] mt-1">
                      Facebook Pixel y TikTok para campañas personalizadas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={rejectAll}
                  variant="outline"
                  className="border-[#cccccc] text-[#666666] hover:bg-gray-50 flex-1"
                >
                  Rechazar Todo
                </Button>
                <Button
                  onClick={acceptAll}
                  className="bg-[#3898EC] text-white hover:bg-[#2895f7] flex-1"
                >
                  Aceptar Todo
                </Button>
                <Button
                  onClick={() => setExpanded(false)}
                  className="bg-[#222222] text-white hover:bg-[#333333] flex-1"
                >
                  Guardar Preferencias
                </Button>
              </div>

              <p className="text-xs text-[#999999] mt-4">
                Para más información, consulta nuestra{" "}
                <Link href="/privacidad" className="text-[#3898EC] hover:underline">
                  Política de Privacidad
                </Link>
                {" "}y{" "}
                <Link href="/politica-cookies" className="text-[#3898EC] hover:underline">
                  Política de Cookies
                </Link>
                . O gestiona tus preferencias en{" "}
                <Link href="/preferencias-cookies" className="text-[#3898EC] hover:underline">
                  Preferencias de Cookies
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
