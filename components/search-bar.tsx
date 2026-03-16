"use client"

import type React from "react"
import { useState, useRef, useEffect, useId } from "react"
import { useRouter } from "next/navigation"
import { Search, X, TrendingUp } from "lucide-react"

const POPULAR_SEARCHES = [
  "Pacific Point",
  "The Tower",
  "Kings Park",
  "Praderas de Arraijan",
  "Apartamento en Panamá",
  "Local comercial",
  "Playa Escondida",
]

interface SearchBarProps {
  initialValue?: string
  className?: string
}

export default function SearchBar({ initialValue = "", className = "" }: SearchBarProps) {
  const [search, setSearch] = useState(initialValue)
  const [isFocused, setIsFocused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const listboxId = useId()

  /** Suggestions: popular filtered by what the user typed */
  const suggestions = search.trim().length === 0
    ? POPULAR_SEARCHES
    : POPULAR_SEARCHES.filter((s) =>
        s.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 5)

  const showDropdown = isFocused && suggestions.length > 0

  const commit = (value: string) => {
    const q = value.trim() || search.trim()
    if (q) {
      setIsFocused(false)
      router.push(`/propiedades?search=${encodeURIComponent(q)}`)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    commit(search)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, -1))
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault()
      commit(suggestions[activeIndex])
    } else if (e.key === "Escape") {
      setIsFocused(false)
      setActiveIndex(-1)
    }
  }

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.closest("form")?.contains(e.target as Node)) {
        setIsFocused(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <form
      onSubmit={handleSubmit}
      className={`max-w-[600px] w-full ${className}`}
      role="search"
      aria-label="Buscar propiedades"
    >
      <div className="relative">
        {/* Input */}
        <div className={`relative flex items-center bg-white rounded-xl shadow-lg transition-all duration-200 ${
          isFocused ? "ring-2 ring-[#3898EC] shadow-[0_0_0_4px_rgba(56,152,236,0.15)]" : ""
        }`}>
          <Search
            className="absolute left-4 h-5 w-5 text-[#aaaaaa] pointer-events-none"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setActiveIndex(-1) }}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar por ubicación, residencial, tipo..."
            className="w-full pl-12 pr-24 py-4 rounded-xl bg-transparent focus:outline-none placeholder:text-[#aaaaaa] text-[#222222] text-base"
            aria-label="Campo de búsqueda"
            aria-autocomplete="list"
            aria-controls={showDropdown ? listboxId : undefined}
            aria-activedescendant={activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined}
            autoComplete="off"
          />
          {search && (
            <button
              type="button"
              onClick={() => { setSearch(""); inputRef.current?.focus() }}
              className="absolute right-14 flex items-center justify-center w-8 h-8 rounded-full text-[#aaaaaa] hover:text-[#555] hover:bg-[#f3f3f3] transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-2 flex items-center justify-center w-11 h-11 bg-[#3898EC] text-white rounded-lg hover:bg-[#0082f3] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC] focus-visible:ring-offset-2"
            aria-label="Buscar"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {showDropdown && (
          <ul
            id={listboxId}
            role="listbox"
            aria-label="Sugerencias de búsqueda"
            className="absolute z-50 top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-[#eeeeee] overflow-hidden animate-slide-up"
          >
            {search.trim().length === 0 && (
              <div className="flex items-center gap-2 px-4 py-2.5 text-xs text-[#aaaaaa] font-medium border-b border-[#f3f3f3]" role="presentation">
                <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                Búsquedas populares
              </div>
            )}
            {suggestions.map((s, i) => (
              <>
                <li
                  key={s}
                  id={`${listboxId}-option-${i}`}
                  role="option"
                  aria-selected={i === activeIndex}
                  onMouseDown={(e) => { e.preventDefault(); commit(s) }}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer text-sm transition-colors ${
                    i === activeIndex ? "bg-[#f0f7ff] text-[#3898EC]" : "text-[#333333] hover:bg-[#f7f7f7]"
                  }`}
                >
                  <Search className="h-4 w-4 text-[#cccccc] flex-shrink-0" aria-hidden="true" />
                  <span>
                    {search.trim().length > 0 ? (
                    // Bold-highlight matching part
                    s.split(new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")).map((part, pi) =>
                      part.toLowerCase() === search.toLowerCase()
                        ? <strong key={pi} className="font-semibold text-[#3898EC]">{part}</strong>
                        : <span key={pi}>{part}</span>
                    )
                  ) : s}
                </span>
              </li>
              </>
            ))}
          </ul>
        )}
      </div>
    </form>
  )
}

