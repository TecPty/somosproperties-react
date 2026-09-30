"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PropertyGrid from "@/components/property-grid"
import Pagination from "@/components/pagination"
import { SchemaMarkupMultiple } from "@/components/schema-markup"
import { useProperties } from "@/hooks/use-properties"
import { useFilters } from "@/hooks/use-filters"
import { getCollectionSchema, getOrganizationSchema } from "@/lib/schema"
import { properties as allPropertiesData } from "@/lib/properties"

export default function ComercialesContent() {
  const { filters } = useFilters({ category: "Comercial" })
  const { properties, totalProperties, currentPage, totalPages, setCurrentPage } = useProperties(filters)

  const comercialProperties = allPropertiesData.filter((p) => p.category === "Comercial" && !p.hidden)

  return (
    <>
      {/* Schema Markup for SEO */}
      <SchemaMarkupMultiple
        schemas={[
          getOrganizationSchema(),
          getCollectionSchema(comercialProperties, "Comerciales", "/comerciales"),
        ].filter(Boolean) as Record<string, unknown>[]}
      />

      <Navbar />

      <main className="py-12 bg-[#fafafa] min-h-screen">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#222222] mb-2">Propiedades Comerciales en Panamá</h1>
            <p className="text-lg text-[#999999]">{totalProperties} propiedades encontradas</p>
          </div>

          <PropertyGrid properties={properties} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </main>

      <Footer />
    </>
  )
}
