'use client';

import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Mail, MessageCircle, Share2, ArrowLeft, Phone, MapPin, Globe } from 'lucide-react';
import Image from 'next/image';

type BusinessCardPhone = {
  label: string;
  display: string;
  raw: string;
  whatsapp?: boolean;
};

export type BusinessCardData = {
  name: string;
  title: string;
  phones: BusinessCardPhone[];
  email: string;
  address?: string;
  website: string;
  company: string;
  cardUrl: string;
  logoSrc: string;
  profileImageSrc?: string;
  backgroundImageSrc?: string;
};

const DEFAULT_CONTACT_DATA: BusinessCardData = {
  name: 'Mark Harari',
  title: 'Creative Director',
  phones: [
    {
      label: 'Phone',
      display: '+507 6677-0577',
      raw: '+50766770577',
      whatsapp: true,
    },
  ],
  email: 'markh@provivirpanama.com',
  address:
    'Via Espana - Avenida Aquilino de la Guardia, PH Beta 120 al lado del Porfuturo, Estacion del Metro Iglesia del Carmen',
  website: 'www.provivirpanama.com',
  company: 'PROVIVIR',
  cardUrl: 'https://www.somosproperties.com/card',
  logoSrc: '/images/logo-provivir.png',
  profileImageSrc: '/images/profile-card.png',
};

function buildVCard(contactData: BusinessCardData) {
  const phoneLines = contactData.phones
    .map((phone) => `TEL;TYPE=${phone.label.toUpperCase()}:${phone.raw}`)
    .join('\n');

  const addressLine = contactData.address ? `LABEL:${contactData.address}\n` : '';

  return `BEGIN:VCARD
VERSION:3.0
FN:${contactData.name}
TITLE:${contactData.title}
${phoneLines}
EMAIL:${contactData.email}
ORG:${contactData.company}
URL:${contactData.website}
${addressLine}NOTE:Tarjeta Digital
END:VCARD`;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

type BusinessCardProps = {
  contactData?: BusinessCardData;
  showQr?: boolean;
  scale?: number;
};

export function BusinessCard({
  contactData = DEFAULT_CONTACT_DATA,
  showQr = true,
  scale = 1,
}: BusinessCardProps) {
  const qrRef = React.useRef<HTMLDivElement | null>(null);
  const whatsappPhone = contactData.phones.find((phone) => phone.whatsapp) ?? contactData.phones[0];
  const backgroundStyle = contactData.backgroundImageSrc
    ? {
        backgroundImage: `linear-gradient(rgba(15,23,42,0.7), rgba(15,23,42,0.7)), url('${contactData.backgroundImageSrc}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : undefined;
  const headerStyle = contactData.backgroundImageSrc
    ? {
        backgroundImage: `url('${contactData.backgroundImageSrc}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : undefined;

  const handleWhatsApp = () => {
    if (!whatsappPhone) return;
    const phoneRaw = whatsappPhone.raw.replace(/[^\d]/g, '');
    const message = `Hola ${contactData.name}, vi tu tarjeta digital y me gustaria contactarte.`;
    window.open(`https://wa.me/${phoneRaw}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmail = () => {
    window.location.href = `mailto:${contactData.email}?subject=Contacto desde tarjeta digital`;
  };

  const downloadVCard = () => {
    const vcard = buildVCard(contactData);

    const element = document.createElement('a');
    element.setAttribute('href', `data:text/vcard;charset=utf-8,${encodeURIComponent(vcard)}`);
    element.setAttribute('download', `${contactData.name}.vcf`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = async () => {
    if (!navigator.share) return;

    try {
      await navigator.share({
        title: `Tarjeta de ${contactData.name}`,
        text: `Contacta a ${contactData.name} - ${contactData.title} en ${contactData.company}`,
        url: contactData.cardUrl,
      });
    } catch (err) {
      console.log('Error al compartir:', err);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4"
      style={backgroundStyle}
    >
      <div
        className="w-full max-w-xs bg-white rounded-3xl overflow-hidden shadow-2xl"
        style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}
      >
        <div
          className={`relative h-32 overflow-hidden flex items-start justify-center pt-2 ${
            contactData.backgroundImageSrc ? '' : 'bg-blue-700'
          }`}
          style={headerStyle}
        >
          <div className="relative w-64 h-24">
            <Image
              src={contactData.logoSrc}
              alt={`${contactData.company} Logo`}
              fill
              className="object-contain object-center"
              priority
            />
          </div>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="absolute top-3 left-3 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <button
            type="button"
            className="absolute top-3 right-3 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="px-4 pb-6 relative z-10">
          <div className="flex justify-center mb-4 -mt-10">
            <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200 relative">
              {contactData.profileImageSrc ? (
                <Image
                  src={contactData.profileImageSrc}
                  alt={contactData.name}
                  fill
                  className="object-cover object-[50%_20%]"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-blue-700 text-3xl font-black text-white">
                  {getInitials(contactData.name)}
                </div>
              )}
            </div>
          </div>

          <h1 className="text-2xl font-black text-center text-gray-900 mb-1">{contactData.name}</h1>

          <p className="text-center text-gray-600 font-semibold text-xs mb-4">{contactData.title}</p>

          <div className="space-y-2 mb-4 bg-gray-50 rounded-lg p-3">
            {contactData.phones.map((phone) => (
              <a
                key={`${phone.label}-${phone.raw}`}
                href={`tel:${phone.raw}`}
                className="flex items-center gap-2 hover:bg-gray-100 p-1.5 rounded transition"
              >
                <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-xs font-medium text-gray-800">
                  {phone.label}: {phone.display}
                </span>
              </a>
            ))}

            <a
              href={`mailto:${contactData.email}`}
              className="flex items-center gap-2 hover:bg-gray-100 p-1.5 rounded transition"
            >
              <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="text-xs font-medium text-gray-800 break-all">{contactData.email}</span>
            </a>

            {contactData.address ? (
              <div className="flex items-start gap-2 hover:bg-gray-100 p-1.5 rounded transition">
                <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-gray-800 leading-snug">{contactData.address}</span>
              </div>
            ) : null}

            <a
              href={`https://${contactData.website}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:bg-gray-100 p-1.5 rounded transition"
            >
              <Globe className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="text-xs font-medium text-gray-800">{contactData.website}</span>
            </a>
          </div>

          {showQr ? (
            <div className="mb-4 flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
              <div ref={qrRef} className="rounded-xl bg-white p-2">
                <QRCodeCanvas value={buildVCard(contactData)} size={112} level="M" includeMargin />
              </div>
              <p className="mt-2 text-center text-[11px] font-medium text-gray-500">
                Escanea para guardar el contacto
              </p>
            </div>
          ) : null}

          <button
            onClick={downloadVCard}
            className="w-full bg-blue-500/20 hover:bg-blue-500/40 backdrop-blur-md border border-blue-400/40 text-blue-700 font-bold py-2.5 px-4 rounded-full mb-3 flex items-center justify-center gap-2 transition-all shadow-md text-sm"
          >
            Save Contact Card
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleWhatsApp}
              disabled={!whatsappPhone}
              className="bg-teal-500/20 hover:bg-teal-500/40 disabled:opacity-40 backdrop-blur-md border border-teal-400/40 text-teal-700 font-bold py-2 px-3 rounded-full flex items-center justify-center gap-1.5 transition-all shadow-md text-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleEmail}
              className="bg-blue-500/20 hover:bg-blue-500/40 backdrop-blur-md border border-blue-400/40 text-blue-700 font-bold py-2 px-3 rounded-full flex items-center justify-center gap-1.5 transition-all shadow-md text-xs"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
