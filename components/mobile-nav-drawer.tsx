"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import type { NavLink } from "@/components/navbar"

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function slugify(label: string) {
  return label.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "-")
}

interface MobileNavDrawerProps {
  id: string
  open: boolean
  onClose: () => void
  navLinks: NavLink[]
  locale: string
  isActive: (href: string) => boolean
  onLocaleChange: (locale: string) => void
  isPending: boolean
  returnFocusRef: React.RefObject<HTMLElement | null>
  labels: {
    mainNav: string
    closeMenu: string
    openMenu: string
    spanish: string
  }
}

export default function MobileNavDrawer({
  id,
  open,
  onClose,
  navLinks,
  locale,
  isActive,
  onLocaleChange,
  isPending,
  returnFocusRef,
  labels,
}: MobileNavDrawerProps) {
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [rendered, setRendered] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<{ top: number; right: number } | null>(null)

  // Keep the panel mounted briefly so its closing animation can finish.
  useEffect(() => {
    if (open) {
      setRendered(true)
      return
    }
    const timeout = window.setTimeout(() => setRendered(false), 180)
    return () => window.clearTimeout(timeout)
  }, [open])

  // A non-modal popover follows the header without locking page scrolling.
  useEffect(() => {
    if (!open) return
    const updatePosition = () => {
      const trigger = returnFocusRef.current
      if (!trigger) return
      const triggerRect = trigger.getBoundingClientRect()
      const headerRect = trigger.closest("nav")?.getBoundingClientRect()
      setPosition({
        top: (headerRect?.bottom ?? triggerRect.bottom) + 6,
        right: Math.max(12, document.documentElement.clientWidth - triggerRect.right),
      })
    }
    updatePosition()
    const frame = window.requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus())
    window.addEventListener("resize", updatePosition)
    window.addEventListener("scroll", updatePosition, { passive: true })
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("resize", updatePosition)
      window.removeEventListener("scroll", updatePosition)
    }
  }, [open, returnFocusRef])

  useEffect(() => {
    if (!open && !rendered) setOpenGroup(null)
  }, [open, rendered])

  // Close on Escape, an outside press, or keyboard focus leaving the popover.
  useEffect(() => {
    if (!open) return
    const outside = (target: EventTarget | null) => target instanceof Node &&
      !panelRef.current?.contains(target) && !returnFocusRef.current?.contains(target)
    const handlePointer = (event: PointerEvent) => {
      if (outside(event.target)) onClose()
    }
    const handleFocus = (event: FocusEvent) => {
      if (outside(event.target)) onClose()
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
        returnFocusRef.current?.focus()
      }
    }
    document.addEventListener("pointerdown", handlePointer)
    document.addEventListener("focusin", handleFocus)
    document.addEventListener("keydown", handleKey)
    return () => {
      document.removeEventListener("pointerdown", handlePointer)
      document.removeEventListener("focusin", handleFocus)
      document.removeEventListener("keydown", handleKey)
    }
  }, [open, onClose, returnFocusRef])

  // Auto-close if the viewport crosses into the desktop breakpoint while open
  useEffect(() => {
    if (!open) return
    const mql = window.matchMedia("(min-width: 1024px)")
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) onClose()
    }
    if (mql.matches) {
      onClose()
      return
    }
    mql.addEventListener("change", handleChange)
    return () => mql.removeEventListener("change", handleChange)
  }, [open, onClose])

  if ((!open && !rendered) || typeof document === "undefined") return null

  return createPortal(
    <div className={`lg:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open} inert={!open}>
      <style>{`
        @keyframes somos-menu-in { from { opacity: 0; transform: translateY(-8px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes somos-menu-out { from { opacity: 1; transform: translateY(0) scale(1); } to { opacity: 0; transform: translateY(-8px) scale(.98); } }
        @media (prefers-reduced-motion: reduce) {
          .somos-mobile-menu-motion { animation-duration: 1ms !important; }
        }
      `}</style>
      <>
          <div
            ref={panelRef}
            id={id}
            aria-label={labels.mainNav}
            style={{ top: position?.top, right: position?.right, maxHeight: `calc(100dvh - ${position?.top ?? 0}px - 12px)`, visibility: position ? "visible" : "hidden" }}
            className={`somos-mobile-menu-motion fixed z-[71] flex w-[230px] max-w-[calc(100vw-24px)] origin-top-right flex-col overflow-y-auto overscroll-contain rounded-2xl border border-[#3898EC]/30 bg-white p-3 shadow-xl ${open ? "animate-[somos-menu-in_200ms_ease-out_both]" : "animate-[somos-menu-out_180ms_ease-in_both]"}`}
          >
            <nav aria-label={labels.mainNav} className="space-y-1">
              {navLinks.map((link) => {
                if (!link.children) {
                  const isContact = link.href === `/${locale}/contacto`
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={onClose}
                      className={
                        isContact
                          ? "mt-2 block rounded-lg bg-[#3898EC] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[#0082f3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC] focus-visible:ring-offset-2"
                          : `block min-h-[44px] rounded-lg px-3 py-2 text-sm hover:bg-[#f2f6fb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC] ${
                              isActive(link.href) ? "bg-[#f2f6fb] font-semibold text-[#0082f3]" : "text-[#222222] hover:text-[#3898EC]"
                            }`
                      }
                    >
                      {link.label}
                    </Link>
                  )
                }

                const groupId = `mobile-accordion-${slugify(link.label)}`
                const groupOpen = openGroup === link.label
                return (
                  <div key={link.label} className="border-b border-[#f3f3f3] last:border-b-0">
                    <div className="flex items-center">
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={`min-h-[44px] flex-1 rounded-lg px-3 py-2 text-sm hover:bg-[#f2f6fb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC] ${
                          isActive(link.href) ? "bg-[#f2f6fb] font-semibold text-[#0082f3]" : "text-[#222222] hover:text-[#3898EC]"
                        }`}
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setOpenGroup((prev) => (prev === link.label ? null : link.label))}
                        aria-expanded={groupOpen}
                        aria-controls={groupId}
                        aria-label={`${link.label}: ${groupOpen ? labels.closeMenu : labels.openMenu}`}
                        className="flex h-11 w-11 items-center justify-center rounded-md text-[#222222] hover:bg-[#f3f3f3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC]"
                      >
                        <ChevronIcon open={groupOpen} />
                      </button>
                    </div>
                    {groupOpen && (
                      <div id={groupId} className="my-2 ml-4 border-l-2 border-[#3898EC]/20 pb-2 pl-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={onClose}
                            className="block rounded-lg min-h-[44px] flex items-center px-3 py-3 text-sm text-[#444444] hover:bg-[#f2f6fb] hover:text-[#3898EC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC]"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>

            <div className="mt-2 flex shrink-0 items-center justify-center gap-1 border-t border-[#eeeeee] pt-2">
              <button
                type="button"
                onClick={() => onLocaleChange("es")}
                disabled={isPending}
                title={labels.spanish}
                aria-label={labels.spanish}
                aria-pressed={locale === "es"}
                className={`min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg px-2 text-base text-[#222222] transition-colors ${locale === "es" ? "bg-[#f2f6fb] font-semibold" : "hover:bg-[#f3f3f3]"} ${
                  isPending ? "cursor-wait" : "cursor-pointer"
                }`}
              >
                <span aria-hidden="true">🇪🇸</span><span className="ml-1 text-xs font-medium">{labels.spanish}</span>
              </button>
              <span className="text-[#e6e6e6]">/</span>
              <button
                type="button"
                onClick={() => onLocaleChange("en")}
                disabled={isPending}
                title="English"
                aria-label="English"
                aria-pressed={locale === "en"}
                className={`min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg px-2 text-base text-[#222222] transition-colors ${locale === "en" ? "bg-[#f2f6fb] font-semibold" : "hover:bg-[#f3f3f3]"} ${
                  isPending ? "cursor-wait" : "cursor-pointer"
                }`}
              >
                <span aria-hidden="true">🇺🇸</span><span className="ml-1 text-xs font-medium">English</span>
              </button>
            </div>
          </div>
      </>
    </div>,
    document.body
  )
}
