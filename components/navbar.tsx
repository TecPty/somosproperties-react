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
    { href: "/residenciales", label: "Residenciales" },
    { href: "/comerciales", label: "Comerciales" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/contacto", label: "Contacto" },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-md bg-white/45 transition-all duration-300 ${
        isScrolled ? "shadow-[0_2px_8px_rgba(0,0,0,0.1)]" : ""
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/Logo-SP.png"
              alt="SOMOS Properties"
              width={230}
              height={76}
              priority
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[#222222] hover:text-[#3898EC] transition-colors relative pb-1 ${
                  isActive(link.href) ? "text-[#0082f3] border-b-2 border-[#0082f3]" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
          <div className="md:hidden py-4 border-t border-[#eeeeee]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-3 px-4 text-[#222222] hover:bg-[#f3f3f3] hover:text-[#3898EC] transition-colors ${
                  isActive(link.href) ? "text-[#0082f3] bg-[#f3f3f3]" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
