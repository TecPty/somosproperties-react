export function formatPrice(price: number): string {
  const hasCents = Number.isFinite(price) && Math.abs(price % 1) > 0
  const fractionDigits = hasCents ? 2 : 0

  const formatted = new Intl.NumberFormat("es-PA", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(price)

  return `$${formatted}`
}

export function formatArea(area: number): string {
  return `${area} m²`
}

export function formatDate(date: string): string {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const d = new Date(date)
  const day = d.getDate()
  const month = months[d.getMonth()]
  const year = d.getFullYear()

  return `${day} de ${month}, ${year}`
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("es-PA").format(num)
}
