import { NextResponse, type NextRequest } from "next/server"
import { Resend } from "resend"
import { employmentEmailHTML } from "@/lib/email-templates/employment"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_FILE_BYTES = 3.5 * 1024 * 1024
const ALLOWED_EXTENSIONS = new Set([".pdf", ".doc", ".docx"])

function getExtension(filename: string) {
  const idx = filename.lastIndexOf(".")
  return idx === -1 ? "" : filename.slice(idx).toLowerCase()
}

export async function POST(request: NextRequest) {
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
      errors.cv = "El archivo supera 3.5MB"
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
      { ok: false, error: "Email not configured" },
      { status: 500 }
    )
  }

  const resend = new Resend(apiKey)
  const emailTo = emailToRaw
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)

  const subject = `Nueva solicitud de empleo: ${name}`
  const html = employmentEmailHTML({
    name,
    email,
    phone,
    education,
    cvName: cv instanceof File ? cv.name : undefined,
    cvSize: cv instanceof File ? cv.size : undefined,
  })

  try {
    const cvBuffer = cv instanceof File ? Buffer.from(await cv.arrayBuffer()) : null
    const attachments = cvBuffer
      ? [
          {
            filename: cv instanceof File ? cv.name : "",
            content: cvBuffer.toString("base64"),
          },
        ]
      : undefined

    const response = await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      replyTo: email,
      subject,
      html,
      attachments,
    })

    if (response.error) {
      console.error("RESEND_ERROR", response.error)
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
