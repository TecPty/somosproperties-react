"use client"

import { useMemo, useState } from "react"
import { useTranslations } from "next-intl"
import { trackGaEvent } from "@/lib/google-analytics"
import { trackGoogleAdsEvent } from "@/lib/google-ads"
import { trackContact, trackLead } from "@/lib/facebook-pixel"

type LeadQualifierProps = {
  propertyId: number
  propertyTitle: string
  minIncome?: number
}

const WHATSAPP_NUMBER = "50766770577"

export default function LeadQualifier({ propertyId, propertyTitle, minIncome }: LeadQualifierProps) {
  const t = useTranslations('leadQualifier')
  const [ingreso, setIngreso] = useState("")
  const [tiempo, setTiempo] = useState("")
  const [tipo, setTipo] = useState("")
  const [operacion, setOperacion] = useState("")
  const [nombre, setNombre] = useState("")
  const [showError, setShowError] = useState(false)

  const incomeValue = useMemo(() => {
    const normalized = ingreso.trim()
    if (!normalized) return null
    const mapping: Record<string, number> = {
      "Menos de $1,500": 0,
      "$1,500 - $2,499": 1500,
      "$3,000 - $3,999": 3000,
      "$4,000 - $5,999": 4000,
      "$6,000 - $7,999": 6000,
      "$8,000 - $9,999": 8000,
      "$10,000+": 10000,
    }
    return mapping[normalized] ?? null
  }, [ingreso])

  const isQualified = useMemo(() => {
    if (!incomeValue) return true
    if (minIncome === undefined || minIncome === null) return true
    return incomeValue >= minIncome
  }, [incomeValue, minIncome])

  const message = useMemo(() => {
    return t('whatsappMessage', {
      name: nombre,
      property: propertyTitle,
      type: tipo,
      operation: operacion,
      income: ingreso,
      operationLower: operacion ? operacion.toLowerCase() : t('operationBuy').toLowerCase(),
      timeframe: tiempo,
    })
  }, [ingreso, nombre, operacion, propertyTitle, tiempo, tipo, t])

  const validate = () => {
    const isValid = nombre && ingreso && tiempo && tipo && operacion
    setShowError(!isValid)
    return Boolean(isValid)
  }

  const trackSubmission = (channel: "whatsapp" | "email") => {
    const payload = {
      property_id: propertyId,
      property_title: propertyTitle,
      property_type: tipo,
      operation_intent: operacion,
      income: ingreso,
      timeframe: tiempo,
      channel,
      lead_name: nombre,
    }

    trackLead("lead_qualifier")
    trackContact(channel, String(propertyId))
    trackGaEvent("lead_qualifier_submit", payload)
    trackGoogleAdsEvent("lead_qualifier_submit", payload)
  }

  const handleWhatsApp = () => {
    if (!validate()) return
    trackSubmission("whatsapp")
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank", "noopener,noreferrer")
  }


  return (
    <div className="mt-6 rounded-xl border border-[#cfe3ff] bg-[#f2f8ff] p-5 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-[#0b3d91]">{t('title')}</h3>
        <span className="rounded-full bg-[#0b3d91] px-2 py-1 text-xs font-semibold text-white">{t('badge')}</span>
      </div>
      <p className="mt-1 text-sm text-[#234a80]">{t('subtitle')}</p>

      <div className="mt-4 space-y-3 text-sm text-[#333333]">
        <div>
          <label className="block mb-1 font-medium" htmlFor="lead-nombre">
            {t('nameLabel')}
          </label>
          <input
            id="lead-nombre"
            name="lead-nombre"
            type="text"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            className="w-full rounded-lg border border-[#dddddd] px-3 py-2"
            placeholder={t('namePlaceholder')}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="lead-tipo">
            {t('typeLabel')}
          </label>
          <select
            id="lead-tipo"
            name="lead-tipo"
            value={tipo}
            onChange={(event) => setTipo(event.target.value)}
            className="w-full rounded-lg border border-[#dddddd] px-3 py-2"
          >
            <option value="" disabled>
              {t('typeSelect')}
            </option>
            <option value={t('typeApartment')}>{t('typeApartment')}</option>
            <option value={t('typeCommercial')}>{t('typeCommercial')}</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="lead-operacion">
            {t('operationLabel')}
          </label>
          <select
            id="lead-operacion"
            name="lead-operacion"
            value={operacion}
            onChange={(event) => setOperacion(event.target.value)}
            className="w-full rounded-lg border border-[#dddddd] px-3 py-2"
          >
            <option value="" disabled>
              {t('operationSelect')}
            </option>
            <option value={t('operationBuy')}>{t('operationBuy')}</option>
            <option value={t('operationRent')}>{t('operationRent')}</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="lead-ingreso">
            {t('incomeLabel')}
          </label>
          <select
            id="lead-ingreso"
            name="lead-ingreso"
            value={ingreso}
            onChange={(event) => setIngreso(event.target.value)}
            className="w-full rounded-lg border border-[#dddddd] px-3 py-2"
          >
            <option value="" disabled>
              {t('incomeSelect')}
            </option>
            <option value="Menos de $1,500">Menos de $1,500</option>
            <option value="$1,500 - $2,499">$1,500 - $2,499</option>
            <option value="$3,000 - $3,999">$3,000 - $3,999</option>
            <option value="$4,000 - $5,999">$4,000 - $5,999</option>
            <option value="$6,000 - $7,999">$6,000 - $7,999</option>
            <option value="$8,000 - $9,999">$8,000 - $9,999</option>
            <option value="$10,000+">$10,000+</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="lead-tiempo">
            {t('timeframeLabel')}
          </label>
          <select
            id="lead-tiempo"
            name="lead-tiempo"
            value={tiempo}
            onChange={(event) => setTiempo(event.target.value)}
            className="w-full rounded-lg border border-[#dddddd] px-3 py-2"
          >
            <option value="" disabled>
              {t('timeframeSelect')}
            </option>
            <option value={t('timeframe30')}>{t('timeframe30')}</option>
            <option value={t('timeframe1_3')}>{t('timeframe1_3')}</option>
            <option value={t('timeframe3_6')}>{t('timeframe3_6')}</option>
            <option value={t('timeframe6_12')}>{t('timeframe6_12')}</option>
            <option value={t('timeframeExploring')}>{t('timeframeExploring')}</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <button
          type="button"
          onClick={handleWhatsApp}
          className="w-full rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1ebe5d]"
        >
          {t('whatsappBtn')}
        </button>
      </div>

      {!isQualified && incomeValue !== null && minIncome !== undefined && (
        <p className="mt-3 rounded-lg border border-[#ffd7a8] bg-[#fff3e6] px-3 py-2 text-sm text-[#8a4b00]">
          {t('notQualified')}
        </p>
      )}

      {showError && (
        <p className="mt-3 text-sm text-[#b00020]">{t('validationError')}</p>
      )}
    </div>
  )
}
