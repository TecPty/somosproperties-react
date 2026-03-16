/**
 * Sincronización de consentimientos entre pestañas del navegador
 * Usa LocalStorage + StorageEvent para syncronizar estado en tiempo real
 */

import { ConsentPreferences } from "@/hooks/use-consent-manager"

const CONSENT_STORAGE_KEY = "consentPreferences"
const CONSENT_EVENT_KEY = "_consent_updated"

/**
 * Emite evento personalizado cuando el consentimiento cambia en otra pestaña
 */
export function setupConsentSync(callback: (consent: ConsentPreferences) => void) {
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === CONSENT_EVENT_KEY) {
      try {
        const data = e.newValue ? JSON.parse(e.newValue) : null
        if (data?.consent) {
          callback(data.consent)
        }
      } catch (error) {
        console.error("[ConsentSync] Error parsing consent from storage:", error)
      }
    }
  }

  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }
}

/**
 * Obtiene consentimiento del localStorage
 */
export function getStoredConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null

  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error("[ConsentSync] Error reading stored consent:", error)
    return null
  }
}

/**
 * Guarda consentimiento y notifica a otras pestañas
 */
export function saveConsent(consent: ConsentPreferences) {
  if (typeof window === "undefined") return

  try {
    // Guardar consentimiento principal
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent))

    // Emitir evento para otras pestañas
    localStorage.setItem(
      CONSENT_EVENT_KEY,
      JSON.stringify({
        consent,
        timestamp: Date.now(),
      })
    )

    // Limpiar evento después de un tiempo para evitar acumulación
    setTimeout(() => {
      localStorage.removeItem(CONSENT_EVENT_KEY)
    }, 1000)
  } catch (error) {
    console.error("[ConsentSync] Error saving consent:", error)
  }
}

/**
 * Borra todo consentimiento y syncs entre pestañas
 */
export function clearConsent() {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem(CONSENT_STORAGE_KEY)
    localStorage.setItem(
      CONSENT_EVENT_KEY,
      JSON.stringify({
        consent: null,
        timestamp: Date.now(),
      })
    )

    setTimeout(() => {
      localStorage.removeItem(CONSENT_EVENT_KEY)
    }, 1000)
  } catch (error) {
    console.error("[ConsentSync] Error clearing consent:", error)
  }
}

/**
 * Hook para auditoría: obtiene timestamp del último cabio
 */
export function getConsentTimestamp(): number | null {
  if (typeof window === "undefined") return null

  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!stored) return null

    const data = JSON.parse(stored)
    return data.timestamp || null
  } catch {
    return null
  }
}
