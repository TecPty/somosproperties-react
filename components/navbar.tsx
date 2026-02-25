"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

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
    { href: "/", label: "Inicio" },
    { href: "/premium", label: "Premium" },
    {
      href: "/residenciales",
      label: "Residenciales",
      children: [
        { href: "/residenciales?search=Pacific%20Point", label: "Pacific Point" },
        { href: "/residenciales?search=Kings%20Park", label: "Kings Park" },
        { href: "/residenciales?search=Praderas%20de%20Arraijan", label: "Praderas de Arraijan" },
        { href: "/residenciales?search=The%20Tower%20residences", label: "The Tower residences" },
        { href: "/residenciales?search=Playa%20Escondida", label: "Playa Escondida" },
        { href: "/residenciales?search=New%20West", label: "New West" },
      ],
    },
    {
      href: "/comerciales",
      label: "Comerciales",
      children: [
        { href: "/comerciales?search=The%20Tower%20Business%20Plaza", label: "The Tower Business Plaza" },
        { href: "/comerciales?search=Central%20Plaza%20de%20Arraijan", label: "Central Plaza de Arraijan" },
        { href: "/comerciales?search=Sunset%20Strip", label: "Sunset Strip" },
        { href: "/comerciales?search=Balboa%20Boutique", label: "Balboa Boutique" },
        { href: "/comerciales?search=Plaza%20Los%20Guayacanes", label: "Plaza Los Guayacanes" },
        { href: "/comerciales?search=Rali%20Business%20Center", label: "Rali Business Center" },
        { href: "/comerciales?search=Evolution%20Tower", label: "Evolution Tower" },
        { href: "/comerciales?search=Boulevard%20Plaza%20Costa%20Verde", label: "Boulevard Plaza Costa Verde" },
      ],
    },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/contacto", label: "Contacto" },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
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
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-somosproperties-250x250px-transparente.png"
              alt="SOMOS Properties"
              width={110}
              height={110}
              className="h-auto w-[88px] md:w-[100px]"
              priority
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
                    link.href === "/contacto"
                      ? `inline-flex items-center px-4 py-2 rounded-lg bg-[#3898EC] text-white text-sm font-semibold hover:bg-[#0082f3] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC] focus-visible:ring-offset-2`
                      : `text-[#222222] hover:text-[#3898EC] transition-colors relative pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC] rounded ${
                          isActive(link.href) ? "text-[#0082f3] border-b-2 border-[#0082f3]" : ""
                        } ${link.href === "/premium" ? "font-bold" : ""}`
                  }
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl text-[#333333] hover:bg-[#f3f3f3] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC] focus-visible:ring-offset-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
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
                  } ${link.href === "/premium" ? "font-bold" : ""}`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
