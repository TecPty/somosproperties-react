import { NextResponse } from "next/server"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_FILE_BYTES = 10 * 1024 * 1024
const ALLOWED_EXTENSIONS = new Set([".pdf", ".doc", ".docx"])

function getExtension(filename: string) {
  const idx = filename.lastIndexOf(".")
  return idx === -1 ? "" : filename.slice(idx).toLowerCase()
}

export async function POST(request: Request) {
  let formData: FormData

  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid form data" }, { status: 400 })
  }

  const name = String(formData.get("name") || "").trim()
  const email = String(formData.get("email") || "").trim()
  const phone = String(formData.get("phone") || "").trim()
  const education = String(formData.get("education") || "").trim()
  const cv = formData.get("cv")

  const errors: Record<string, string> = {}

  if (!name) errors.name = "El nombre es requerido"
  if (!email) {
    errors.email = "El email es requerido"
  } else if (!EMAIL_RE.test(email)) {
    errors.email = "Email inválido"
  }
  if (!phone) errors.phone = "El teléfono es requerido"
  if (!education) errors.education = "Selecciona tu nivel de educación"

  if (!cv || !(cv instanceof File)) {
    errors.cv = "Adjunta tu CV"
  } else {
    const ext = getExtension(cv.name)
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      errors.cv = "Formato de CV inválido"
    }
    if (cv.size > MAX_FILE_BYTES) {
      errors.cv = "El archivo supera 10MB"
    }
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const emailFrom = process.env.EMPLOYMENT_EMAIL_FROM
  const emailToRaw = process.env.EMPLOYMENT_EMAIL_TO

  if (!apiKey || !emailFrom || !emailToRaw) {
    return NextResponse.json(
      {
        ok: false,
        error: "Email not configured",
      },
      { status: 500 },
    )
  }

  const emailTo = emailToRaw
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)

  const subject = `Nueva solicitud de empleo: ${name}`
  const text = [
    `Nombre: ${name}`,
    `Email: ${email}`,
    `Teléfono: ${phone}`,
    `Educación: ${education}`,
    cv instanceof File ? `CV: ${cv.name} (${Math.round(cv.size / 1024)} KB)` : "CV: no adjunto",
  ].join("\n")

  const html = `
    <h2>Nueva solicitud de empleo</h2>
    <p><strong>Nombre:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Teléfono:</strong> ${phone}</p>
    <p><strong>Educación:</strong> ${education}</p>
    <p><strong>CV:</strong> ${cv instanceof File ? `${cv.name} (${Math.round(cv.size / 1024)} KB)` : "No adjunto"}</p>
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
        to: emailTo,
        subject,
        text,
        html,
        reply_to: email,
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

  const webhookUrl = process.env.EMPLOYMENT_WEBHOOK_URL
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          education,
          cv: cv instanceof File ? { name: cv.name, size: cv.size, type: cv.type } : null,
          submittedAt: new Date().toISOString(),
          userAgent: request.headers.get("user-agent"),
        }),
      })
    } catch (error) {
      console.error("EMPLOYMENT_WEBHOOK_ERROR", error)
    }
  }

  return NextResponse.json({ ok: true })
}
