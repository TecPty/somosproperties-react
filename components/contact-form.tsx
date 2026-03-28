"use client"

import type React from "react"
import { useState } from "react"
import { MessageCircle, Mail, CheckCircle, Loader2, ChevronDown } from "lucide-react"
import { useTranslations } from "next-intl"
import type { ContactFormData } from "@/lib/types"
import { trackGaEvent } from "@/lib/google-analytics"
import { CONTACT } from "@/lib/config"

interface ContactFormProps {
  compact?: boolean
  propertyTitle?: string
}

function buildWhatsAppUrl(t: any, propertyTitle?: string): string {
  const body = propertyTitle
    ? t('whatsappBodyProperty', { title: propertyTitle })
    : t('whatsappBodyGeneral')
  return `https://wa.me/${CONTACT.whatsapp.raw}?text=${encodeURIComponent(body)}`
}

export default function ContactForm({ compact = false, propertyTitle }: ContactFormProps) {
  const t = useTranslations('home.contact')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    consultationType: propertyTitle ? t('formTitle') : "",
    message: propertyTitle ? `${t('messagePlaceholder')} ${propertyTitle}` : "",
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
    if (!formData.name.trim()) newErrors.name = t('errors.nameRequired')
    
    // En modo express (no compact), solo requerimos nombre y teléfono
    if (!compact) {
      if (!formData.phone.trim()) newErrors.phone = t('errors.phoneRequired')
    } else {
      // En modo compact, validamos todos los campos
      if (!formData.email.trim()) {
        newErrors.email = t('errors.emailRequired')
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = t('errors.emailInvalid')
      }
      if (!formData.phone.trim()) newErrors.phone = t('errors.phoneRequired')
      if (!formData.message.trim()) newErrors.message = t('errors.messageRequired')
    }
    
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
        setSubmitError(t('errors.submitError'))
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
      setSubmitError(t('errors.networkError'))
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
        <h3 className="text-lg font-semibold text-[#222222] mb-1">{t('successTitle')}</h3>
        <p className="text-sm text-[#555555]">{t('successSubtitle')}</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* ── Primary CTA: WhatsApp ── */}
      <a
        href={buildWhatsAppUrl(t, propertyTitle)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsApp}
        className="flex items-center justify-center gap-3 w-full min-h-[52px] bg-[#25D366] text-white rounded-xl font-semibold text-base hover:bg-[#1ebe5d] active:scale-[0.98] transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
        aria-label={propertyTitle ? `${t('whatsappButton')} - ${propertyTitle}` : t('whatsappButton')}
      >
        <MessageCircle className="h-5 w-5 fill-white" aria-hidden="true" />
        {t('whatsappButton')}
      </a>

      <p className="text-center text-xs text-[#aaaaaa]">{t('whatsappImmediate')}</p>

      {/* ── Divider ── */}
      {!compact && (
        <>
          <div className="relative flex items-center gap-4 my-4">
            <div className="flex-1 border-t border-gray-300" />
            <span className="text-xs text-gray-500 font-medium uppercase">{t('dividerOr')}</span>
            <div className="flex-1 border-t border-gray-300" />
          </div>

          {/* ── Express Form: Always visible (2 campos) ── */}
          <form onSubmit={handleSubmit} className="space-y-3" noValidate>
            {/* Name */}
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass("name")}
                placeholder={t('namePlaceholder')}
                autoComplete="name"
              />
              {errors.name && <p className="mt-1 text-xs text-[#ea384c]" role="alert">{errors.name}</p>}
            </div>

            {/* Phone */}
            <div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass("phone")}
                placeholder={t('phonePlaceholder')}
                autoComplete="tel"
              />
              {errors.phone && <p className="mt-1 text-xs text-[#ea384c]" role="alert">{errors.phone}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 w-full min-h-[52px] bg-[#3898EC] text-white py-3.5 rounded-xl font-semibold hover:bg-[#0082f3] active:scale-[0.98] transition-all disabled:bg-[#eeeeee] disabled:text-[#aaaaaa] disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC] focus-visible:ring-offset-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  {t('submittingButton')}
                </>
              ) : (
                t('submitButton')
              )}
            </button>
            
            <p className="text-xs text-center text-gray-500">
              {t('responseExpress')}
            </p>
            
            {submitError && <p className="text-xs text-center text-[#ea384c]">{submitError}</p>}
          </form>
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
                placeholder={t('namePlaceholder')}
                aria-label={t('namePlaceholder')}
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
                placeholder={t('phonePlaceholder')}
                aria-label={t('phonePlaceholder')}
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
            placeholder={t('messagePlaceholder')}
            aria-label={t('messagePlaceholder')}
          />
          {errors.message && <p className="mt-1 text-xs text-[#ea384c]" role="alert">{errors.message}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 w-full min-h-[44px] bg-[#3898EC] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#0082f3] active:scale-[0.98] transition-all disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3898EC] focus-visible:ring-offset-2"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
            {isSubmitting ? t('submittingButton') : t('submitButton')}
          </button>
          {submitError && <p className="text-xs text-[#b00020]">{submitError}</p>}
        </form>
      )}
    </div>
  )
}
