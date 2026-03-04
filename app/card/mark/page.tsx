'use client';

import { BusinessCard, type BusinessCardData } from '@/components/business-card';

const MARK_CONTACT_DATA: BusinessCardData = {
  name: 'MURAD JOSEPH HARARI (MARK)',
  title: 'FOUNDER & CEO',
  phones: [
    {
      label: 'Telf',
      display: '(917) 345-1555',
      raw: '+19173451555',
    },
    {
      label: 'Mobile',
      display: '(507) 690-80299',
      raw: '+50769080299',
      whatsapp: true,
    },
    {
      label: 'Office',
      display: '(507) 397-2700',
      raw: '+5073972700',
    },
    {
      label: 'Home',
      display: '(828) 278-7709',
      raw: '+18282787709',
    },
  ],
  email: 'mark@hgroupcapital.com',
  website: 'www.somosproperties.com',
  company: 'H Group Capital',
  cardUrl: 'https://www.somosproperties.com/card/mark',
  logoSrc: '/images/logo-group-capital.png',
  profileImageSrc: '/images/profile-card.png',
  backgroundImageSrc: '/images/background-card.png',
};

export default function MarkCardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        [data-whatsapp-button] {
          display: none !important;
        }
      `}</style>
      <BusinessCard contactData={MARK_CONTACT_DATA} showQr={false} scale={0.9} />
    </div>
  );
}
