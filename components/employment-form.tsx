"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { CheckCircle, Loader2 } from "lucide-react"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type EmploymentErrors = Partial<
  Record<"name" | "email" | "phone" | "education" | "cv", string>
>

export default function EmploymentForm() {
  const t = useTranslations('employmentForm')
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [education, setEducation] = useState("")
  const [cv, setCv] = useState<File | null>(null)
  const [errors, setErrors] = useState<EmploymentErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validate = () => {
    const nextErrors: EmploymentErrors = {}

    if (!name.trim()) nextErrors.name = "El nombre es requerido"
    if (!email.trim()) {
      nextErrors.email = "El email es requerido"
    } else if (!EMAIL_RE.test(email)) {
      nextErrors.email = "Email inválido"
    }
    if (!phone.trim()) nextErrors.phone = "El teléfono es requerido"
    if (!education.trim()) nextErrors.education = "Selecciona una opción"
    if (!cv) nextErrors.cv = "Adjunta tu CV"

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const form = new FormData()
      form.append("name", name)
      form.append("email", email)
      form.append("phone", phone)
      form.append("education", education)
      if (cv) form.append("cv", cv)

      const response = await fetch("/api/empleo", {
        method: "POST",
        body: form,
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        if (data?.errors) {
          setErrors((prev) => ({ ...prev, ...data.errors }))
        }
        setSubmitError(t('errors.submitFailed'))
        return
      }

      setSubmitted(true)
      setTimeout(() => {
        setName("")
        setEmail("")
        setPhone("")
        setEducation("")
        setCv(null)
        setSubmitted(false)
      }, 4000)
    } catch {
      setSubmitError(t('errors.networkError'))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-[#f0fdf4] border border-[#22c55e]/30 rounded-xl p-8 text-center">
        <CheckCircle className="h-12 w-12 text-[#22c55e] mx-auto mb-3" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-[#222222] mb-1">{t('successTitle')}</h3>
        <p className="text-sm text-[#555555]">{t('successMessage')}</p>
      </div>
    )
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="emp-name" className="block text-sm font-medium text-[#333333] mb-2">
          {t('nameLabel')}
        </label>
        <input
          type="text"
          id="emp-name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full px-4 py-3 border border-[#cccccc] rounded-lg focus:border-[#3898EC] focus:outline-2 focus:outline-[#2895f7] bg-white"
          placeholder={t('namePlaceholder')}
          autoComplete="name"
        />
        {errors.name && <p className="mt-1 text-xs text-[#ea384c]">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="emp-email" className="block text-sm font-medium text-[#333333] mb-2">
          {t('emailLabel')}
        </label>
        <input
          type="email"
          id="emp-email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full px-4 py-3 border border-[#cccccc] rounded-lg focus:border-[#3898EC] focus:outline-2 focus:outline-[#2895f7] bg-white"
          placeholder="tu@email.com"
          autoComplete="email"
        />
        {errors.email && <p className="mt-1 text-xs text-[#ea384c]">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="emp-phone" className="block text-sm font-medium text-[#333333] mb-2">
          {t('phoneLabel')}
        </label>
        <input
          type="tel"
          id="emp-phone"
          name="phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="w-full px-4 py-3 border border-[#cccccc] rounded-lg focus:border-[#3898EC] focus:outline-2 focus:outline-[#2895f7] bg-white"
          placeholder="+507 6789-0123"
          autoComplete="tel"
        />
        {errors.phone && <p className="mt-1 text-xs text-[#ea384c]">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="emp-education" className="block text-sm font-medium text-[#333333] mb-2">
          {t('educationLabel')}
        </label>
        <select
          id="emp-education"
          name="education"
          value={education}
          onChange={(event) => setEducation(event.target.value)}
          className="w-full px-4 py-3 border border-[#cccccc] rounded-lg focus:border-[#3898EC] focus:outline-2 focus:outline-[#2895f7] bg-white text-[#333333]"
        >
          <option value="">{t('educationSelect')}</option>
          <option value="secundaria">{t('educationSecondary')}</option>
          <option value="tecnico">{t('educationTechnical')}</option>
          <option value="universitario">{t('educationUniversity')}</option>
          <option value="postgrado">{t('educationPostgrad')}</option>
        </select>
        {errors.education && <p className="mt-1 text-xs text-[#ea384c]">{errors.education}</p>}
      </div>

      <div>
        <label htmlFor="emp-cv" className="block text-sm font-medium text-[#333333] mb-2">
          {t('cvLabel')}
        </label>
        <input
          type="file"
          id="emp-cv"
          name="cv"
          accept=".pdf,.doc,.docx"
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null
            if (file && file.size > 3.5 * 1024 * 1024) {
              setErrors((prev) => ({ ...prev, cv: t('errors.cvSize') }))
              event.target.value = ""
              setCv(null)
              return
            }
            setErrors((prev) => ({ ...prev, cv: undefined }))
            setCv(file)
          }}
          className="w-full px-4 py-3 border border-[#cccccc] rounded-lg focus:border-[#3898EC] bg-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#3898EC] file:text-white hover:file:bg-[#0082f3]"
        />
        {errors.cv && <p className="mt-1 text-xs text-[#ea384c]">{errors.cv}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#3898EC] text-white py-3 rounded-lg font-medium hover:bg-[#0082f3] transition-colors disabled:opacity-50"
      >
        {isSubmitting ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            {t('submitting')}
          </span>
        ) : (
          t('submitBtn')
        )}
      </button>
      {submitError && <p className="text-xs text-[#b00020]">{submitError}</p>}
    </form>
  )
}
