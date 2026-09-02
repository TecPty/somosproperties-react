"use client"

import Link from "next/link"
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import OptimizedImage from "@/components/optimized-image"
import { useState, useEffect, useRef, useTransition } from "react"
import { createPortal } from "react-dom"
import { usePathname } from "next/navigation"
import MobileNavDrawer from "@/components/mobile-nav-drawer"

export type NavChild = { href: string; label: string }
export type NavLink = { href: string; label: string; children?: NavChild[] }

const CHEVRON = (
  <svg className="h-3 w-3 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
      clipRule="evenodd"
    />
  </svg>
)

function slugify(label: string) {
  return label.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "-")
}

function NavDropdown({
  link,
  isActive,
  openMenu,
  setOpenMenu,
  toggleLabel,
}: {
  link: NavLink
  isActive: (href: string) => boolean
  openMenu: string | null
  setOpenMenu: (updater: string | null | ((prev: string | null) => string | null)) => void
  toggleLabel: (open: boolean) => string
}) {
  const triggerRef = useRef<HTMLDivElement>(null)
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null)
  const isOpenState = openMenu === link.label
  const id = `submenu-${slugify(link.label)}`

  const cancelClose = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current)
      closeTimeout.current = null
    }
  }

  const openAt = () => {
    cancelClose()
    const rect = triggerRef.current?.getBoundingClientRect()
    if (rect) setCoords({ top: rect.bottom + 4, left: rect.left })
    setOpenMenu(link.label)
  }

  const scheduleClose = () => {
    cancelClose()
    closeTimeout.current = setTimeout(() => {
      setOpenMenu((prev) => (prev === link.label ? null : prev))
    }, 150)
  }

  useEffect(() => () => cancelClose(), [])

  return (
    <div
      ref={triggerRef}
      data-nav-dropdown={link.label}
      className="relative shrink-0"
      onMouseEnter={openAt}
      onMouseLeave={scheduleClose}
      onFocus={openAt}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleClose()
      }}
    >
      <span className="inline-flex items-center gap-1">
        <Link
          href={link.href}
          className={`whitespace-nowrap text-[#222222] hover:text-[#3898EC] transition-colors relative pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC] rounded ${
            isActive(link.href) ? "text-[#0082f3] border-b-2 border-[#0082f3]" : ""
          }`}
        >
          {link.label}
        </Link>
        <button
          type="button"
          onClick={() => (isOpenState ? scheduleClose() : openAt())}
          aria-expanded={isOpenState}
          aria-controls={id}
          aria-label={`${link.label}: ${toggleLabel(isOpenState)}`}
          className="flex items-center justify-center h-8 w-8 -mx-1 rounded-md text-[#222222] hover:text-[#3898EC] hover:bg-[#f3f3f3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC]"
        >
          {CHEVRON}
        </button>
      </span>

      {isOpenState &&
        coords &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            id={id}
            data-nav-dropdown={link.label}
            role="menu"
            style={{ position: "fixed", top: coords.top, left: coords.left }}
            className="z-[60] min-w-[220px] rounded-xl border border-[#e6e6e6] bg-white/95 p-2 shadow-lg backdrop-blur-sm"
            onMouseEnter={openAt}
            onMouseLeave={scheduleClose}
          >
            {link.children?.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                role="menuitem"
                className="block rounded-lg px-3 py-2 text-sm text-[#222222] hover:bg-[#f2f6fb] hover:text-[#3898EC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC]"
              >
                {child.label}
              </Link>
            ))}
          </div>,
          document.body
        )}
    </div>
  )
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const params = useParams()
  const router = useRouter()
  const locale = params.locale as string
  const t = useTranslations('nav')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setOpenMenu(null)
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!openMenu) return
    const closeAll = () => setOpenMenu(null)
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest("[data-nav-dropdown]")) closeAll()
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll()
    }
    window.addEventListener("click", handleClick)
    window.addEventListener("keydown", handleKey)
    window.addEventListener("scroll", closeAll, { passive: true })
    return () => {
      window.removeEventListener("click", handleClick)
      window.removeEventListener("keydown", handleKey)
      window.removeEventListener("scroll", closeAll)
    }
  }, [openMenu])

  // Prefetch alternate locale on mount
  useEffect(() => {
    const altLocale = locale === 'es' ? 'en' : 'es'
    const altPath = pathname.replace(`/${locale}`, `/${altLocale}`)
    router.prefetch(altPath)
  }, [locale, pathname, router])

  const handleLocaleChange = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    startTransition(() => {
      router.push(newPath)
    })
  }

  const navLinks: NavLink[] = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/premium`, label: t('premium') },
    {
      href: `/${locale}/comerciales`,
      label: t('commercial'),
      children: [
        { href: `/${locale}/comerciales?search=The%20Tower%20Business%20Plaza`, label: "The Tower Business Plaza" },
        { href: `/${locale}/comerciales?search=Central%20Plaza%20La%20Chorrera`, label: "Central Plaza, La Chorrera" },
        { href: `/${locale}/comerciales?search=Sunset%20Strip`, label: "Sunset Strip" },
        { href: `/${locale}/comerciales?search=Balboa%20Boutique`, label: "Balboa Boutique" },
        { href: `/${locale}/comerciales?search=Plaza%20Los%20Guayacanes`, label: "Plaza Los Guayacanes" },
        { href: `/${locale}/comerciales?search=Rali%20Business%20Center`, label: "Rali Business Center" },
        { href: `/${locale}/comerciales?search=Evolution%20Tower`, label: "Evolution Tower" },
        { href: `/${locale}/comerciales?search=Boulevard%20Plaza%20Costa%20Verde`, label: "Boulevard Plaza Costa Verde" },
        { href: `/${locale}/comerciales?search=Azuero%20Terminal`, label: "Azuero Terminal Plaza, Chitré" },
        { href: `/${locale}/comerciales?search=Cativ%C3%A1%20Plaza`, label: "Cativá Plaza, Colón" },
        { href: `/${locale}/comerciales?search=David%20Chiriqui`, label: "Locales David, Chiriquí" },
      ],
    },
    {
      href: `/${locale}/comerciales`,
      label: t('opportunities'),
      children: [
        { href: `/${locale}/propiedad/2012`, label: "Terreno El Ingenio, Ciudad Pmá" },
        { href: `/${locale}/propiedad/2007`, label: "Terreno Juan Díaz, Av. Arango (1.2 ha)" },
        { href: `/${locale}/propiedad/2015`, label: "Terreno Juan Díaz, Av. Arango (12,794 m²)" },
      ],
    },
    {
      href: `/${locale}/residenciales`,
      label: t('residential'),
      children: [
        { href: `/${locale}/residenciales?search=Pacific%20Point`, label: "Pacific Point" },
        { href: `/${locale}/residenciales?search=Kings%20Park`, label: "Kings Park" },
        { href: `/${locale}/residenciales?search=Marbella`, label: "Marbella" },
        { href: `/${locale}/residenciales?search=Praderas%20de%20Arraijan`, label: "Praderas de Arraijan" },
        { href: `/${locale}/residenciales?search=The%20Tower%20residences`, label: "The Tower residences" },
        { href: `/${locale}/residenciales?search=Playa%20Escondida`, label: "Playa Escondida" },
        { href: `/${locale}/residenciales?search=New%20West`, label: "New West" },
      ],
    },
    { href: `/${locale}/nosotros`, label: t('about') },
    { href: `/${locale}/contacto`, label: t('contact') },
  ]

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}`
    return pathname.startsWith(href)
  }

  const toggleLabel = (open: boolean) => (open ? t('closeMenu') : t('openMenu'))

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${
        isScrolled
          ? "bg-white/98 shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
          : "bg-white/95"
      }`}
      aria-label={t('mainNav')}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between gap-2 sm:gap-4 h-16 sm:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center shrink-0">
            <OptimizedImage
              src="/images/logo-somosproperties-250x250px-transparente.webp"
              alt="SOMOS Properties"
              type="small"
              width={110}
              height={110}
              priority
              className="h-auto w-[64px] sm:w-[84px] md:w-[92px] lg:w-[100px]"
            />
          </Link>

          {/* Desktop nav: visible from lg (1024px). Compact spacing between lg
              and xl, ample spacing restored from xl (1280px). */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) =>
              link.children ? (
                <NavDropdown
                  key={link.label}
                  link={link}
                  isActive={isActive}
                  openMenu={openMenu}
                  setOpenMenu={setOpenMenu}
                  toggleLabel={toggleLabel}
                />
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={
                    link.href === `/${locale}/contacto`
                      ? `shrink-0 whitespace-nowrap inline-flex items-center px-3 py-1.5 xl:px-4 xl:py-2 rounded-lg bg-[#3898EC] text-white text-sm font-semibold hover:bg-[#0082f3] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC] focus-visible:ring-offset-2`
                      : `shrink-0 whitespace-nowrap text-[#222222] hover:text-[#3898EC] transition-colors relative pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC] rounded ${
                          isActive(link.href) ? "text-[#0082f3] border-b-2 border-[#0082f3]" : ""
                        } ${link.href.includes('premium') ? "font-bold" : ""}`
                  }
                >
                  {link.label}
                </Link>
              )
            )}

            {/* Language Switcher */}
            <div className="flex items-center gap-2 shrink-0 border-l border-[#e6e6e6] pl-4 xl:pl-6 relative">
              {isPending && (
                <div className="absolute -left-6 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-[#3898EC] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <button
                onClick={() => handleLocaleChange('es')}
                disabled={isPending}
                className={`text-lg transition-all ${locale === 'es' ? 'opacity-100 scale-110' : 'opacity-40 hover:opacity-70'} ${isPending ? 'cursor-wait' : 'cursor-pointer'}`}
                title={t('spanish')}
              >
                🇪🇸
              </button>
              <span className="text-[#e6e6e6]">/</span>
              <button
                onClick={() => handleLocaleChange('en')}
                disabled={isPending}
                className={`text-lg transition-all ${locale === 'en' ? 'opacity-100 scale-110' : 'opacity-40 hover:opacity-70'} ${isPending ? 'cursor-wait' : 'cursor-pointer'}`}
                title="English"
              >
                🇺🇸
              </button>
            </div>
          </div>

          {/* Burger: visible below lg (1024px) */}
          <button
            ref={burgerRef}
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={toggleLabel(mobileMenuOpen)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-md text-[#222222] hover:bg-[#f3f3f3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC]"
          >
            <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M3 5.75A.75.75 0 013.75 5h12.5a.75.75 0 010 1.5H3.75A.75.75 0 013 5.75zM3 10a.75.75 0 01.75-.75h12.5a.75.75 0 010 1.5H3.75A.75.75 0 013 10zm0 4.25a.75.75 0 01.75-.75h12.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <MobileNavDrawer
        id="mobile-nav-drawer"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
        locale={locale}
        isActive={isActive}
        onLocaleChange={handleLocaleChange}
        isPending={isPending}
        returnFocusRef={burgerRef}
        labels={{
          mainNav: t('mainNav'),
          closeMenu: t('closeMenu'),
          openMenu: t('openMenu'),
          spanish: t('spanish'),
        }}
      />
    </nav>
  )
}
