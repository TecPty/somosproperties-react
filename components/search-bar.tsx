"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface SearchBarProps {
  initialValue?: string
  className?: string
}

export default function SearchBar({ initialValue = "", className = "" }: SearchBarProps) {
  const [search, setSearch] = useState(initialValue)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      router.push(`/propiedades?search=${encodeURIComponent(search.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`max-w-[600px] w-full ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por ubicación, tipo de propiedad..."
          className="w-full px-6 py-4 pr-14 border border-[#cccccc] rounded-lg focus:border-[#3898EC] focus:outline-2 focus:outline-[#2895f7] transition-colors placeholder:text-[#999999] text-[#222222] bg-white shadow-lg"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#3898EC] text-white p-3 rounded-lg hover:bg-[#0082f3] transition-colors"
          aria-label="Buscar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  )
}
