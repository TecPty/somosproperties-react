"use client"

import { ConsentProvider } from "@/hooks/use-consent-manager"
import dynamic from 'next/dynamic'
import { ReactNode, useState, useEffect } from 'react'

const ConsentBanner = dynamic(() => import("@/components/consent-banner"), {
  ssr: false
})

interface ConsentLayoutProps {
  children: ReactNode
}

export default function ConsentLayout({ children }: ConsentLayoutProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <ConsentProvider>
      {children}
      {mounted && <ConsentBanner />}
    </ConsentProvider>
  )
}
