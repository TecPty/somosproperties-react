"use client"

import PropertyGrid from "@/components/property-grid"
import PropertySearchInput from "@/components/property-search-input"
import PropertyFiltersComponent from "@/components/property-filters"
import Pagination from "@/components/pagination"
import { useProperties } from "@/hooks/use-properties"
import { useFilters } from "@/hooks/use-filters"
import { useTranslations } from "next-intl"

export default function PropiedadesContent() {
  const t = useTranslations('propiedades')
  const tSearch = useTranslations('searchBar')
  const { filters, updateFilters, clearFilters } = useFilters()
  const { properties, totalProperties, currentPage, totalPages, setCurrentPage } = useProperties(filters)

  return (
    <>


      <main className="py-12 bg-[#fafafa] min-h-screen">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#222222] mb-2">{t('title')}</h1>
            <p className="text-lg text-[#999999]">{t('subtitle', { count: totalProperties })}</p>
          </div>

          <div className="mb-8 max-w-2xl">
            <PropertySearchInput
              id="listing-search-propiedades"
              value={filters.search ?? ""}
              onChange={(value) => updateFilters({ search: value || undefined })}
              onClear={() => updateFilters({ search: undefined })}
              placeholder={tSearch('placeholder')}
              ariaLabel={`${tSearch('inputAriaLabel')} — ${t('title')}`}
              clearAriaLabel={tSearch('clearAriaLabel')}
              formAriaLabel={`${tSearch('formAriaLabel')} — ${t('title')}`}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-[280px] flex-shrink-0">
              <PropertyFiltersComponent filters={filters} onFiltersChange={updateFilters} onClear={clearFilters} />
            </div>

            {/* Properties Grid */}
            <div className="flex-1">
              <PropertyGrid properties={properties} />
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          </div>
        </div>
      </main>


    </>
  )
}
