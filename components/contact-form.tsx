"use client"

import type React from "react"
import { useState } from "react"
import { MessageCircle, Mail, CheckCircle, Loader2, ChevronDown } from "lucide-react"
import type { ContactFormData } from "@/lib/types"
import { trackGaEvent } from "@/lib/google-analytics"

const WA_PHONE = "50766770577"

interface ContactFormProps {
  compact?: boolean
  propertyTitle?: string
}

function buildWhatsAppUrl(propertyTitle?: string): string {
  const body = propertyTitle
    ? `Hola, me interesa la propiedad: *${propertyTitle}*. ¿Está disponible? Me gustaría recibir más información.`
    : `Hola, me gustaría recibir información sobre propiedades disponibles.`
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(body)}`
}

export default function ContactForm({ compact = false, propertyTitle }: ContactFormProps) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    consultationType: propertyTitle ? "Información sobre propiedad" : "",
    message: propertyTitle ? `Me interesa ${propertyTitle}` : "",
    terms: true,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleWhatsApp = () => {
    trackGaEvent("whatsapp_contact", { source: "contact_form", property: propertyTitle })
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {}
    if (!formData.name.trim()) newErrors.name = "El nombre es requerido"
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }
    if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido"
    if (!formData.message.trim()) newErrors.message = "El mensaje es requerido"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          consultationType: formData.consultationType,
          message: formData.message,
          propertyTitle,
          source: compact ? "compact_form" : "contact_form",
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        if (data?.errors) {
          setErrors((prev) => ({ ...prev, ...data.errors }))
        }
        setSubmitError("No se pudo enviar el formulario. Intenta nuevamente.")
        return
      }

      setSubmitted(true)
      trackGaEvent("lead_form_submit", { property: propertyTitle })
      setTimeout(() => {
        setFormData({ name: "", email: "", phone: "", consultationType: "", message: "", terms: true })
        setSubmitted(false)
        setShowForm(false)
      }, 4000)
    } catch {
      setSubmitError("No se pudo enviar el formulario. Verifica tu conexión.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const inputClass = (field: keyof ContactFormData) =>
    `w-full px-4 py-3 text-sm border rounded-xl transition-all placeholder:text-[#aaaaaa] bg-white focus:outline-none focus:ring-2 focus:ring-offset-0 ${
      errors[field]
        ? "border-[#ea384c] focus:ring-[#ea384c]/25"
        : "border-[#dddddd] focus:border-[#3898EC] focus:ring-[#3898EC]/20"
    }`

  if (submitted) {
    return (
      <div className="bg-[#f0fdf4] border border-[#22c55e]/30 rounded-xl p-8 text-center">
        <CheckCircle className="h-12 w-12 text-[#22c55e] mx-auto mb-3" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-[#222222] mb-1">¡Mensaje Enviado!</h3>
        <p className="text-sm text-[#555555]">Te contactaremos a la brevedad.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* ── Primary CTA: WhatsApp ── */}
      <a
        href={buildWhatsAppUrl(propertyTitle)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsApp}
        className="flex items-center justify-center gap-3 w-full min-h-[52px] bg-[#25D366] text-white rounded-xl font-semibold text-base hover:bg-[#1ebe5d] active:scale-[0.98] transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
        aria-label={propertyTitle ? `Contactar por WhatsApp sobre ${propertyTitle}` : "Contactar por WhatsApp"}
      >
        <MessageCircle className="h-5 w-5 fill-white" aria-hidden="true" />
        Consultar por WhatsApp
      </a>

      <p className="text-center text-xs text-[#aaaaaa]">Respuesta inmediata · Sin formularios</p>

      {/* ── Secondary CTA: Email form toggle ── */}
      {!compact && (
        <>
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center justify-center gap-2 w-full py-3 border border-[#dddddd] rounded-xl text-sm text-[#555555] hover:border-[#3898EC] hover:text-[#3898EC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC]"
            aria-expanded={showForm}
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Prefiero enviar un email
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${showForm ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>

          {showForm && (
            <form onSubmit={handleSubmit} className="space-y-4 pt-2 animate-slide-up" noValidate>
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#333333] mb-1.5">
                  Nombre *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass("name")}
                  placeholder="Tu nombre"
                  autoComplete="name"
                />
                {errors.name && <p className="mt-1 text-xs text-[#ea384c]" role="alert">{errors.name}</p>}
              </div>

              {/* Email + Phone in 2-col on wider screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#333333] mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass("email")}
                    placeholder="tu@email.com"
                    autoComplete="email"
                  />
                  {errors.email && <p className="mt-1 text-xs text-[#ea384c]" role="alert">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#333333] mb-1.5">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass("phone")}
                    placeholder="+507 6789-0123"
                    autoComplete="tel"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-[#ea384c]" role="alert">{errors.phone}</p>}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#333333] mb-1.5">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={compact ? 3 : 5}
                  className={`${inputClass("message")} resize-none`}
                  placeholder="Cuéntanos qué necesitas..."
                />
                {errors.message && <p className="mt-1 text-xs text-[#ea384c]" role="alert">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 w-full min-h-[44px] bg-[#3898EC] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#0082f3] active:scale-[0.98] transition-all disabled:bg-[#eeeeee] disabled:text-[#aaaaaa] disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC] focus-visible:ring-offset-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Enviando...
                  </>
                ) : (
                  "Enviar Mensaje"
                )}
              </button>
              {submitError && <p className="text-xs text-[#b00020]">{submitError}</p>}
            </form>
          )}
        </>
      )}

      {/* Compact mode: always show mini form */}
      {compact && (
        <form onSubmit={handleSubmit} className="space-y-3 pt-1" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass("name")}
                placeholder="Tu nombre"
                aria-label="Nombre"
              />
              {errors.name && <p className="mt-1 text-xs text-[#ea384c]" role="alert">{errors.name}</p>}
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass("phone")}
                placeholder="+507 6789-0123"
                aria-label="Teléfono"
              />
              {errors.phone && <p className="mt-1 text-xs text-[#ea384c]" role="alert">{errors.phone}</p>}
            </div>
          </div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            className={`${inputClass("message")} resize-none`}
            placeholder="¿Qué te gustaría saber?"
            aria-label="Mensaje"
          />
          {errors.message && <p className="mt-1 text-xs text-[#ea384c]" role="alert">{errors.message}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 w-full min-h-[44px] bg-[#3898EC] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#0082f3] active:scale-[0.98] transition-all disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC] focus-visible:ring-offset-2"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
          {submitError && <p className="text-xs text-[#b00020]">{submitError}</p>}
        </form>
      )}
    </div>
  )
}
