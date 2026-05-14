'use client';

import { BusinessCard, type BusinessCardData } from '@/components/business-card';

const XTRA_CONTACT_DATA: BusinessCardData = {
  name: 'MARK J. HARARI',
  title: 'GERENTE CORPORATIVO',
  phones: [
    {
      label: 'Mobile',
      display: '(507) 6675-2662',
      raw: '+50766752662',
      whatsapp: true,
    },
  ],
  email: 'mark@hgroupcapital.com',
  address: 'PH Ejecutivo, Calle 50, Piso 3, Ciudad de Panama',
  website: 'www.superxtra.com',
  company: 'Xtra',
  cardUrl: 'https://www.somosproperties.com/card/xtra',
  logoSrc: '/images/logo-xtra.webp',
  profileImageSrc: '/images/profile-card-boss.webp',
  backgroundImageSrc: '/images/xtra/background-xtra.webp',
  headerBackgroundImageSrc: '/images/xtra/header-background-xtra.webp',
  theme: {
    iconClassName: 'text-[#16a34a]',
    primaryButtonClassName:
      'bg-[#f97316]/20 hover:bg-[#f97316]/35 border border-[#f97316]/50 text-[#14532d]',
    whatsappButtonClassName:
      'bg-[#16a34a]/20 hover:bg-[#16a34a]/35 border border-[#16a34a]/45 text-[#14532d]',
    emailButtonClassName:
      'bg-[#facc15]/20 hover:bg-[#facc15]/35 border border-[#facc15]/50 text-[#14532d]',
  },
};

export default function XtraCardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        [data-whatsapp-button] {
          display: none !important;
        }
      `}</style>
      <BusinessCard contactData={XTRA_CONTACT_DATA} showQr={false} scale={0.9} />
    </div>
  );
}
