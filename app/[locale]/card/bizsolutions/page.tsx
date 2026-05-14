'use client';

import { BusinessCard, type BusinessCardData } from '@/components/business-card';

const BIZ_SOLUTIONS_CONTACT_DATA: BusinessCardData = {
  name: 'MARK J. HARARI',
  title: 'SPECIAL SYSTEMS EXPERTS',
  phones: [
    {
      label: 'Mobile',
      display: '(507) 6908-0299',
      raw: '+50769080299',
      whatsapp: true,
    },
  ],
  email: 'mharari@bizsolutions.com.pa',
  address: 'Calle 1era Bella Vista, Centro Empresarial Mar del Sur, Oficina 508, Ciudad de Panama',
  website: 'www.bizsolutions.com.pa',
  company: 'Biz Solutions',
  cardUrl: 'https://www.somosproperties.com/card/bizsolutions',
  logoSrc: '/images/logo-bizsolutions.webp',
  profileImageSrc: '/images/profile-card-boss.webp',
  backgroundImageSrc: '/images/bizsolutions/background-bizsolutios.webp',
  headerBackgroundImageSrc: '/images/bizsolutions/header-background-bizsolutions.webp',
  theme: {
    iconClassName: 'text-[#f59e0b]',
    primaryButtonClassName:
      'bg-[#f59e0b]/20 hover:bg-[#f59e0b]/35 border border-[#f59e0b]/50 text-[#1f2937]',
    whatsappButtonClassName:
      'bg-[#f59e0b]/15 hover:bg-[#f59e0b]/30 border border-[#f59e0b]/45 text-[#1f2937]',
    emailButtonClassName:
      'bg-[#1f2937]/15 hover:bg-[#1f2937]/25 border border-[#1f2937]/45 text-[#1f2937]',
  },
};

export default function BizSolutionsCardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        [data-whatsapp-button] {
          display: none !important;
        }
      `}</style>
      <BusinessCard contactData={BIZ_SOLUTIONS_CONTACT_DATA} showQr={false} scale={0.9} />
    </div>
  );
}
