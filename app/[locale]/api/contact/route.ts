import { NextResponse } from "next/server"
import { Resend } from "resend"
import { contactEmailHTML } from "@/lib/email-templates/contact"
import { rateLimit, getClientIp } from "@/lib/rate-limit"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Rate limit: 5 submissions per IP per 10 minutes
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60 * 1000

export async function POST(request: Request) {
  // ── Rate limiting ──────────────────────────────────────────────────────────
  const ip = getClientIp(request)
  const rl = rateLimit(ip, RATE_LIMIT, RATE_WINDOW_MS)
  if (rl.limited) {
    return NextResponse.json(
      { ok: false, error: "Demasiadas solicitudes. Intenta nuevamente más tarde." },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
    )
  }
  // ──────────────────────────────────────────────────────────────────────────

  let payload: {
    name?: string
    email?: string
    phone?: string
    consultationType?: string
    message?: string
    propertyTitle?: string
    source?: string
  }

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload" }, { status: 400 })
  }

  const errors: Record<string, string> = {}

  if (!payload.name?.trim()) errors.name = "El nombre es requerido"
  else if (payload.name.length > 100) errors.name = "Nombre demasiado largo"

  if (!payload.email?.trim()) {
    errors.email = "El email es requerido"
  } else if (!EMAIL_RE.test(payload.email)) {
    errors.email = "Email inválido"
  } else if (payload.email.length > 254) {
    errors.email = "Email demasiado largo"
  }

  if (!payload.phone?.trim()) errors.phone = "El teléfono es requerido"
  else if (payload.phone.length > 30) errors.phone = "Teléfono demasiado largo"

  if (!payload.message?.trim()) errors.message = "El mensaje es requerido"
  else if (payload.message.length > 2000) errors.message = "Mensaje demasiado largo (máx. 2000 caracteres)"

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 })
  }

  const emailFrom = process.env.CONTACT_EMAIL_FROM || "ventas@somosproperties.com"
  const emailTo = process.env.CONTACT_EMAIL_TO || "ventas@somosproperties.com"
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.error("RESEND_API_KEY not configured")
    return NextResponse.json(
      {
        ok: false,
        error: "Email service not configured",
      },
      { status: 500 },
    )
  }

  const resend = new Resend(apiKey)

  const subject = `Nuevo contacto${payload.propertyTitle ? `: ${payload.propertyTitle}` : ""}`

  try {
    const html = contactEmailHTML({
      name: payload.name!,
      email: payload.email!,
      phone: payload.phone!,
      consultationType: payload.consultationType,
      message: payload.message!,
      propertyTitle: payload.propertyTitle,
      source: payload.source,
    })

    const response = await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      replyTo: payload.email,
      subject,
      html,
    })

    if (response.error) {
      console.error("RESEND_ERROR", response.error)
      return NextResponse.json(
        { ok: false, error: "Failed to send email" },
        { status: 502 },
      )
    }
  } catch (error) {
    console.error("RESEND_ERROR", error)
    return NextResponse.json(
      { ok: false, error: "Failed to send email" },
      { status: 502 },
    )
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          submittedAt: new Date().toISOString(),
          userAgent: request.headers.get("user-agent"),
        }),
      })
    } catch (error) {
      console.error("CONTACT_WEBHOOK_ERROR", error)
    }
  }

  return NextResponse.json({ ok: true })
}
