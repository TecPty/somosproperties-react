"use client"

import type React from "react"
import { forwardRef } from "react"
import { Search, X } from "lucide-react"

export interface PropertySearchInputProps {
  value: string
  onChange: (value: string) => void
  onClear: () => void
  onSubmit?: (value: string) => void
  placeholder: string
  ariaLabel: string
  clearAriaLabel: string
  formAriaLabel: string
  className?: string
  id?: string
}

/**
 * Shared presentational search field used by the global Navbar search and by
 * the property listing search. It owns no property-matching logic: the caller
 * decides what `value` means and what happens on change, clear and submit.
 */
const PropertySearchInput = forwardRef<HTMLInputElement, PropertySearchInputProps>(function PropertySearchInput(
  { value, onChange, onClear, onSubmit, placeholder, ariaLabel, clearAriaLabel, formAriaLabel, className = "", id },
  ref,
) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(value)
  }

  return (
    <form onSubmit={handleSubmit} role="search" aria-label={formAriaLabel} className={`w-full ${className}`}>
      <div className="relative flex items-center">
        <Search
          className="pointer-events-none absolute left-4 h-5 w-5 text-[#aaaaaa]"
          aria-hidden="true"
        />
        <input
          ref={ref}
          id={id}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label={ariaLabel}
          autoComplete="off"
          className="h-12 w-full rounded-xl border border-[#e6e6e6] bg-white pl-12 pr-14 text-base text-[#222222] transition-colors placeholder:text-[#aaaaaa] focus:border-[#3898EC] focus:outline-none focus:ring-2 focus:ring-[#3898EC]/30 [&::-webkit-search-cancel-button]:appearance-none"
        />
        {value && (
          <button
            type="button"
            onClick={onClear}
            aria-label={clearAriaLabel}
            className="absolute right-2 flex h-11 w-11 items-center justify-center rounded-full text-[#aaaaaa] transition-colors hover:bg-[#f3f3f3] hover:text-[#555555] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </form>
  )
})

export default PropertySearchInput
