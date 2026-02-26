import { NextResponse } from "next/server"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

  const apiKey = process.env.RESEND_API_KEY
  const emailFrom = process.env.CONTACT_EMAIL_FROM
  const emailTo = process.env.CONTACT_EMAIL_TO

  if (!apiKey || !emailFrom || !emailTo) {
    return NextResponse.json(
      {
        ok: false,
        error: "Email not configured",
      },
      { status: 500 },
    )
  }

  const subject = `Nuevo contacto${payload.propertyTitle ? `: ${payload.propertyTitle}` : ""}`
  const text = [
    `Nombre: ${payload.name}`,
    `Email: ${payload.email}`,
    `Teléfono: ${payload.phone}`,
    payload.consultationType ? `Tipo: ${payload.consultationType}` : null,
    payload.propertyTitle ? `Propiedad: ${payload.propertyTitle}` : null,
    payload.source ? `Fuente: ${payload.source}` : null,
    "",
    payload.message ?? "",
  ]
    .filter(Boolean)
    .join("\n")

  const html = `
    <h2>Nuevo contacto</h2>
    <p><strong>Nombre:</strong> ${payload.name}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Teléfono:</strong> ${payload.phone}</p>
    ${payload.consultationType ? `<p><strong>Tipo:</strong> ${payload.consultationType}</p>` : ""}
    ${payload.propertyTitle ? `<p><strong>Propiedad:</strong> ${payload.propertyTitle}</p>` : ""}
    ${payload.source ? `<p><strong>Fuente:</strong> ${payload.source}</p>` : ""}
    <p><strong>Mensaje:</strong></p>
    <p>${(payload.message || "").replace(/\n/g, "<br />")}</p>
  `

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: emailFrom,
        to: [emailTo],
        subject,
        text,
        html,
        reply_to: payload.email,
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error("RESEND_ERROR", errorBody)
      return NextResponse.json({ ok: false, error: "Email send failed" }, { status: 502 })
    }
  } catch (error) {
    console.error("RESEND_ERROR", error)
    return NextResponse.json({ ok: false, error: "Email send failed" }, { status: 502 })
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
