"use client"

import { createContext, useCallback, useContext, useMemo, useRef, type ReactNode } from "react"

type SearchUpdater = (value: string | undefined) => void

interface PropertySearchBridgeValue {
  /** Called by the mounted listing. Returns an unregister cleanup. */
  registerSearchUpdater: (updater: SearchUpdater) => () => void
  /** Called by the global header to ask the active listing to change its search. */
  requestSearchUpdate: (value: string | undefined) => void
  /** Whether a listing is currently mounted and able to accept commands. */
  hasActiveListing: () => boolean
}

const PropertySearchBridgeContext = createContext<PropertySearchBridgeValue | null>(null)

/**
 * Command bridge between the global header search and whichever property
 * listing is mounted.
 *
 * It deliberately holds NO search state. The canonical value stays in the
 * listing's `filters.search`, and `useFilters` remains the only writer of the
 * search/filter query params. This context only forwards a command so that the
 * header never writes the URL itself — one writer, no lost params.
 */
export function PropertySearchBridgeProvider({ children }: { children: ReactNode }) {
  const updaterRef = useRef<SearchUpdater | null>(null)
  // Holds at most one not-yet-deliverable command (not application state).
  const pendingCommandRef = useRef<{ value: string | undefined } | null>(null)

  const registerSearchUpdater = useCallback((updater: SearchUpdater) => {
    updaterRef.current = updater

    // Flush a command issued before this listing finished mounting.
    const pending = pendingCommandRef.current
    if (pending) {
      pendingCommandRef.current = null
      updater(pending.value)
    }

    return () => {
      // Only clear if we are still the active listing: during a route
      // transition the incoming listing may register before we unmount.
      if (updaterRef.current === updater) {
        updaterRef.current = null
        // Never deliver a queued command to a route the user has left.
        pendingCommandRef.current = null
      }
    }
  }, [])

  const requestSearchUpdate = useCallback((value: string | undefined) => {
    const updater = updaterRef.current
    if (updater) {
      updater(value)
      return
    }
    pendingCommandRef.current = { value }
  }, [])

  const hasActiveListing = useCallback(() => updaterRef.current !== null, [])

  const value = useMemo(
    () => ({ registerSearchUpdater, requestSearchUpdate, hasActiveListing }),
    [registerSearchUpdater, requestSearchUpdate, hasActiveListing],
  )

  return (
    <PropertySearchBridgeContext.Provider value={value}>{children}</PropertySearchBridgeContext.Provider>
  )
}

export function usePropertySearchBridge() {
  return useContext(PropertySearchBridgeContext)
}
