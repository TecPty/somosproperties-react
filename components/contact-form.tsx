"use client"

import type React from "react"

import { useState } from "react"
import type { ContactFormData } from "@/lib/types"

interface ContactFormProps {
  compact?: boolean
  propertyTitle?: string
}

export default function ContactForm({ compact = false, propertyTitle }: ContactFormProps) {
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

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido"
    }

    if (!formData.consultationType) {
      newErrors.consultationType = "Seleccione un tipo de consulta"
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        consultationType: "",
        message: "",
        terms: true,
      })
      setSubmitted(false)
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  if (submitted) {
    return (
      <div className="bg-[#f3f3f3] rounded-lg p-8 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-[#28a745] mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-xl font-semibold text-[#222222] mb-2">¡Mensaje Enviado!</h3>
        <p className="text-[#999999]">Nos pondremos en contacto contigo pronto.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#333333] mb-2">
          Nombre completo *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg transition-colors placeholder:text-[#999999] bg-white ${
            errors.name
              ? "border-[#ea384c] focus:border-[#ea384c]"
              : "border-[#cccccc] focus:border-[#3898EC] focus:outline-2 focus:outline-[#2895f7]"
          }`}
          placeholder="Tu nombre"
        />
        {errors.name && <p className="mt-1 text-sm text-[#ea384c]">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#333333] mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg transition-colors placeholder:text-[#999999] bg-white ${
            errors.email
              ? "border-[#ea384c] focus:border-[#ea384c]"
              : "border-[#cccccc] focus:border-[#3898EC] focus:outline-2 focus:outline-[#2895f7]"
          }`}
          placeholder="tu@email.com"
        />
        {errors.email && <p className="mt-1 text-sm text-[#ea384c]">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[#333333] mb-2">
          Teléfono *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg transition-colors placeholder:text-[#999999] bg-white ${
            errors.phone
              ? "border-[#ea384c] focus:border-[#ea384c]"
              : "border-[#cccccc] focus:border-[#3898EC] focus:outline-2 focus:outline-[#2895f7]"
          }`}
          placeholder="+507 6789-0123"
        />
        {errors.phone && <p className="mt-1 text-sm text-[#ea384c]">{errors.phone}</p>}
      </div>

      {/* Consultation Type */}
      {!compact && (
        <div>
          <label htmlFor="consultationType" className="block text-sm font-medium text-[#333333] mb-2">
            Tipo de consulta *
          </label>
          <select
            id="consultationType"
            name="consultationType"
            value={formData.consultationType}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg transition-colors bg-white text-[#333333] ${
              errors.consultationType
                ? "border-[#ea384c] focus:border-[#ea384c]"
                : "border-[#cccccc] focus:border-[#3898EC] focus:outline-2 focus:outline-[#2895f7]"
            }`}
          >
            <option value="">Selecciona una opción</option>
            <option value="Compra">Compra de propiedad</option>
            <option value="Alquiler">Alquiler de propiedad</option>
            <option value="Vender">Vender mi propiedad</option>
            <option value="Información">Información general</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.consultationType && <p className="mt-1 text-sm text-[#ea384c]">{errors.consultationType}</p>}
        </div>
      )}

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#333333] mb-2">
          Mensaje *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={compact ? 4 : 6}
          className={`w-full px-4 py-3 border rounded-lg transition-colors placeholder:text-[#999999] bg-white resize-none ${
            errors.message
              ? "border-[#ea384c] focus:border-[#ea384c]"
              : "border-[#cccccc] focus:border-[#3898EC] focus:outline-2 focus:outline-[#2895f7]"
          }`}
          placeholder="Cuéntanos más sobre lo que necesitas..."
        />
        {errors.message && <p className="mt-1 text-sm text-[#ea384c]">{errors.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#3898EC] text-white py-3 rounded-lg font-medium hover:bg-[#0082f3] transition-colors disabled:bg-[#eeeeee] disabled:text-[#999999] disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting && (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
      </button>
    </form>
  )
}
