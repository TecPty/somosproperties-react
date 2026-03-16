import { NextResponse } from "next/server"
import { Resend } from "resend"
import { contactEmailHTML } from "@/lib/email-templates/contact"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
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
  if (!payload.email?.trim()) {
    errors.email = "El email es requerido"
  } else if (!EMAIL_RE.test(payload.email)) {
    errors.email = "Email inválido"
  }
  if (!payload.phone?.trim()) errors.phone = "El teléfono es requerido"
  if (!payload.message?.trim()) errors.message = "El mensaje es requerido"

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 })
  }

  const emailFrom = process.env.CONTACT_EMAIL_FROM || "onboarding@resend.dev"
  const emailTo = process.env.CONTACT_EMAIL_TO || "ventas@somosproperties.com"

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY not configured")
    return NextResponse.json(
      {
        ok: false,
        error: "Email service not configured",
      },
      { status: 500 },
    )
  }

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
