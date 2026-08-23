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

function CloseIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
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
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const wasOpenRef = useRef(false)

  // Body scroll lock + initial focus + focus return on close/unmount
  useEffect(() => {
    if (open) {
      wasOpenRef.current = true
      document.body.style.overflow = "hidden"
      closeButtonRef.current?.focus()
    } else {
      document.body.style.overflow = ""
      if (wasOpenRef.current) {
        wasOpenRef.current = false
        returnFocusRef.current?.focus()
      }
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open, returnFocusRef])

  // Reset accordions each time the drawer closes
  useEffect(() => {
    if (!open) setOpenGroup(null)
  }, [open])

  // Escape + focus trap
  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
        return
      }
      if (e.key !== "Tab") return
      const panel = panelRef.current
      if (!panel) return
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      ).filter((el) => el.offsetParent !== null)
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, onClose])

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

  if (!open || typeof document === "undefined") return null

  return createPortal(
    <div className="lg:hidden">
      <>
          <div
            aria-hidden="true"
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/50"
          />
          <div
            ref={panelRef}
            id={id}
            role="dialog"
            aria-modal="true"
            aria-label={labels.mainNav}
            className="fixed inset-y-0 right-0 z-[71] flex h-full w-[min(88vw,380px)] flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#eeeeee] px-4 py-4">
              <span className="text-sm font-semibold text-[#222222]">{labels.mainNav}</span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label={labels.closeMenu}
                className="flex h-10 w-10 items-center justify-center rounded-md text-[#222222] hover:bg-[#f3f3f3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC]"
              >
                <CloseIcon />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-2">
              {navLinks.map((link) => {
                if (!link.children) {
                  const isContact = link.href === `/${locale}/contacto`
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={
                        isContact
                          ? "mx-2 my-2 block rounded-lg bg-[#3898EC] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[#0082f3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC] focus-visible:ring-offset-2"
                          : `block rounded-lg px-3 py-3 text-base text-[#222222] hover:bg-[#f2f6fb] hover:text-[#3898EC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC] ${
                              isActive(link.href) ? "font-semibold text-[#0082f3]" : ""
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
                        className={`flex-1 rounded-lg px-3 py-3 text-base text-[#222222] hover:bg-[#f2f6fb] hover:text-[#3898EC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC] ${
                          isActive(link.href) ? "font-semibold text-[#0082f3]" : ""
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
                      <div id={groupId} className="pb-2 pl-4">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-lg px-3 py-2 text-sm text-[#666666] hover:bg-[#f2f6fb] hover:text-[#3898EC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC]"
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

            <div className="flex items-center justify-center gap-3 border-t border-[#eeeeee] px-4 py-4">
              <button
                type="button"
                onClick={() => onLocaleChange("es")}
                disabled={isPending}
                title={labels.spanish}
                className={`text-lg transition-all ${locale === "es" ? "scale-110 opacity-100" : "opacity-40 hover:opacity-70"} ${
                  isPending ? "cursor-wait" : "cursor-pointer"
                }`}
              >
                🇪🇸
              </button>
              <span className="text-[#e6e6e6]">/</span>
              <button
                type="button"
                onClick={() => onLocaleChange("en")}
                disabled={isPending}
                title="English"
                className={`text-lg transition-all ${locale === "en" ? "scale-110 opacity-100" : "opacity-40 hover:opacity-70"} ${
                  isPending ? "cursor-wait" : "cursor-pointer"
                }`}
              >
                🇺🇸
              </button>
            </div>
          </div>
      </>
    </div>,
    document.body
  )
}
