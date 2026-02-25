'use client';

import { BusinessCard } from '@/components/business-card';

export default function CardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        /* Ocultar botón flotante de WhatsApp en esta página */
        [data-whatsapp-button] {
          display: none !important;
        }
      `}</style>
      <BusinessCard />
    </div>
  );
}
