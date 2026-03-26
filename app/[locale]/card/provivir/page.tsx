'use client';

import { BusinessCard } from '@/components/business-card';

export default function ProvivirCardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        /* Ocultar boton flotante de WhatsApp en esta pagina */
        [data-whatsapp-button] {
          display: none !important;
        }
      `}</style>
      <BusinessCard showQr={false} />
    </div>
  );
}
