"use client"

import Link from "next/link"
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import OptimizedImage from "@/components/optimized-image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { MessageCircle, X, Menu, Phone } from "lucide-react"
import { CONTACT } from "@/lib/config"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations('nav')
  const tc = useTranslations('common')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/premium`, label: t('premium') },
    {
      href: `/${locale}/residenciales`,
      label: t('residential'),
      children: [
        { href: `/${locale}/residenciales?search=Pacific%20Point`, label: "Pacific Point" },
        { href: `/${locale}/residenciales?search=Kings%20Park`, label: "Kings Park" },
        { href: `/${locale}/residenciales?search=Praderas%20de%20Arraijan`, label: "Praderas de Arraijan" },
        { href: `/${locale}/residenciales?search=The%20Tower%20residences`, label: "The Tower residences" },
        { href: `/${locale}/residenciales?search=Playa%20Escondida`, label: "Playa Escondida" },
        { href: `/${locale}/residenciales?search=New%20West`, label: "New West" },
      ],
    },
    {
      href: `/${locale}/comerciales`,
      label: t('commercial'),
      children: [
        { href: `/${locale}/comerciales?search=The%20Tower%20Business%20Plaza`, label: "The Tower Business Plaza" },
        { href: `/${locale}/comerciales?search=Central%20Plaza%20de%20Arraijan`, label: "Central Plaza de Arraijan" },
        { href: `/${locale}/comerciales?search=Sunset%20Strip`, label: "Sunset Strip" },
        { href: `/${locale}/comerciales?search=Balboa%20Boutique`, label: "Balboa Boutique" },
        { href: `/${locale}/comerciales?search=Plaza%20Los%20Guayacanes`, label: "Plaza Los Guayacanes" },
        { href: `/${locale}/comerciales?search=Rali%20Business%20Center`, label: "Rali Business Center" },
        { href: `/${locale}/comerciales?search=Evolution%20Tower`, label: "Evolution Tower" },
        { href: `/${locale}/comerciales?search=Boulevard%20Plaza%20Costa%20Verde`, label: "Boulevard Plaza Costa Verde" },
      ],
    },
    { href: `/${locale}/nosotros`, label: t('about') },
    { href: `/${locale}/contacto`, label: t('contact') },
  ]

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}`
    return pathname.startsWith(href)
  }

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${
        isScrolled
          ? "bg-white/98 shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
          : "bg-white/95"
      }`}
      aria-label="Navegación principal"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <OptimizedImage
              src="/images/logo-somosproperties-250x250px-transparente.png"
              alt="SOMOS Properties"
              type="small"
              width={110}
              height={110}
              priority
              className="h-auto w-[88px] md:w-[100px]"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className={`inline-flex items-center gap-2 text-[#222222] hover:text-[#3898EC] transition-colors relative pb-1 ${
                      isActive(link.href) ? "text-[#0082f3] border-b-2 border-[#0082f3]" : ""
                    }`}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <svg
                      className="h-3 w-3"
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
                  </Link>
                  <div className="absolute left-0 top-full hidden min-w-[220px] pt-2 group-hover:block">
                    <div className="rounded-xl border border-[#e6e6e6] bg-white/95 p-2 shadow-lg backdrop-blur-sm">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-lg px-3 py-2 text-sm text-[#222222] hover:bg-[#f2f6fb] hover:text-[#3898EC]"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    link.href === `/${locale}/contacto`
                      ? `inline-flex items-center px-4 py-2 rounded-lg bg-[#3898EC] text-white text-sm font-semibold hover:bg-[#0082f3] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC] focus-visible:ring-offset-2`
                      : `text-[#222222] hover:text-[#3898EC] transition-colors relative pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC] rounded ${
                        isActive(link.href) ? "text-[#0082f3] border-b-2 border-[#0082f3]" : ""
                      } ${link.href.includes('premium') ? "font-bold" : ""}`
                  }
                >
                  {link.label}
                </Link>
              )
            )}
            
            {/* Language Switcher */}
            <div className="flex items-center gap-2 border-l border-[#e6e6e6] pl-6">
              <Link
                href={pathname.replace(`/${locale}`, '/es')}
                className={`text-lg transition-opacity ${locale === 'es' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                title="Español"
              >
                🇪🇸
              </Link>
              <span className="text-[#e6e6e6]">/</span>
              <Link
                href={pathname.replace(`/${locale}`, '/en')}
                className={`text-lg transition-opacity ${locale === 'en' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                title="English"
              >
                🇺🇸
              </Link>
            </div>
          </div>

          {/* Mobile: Menu Button Only */}
          <div className="md:hidden flex items-center">
            {/* Mobile Menu Button */}
            <button
              className="flex items-center justify-center w-11 h-11 rounded-xl text-[#333333] hover:bg-[#f3f3f3] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC] focus-visible:ring-offset-1"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isOpen ? "true" : "false"}
              aria-controls="mobile-menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-[#eeeeee] animate-slide-up">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href} className="py-2">
                  <Link
                    href={link.href}
                    className={`block py-2 px-4 text-[#222222] hover:bg-[#f3f3f3] hover:text-[#3898EC] transition-colors ${
                      isActive(link.href) ? "text-[#0082f3] bg-[#f3f3f3]" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block py-2 pl-8 pr-4 text-sm text-[#4b4b4b] hover:bg-[#f3f3f3] hover:text-[#3898EC]"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-3 px-4 text-[#222222] hover:bg-[#f3f3f3] hover:text-[#3898EC] transition-colors ${
                    isActive(link.href) ? "text-[#0082f3] bg-[#f3f3f3]" : ""
                  } ${link.href.includes('premium') ? "font-bold" : ""}`}
                >
                  {link.label}
                </Link>
              )
            )}
            
            {/* Mobile Language Switcher */}
            <div className="flex items-center gap-3 px-4 py-3 border-t border-[#eeeeee] mt-2">
              <span className="text-sm text-[#666666]">{t('language')}:</span>
              <Link
                href={pathname.replace(`/${locale}`, '/es')}
                className={`text-2xl transition-opacity ${locale === 'es' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                title="Español"
              >
                🇪🇸
              </Link>
              <Link
                href={pathname.replace(`/${locale}`, '/en')}
                className={`text-2xl transition-opacity ${locale === 'en' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                title="English"
              >
                🇺🇸
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-[100] group flex flex-col items-end gap-3 pointer-events-none">
        <div className="bg-white px-4 py-2 rounded-xl shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-sm font-semibold text-gray-700 pointer-events-auto hidden md:block">
          {tc('whatsappPrompt')}
        </div>
        <a
          href={`https://wa.me/${CONTACT.whatsapp.raw}?text=${encodeURIComponent(tc('whatsappPrompt'))}`}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-[0_8px_30px_rgb(37,211,102,0.4)] hover:bg-[#1ebe5d] hover:scale-110 active:scale-95 transition-all duration-300"
          aria-label="WhatsApp"
        >
          <MessageCircle className="h-8 w-8 fill-white" />
        </a>
      </div>
    </nav>
  )
}