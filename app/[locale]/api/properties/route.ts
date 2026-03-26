import { readFileSync } from "fs"
import { join } from "path"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import type { Property } from "@/lib/types"

let cachedProperties: Property[] | null = null

function loadProperties(): Property[] {
  if (cachedProperties !== null) {
    return cachedProperties
  }

  try {
    const filePath = join(process.cwd(), "data", "properties.json")
    const fileContents = readFileSync(filePath, "utf8")
    const data = JSON.parse(fileContents)
    const properties = Array.isArray(data.properties) ? data.properties : []
    cachedProperties = properties
    return properties
  } catch {
    cachedProperties = []
    return []
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const page = Math.max(1, parseInt(searchParams.get("page") || "1"))
  const limit = Math.min(100, parseInt(searchParams.get("limit") || "12"))
  const category = searchParams.get("category") || null
  const city = searchParams.get("city") || null
  const operation = searchParams.get("operation") || null
  const featured = searchParams.get("featured") === "true"
  const search = searchParams.get("search") || null

  try {
    let properties = loadProperties()

    // Apply filters
    properties = properties.filter((prop) => {
      if (featured && !prop.featured) return false
      if (category && prop.category !== category) return false
      if (city && prop.city !== city) return false
      if (operation && prop.operation !== operation) return false
      if (search) {
        const searchLower = search.toLowerCase()
        return (
          prop.title.toLowerCase().includes(searchLower) ||
          prop.description.toLowerCase().includes(searchLower) ||
          prop.location.toLowerCase().includes(searchLower)
        )
      }
      return true
    })

    const total = properties.length
    const totalPages = Math.ceil(total / limit)
    const start = (page - 1) * limit
    const paginatedProperties = properties.slice(start, start + limit)

    return NextResponse.json(
      {
        success: true,
        data: paginatedProperties,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasMore: page < totalPages,
        },
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    )
  } catch (error) {
    console.error("Error loading properties:", error)
    return NextResponse.json({ success: false, error: "Failed to load properties" }, { status: 500 })
  }
}
