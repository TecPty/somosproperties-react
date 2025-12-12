import { notFound } from "next/navigation"
import type { Property } from "@/lib/types"
import { properties as allPropertiesData } from "@/lib/properties"
import PropertyDetails from "@/components/property-details"

export default async function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const propertyId = Number.parseInt(id, 10)
  if (Number.isNaN(propertyId)) {
    notFound()
  }

  const allProperties: Property[] = allPropertiesData
  const property = allProperties.find((p) => p.id === propertyId)

  if (!property) {
    notFound()
  }

  const similarProperties = allProperties
    .filter((p) => p.id !== property.id && p.category === property.category && p.district === property.district)
    .slice(0, 3)

  return <PropertyDetails property={property} similarProperties={similarProperties} />
}
