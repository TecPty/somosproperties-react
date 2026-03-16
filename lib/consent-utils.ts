export function getConsent(): {
  necessary: boolean
  analytics: boolean
  marketing: boolean
} {
  if (typeof window === "undefined") {
    return { necessary: true, analytics: false, marketing: false }
  }

  try {
    const stored = localStorage.getItem("consentPreferences")
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {
    // Return defaults if parsing fails
  }

  return { necessary: true, analytics: false, marketing: false }
}

export function canTrack(category: "analytics" | "marketing"): boolean {
  const consent = getConsent()
  return consent[category] === true
}
