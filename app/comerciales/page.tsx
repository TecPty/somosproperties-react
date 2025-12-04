"use client"

import { Suspense } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PropertyGrid from "@/components/property-grid"
import PropertyFiltersComponent from "@/components/property-filters"
import Pagination from "@/components/pagination"
import { useProperties } from "@/hooks/use-properties"
import { useFilters } from "@/hooks/use-filters"

function ComercialesContent() {
  const { filters, updateFilters, clearFilters } = useFilters({ category: "Comercial" })
  const { properties, totalProperties, currentPage, totalPages, setCurrentPage } = useProperties(filters)

  return (
    <>
      <Navbar />

      <main className="py-12 bg-[#fafafa] min-h-screen">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#222222] mb-2">Propiedades Comerciales en Panamá</h1>
            <p className="text-lg text-[#999999]">{totalProperties} propiedades encontradas</p>
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

      <Footer />
    </>
  )
}

export default function ComercialesPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ComercialesContent />
    </Suspense>
  )
}
