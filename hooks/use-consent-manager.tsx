"use client"

import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from "react"
import { setupConsentSync, saveConsent as syncSaveConsent, getStoredConsent } from "@/lib/sync-consent"

export interface ConsentPreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  timestamp: number
}

const STORAGE_KEY = "consentPreferences"
const DEFAULT_PREFERENCES: ConsentPreferences = {
  necessary: true, // Always true
  analytics: false,
  marketing: false,
  timestamp: 0,
}

interface ConsentContextType {
  consent: ConsentPreferences
  setConsent: (prefs: ConsentPreferences) => void
  hasConsented: boolean
  showBanner: boolean
  setShowBanner: (show: boolean) => void
  acceptAll: () => void
  rejectAll: () => void
}

const ConsentContext = createContext<ConsentContextType | null>(null)

export function useConsentManager(): ConsentContextType {
  const context = useContext(ConsentContext)
  if (!context) {
    throw new Error("useConsentManager must be used within ConsentProvider")
  }
  return context
}

interface ConsentProviderProps {
  children: ReactNode
}

export function ConsentProvider({ children }: ConsentProviderProps) {
  const [consent, setConsentState] = useState<ConsentPreferences>(DEFAULT_PREFERENCES)
  const [hasConsented, setHasConsented] = useState(false)
  const [showBanner, setShowBanner] = useState(false)

  // Initialize from localStorage and setup cross-tab sync
  useEffect(() => {
    try {
      const stored = getStoredConsent()
      if (stored) {
        setConsentState(stored)
        setHasConsented(true)
      } else {
        setShowBanner(true)
      }
    } catch {
      setShowBanner(true)
    }

    // Setup cross-tab synchronization
    const unsubscribe = setupConsentSync((updatedConsent) => {
      setConsentState(updatedConsent)
      setHasConsented(true)
      setShowBanner(false)
    })

    return unsubscribe
  }, [])

  const setConsent = useCallback((prefs: ConsentPreferences) => {
    const updated = {
      ...prefs,
      timestamp: Date.now(),
    }
    setConsentState(updated)
    setHasConsented(true)
    setShowBanner(false)
    
    // Save and sync across tabs
    syncSaveConsent(updated)

    // Trigger custom event for external scripts
    window.dispatchEvent(
      new CustomEvent("consentUpdated", { detail: updated })
    )
  }, [])

  const acceptAll = useCallback(() => {
    setConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    })
  }, [setConsent])

  const rejectAll = useCallback(() => {
    setConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    })
  }, [setConsent])

  return (
    <ConsentContext.Provider
      value={{
        consent,
        setConsent,
        hasConsented,
        showBanner,
        setShowBanner,
        acceptAll,
        rejectAll,
      }}
    >
      {children}
    </ConsentContext.Provider>
  )
}
