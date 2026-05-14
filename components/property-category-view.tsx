"use client"

import PropertyGrid from "@/components/property-grid"
import PropertyFiltersComponent from "@/components/property-filters"
import Pagination from "@/components/pagination"
import { SchemaMarkupMultiple } from "@/components/schema-markup"
import { useProperties } from "@/hooks/use-properties"
import { useFilters } from "@/hooks/use-filters"
import { getCollectionSchema, getOrganizationSchema } from "@/lib/schema"
import { properties as allPropertiesData } from "@/lib/properties"
import { useTranslations } from "next-intl"

interface PropertyCategoryViewProps {
  category: "Residencial" | "Comercial"
  namespace: string
}

export default function PropertyCategoryView({ category, namespace }: PropertyCategoryViewProps) {
  const t = useTranslations(namespace)
  const { filters, updateFilters, clearFilters } = useFilters({ category })
  const { properties, totalProperties, currentPage, totalPages, setCurrentPage } = useProperties(filters)

  const categoryProperties = allPropertiesData.filter((p) => p.category === category && !p.hidden)

  return (
    <>
      {/* Schema Markup for SEO */}
      <SchemaMarkupMultiple
        schemas={[
          getOrganizationSchema(),
          getCollectionSchema(categoryProperties, t('seo.collectionName'), t('seo.path')),
        ].filter(Boolean) as Record<string, unknown>[]}
      />

      <main className="py-12 bg-[#fafafa] min-h-screen">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#222222] mb-2">{t('title')}</h1>
            <p className="text-lg text-[#999999]">{t('resultsCount', { count: totalProperties })}</p>
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
