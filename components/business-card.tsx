'use client';

import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Mail, MessageCircle, Share2, ArrowLeft, Phone, MapPin, Globe } from 'lucide-react';
import Image from 'next/image';

const CONTACT_DATA = {
  name: 'Mark Harari',
  title: 'Creative Director',
  phone: '+507 6677-0577',
  phoneRaw: '+50766770577',
  email: 'markh@provivirpanama.com',
  address: 'Vía España - Avenida Aquilino de la Guardia, PH Beta 120 al lado del Porfuturo, Estación del Metro Iglesia del Carmen',
  website: 'www.provivirpanama.com',
  company: 'PROVIVIR',
  cardUrl: 'https://www.somosproperties.com/card',
};

export function BusinessCard() {
  const [copied, setCopied] = useState(false);
  const qrRef = React.useRef<any>(null);

  const handleWhatsApp = () => {
    const message = `Hola Mark, vi tu tarjeta digital y me gustaría contactarte.`;
    window.open(`https://wa.me/${CONTACT_DATA.phoneRaw}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmail = () => {
    window.location.href = `mailto:${CONTACT_DATA.email}?subject=Contacto desde tarjeta digital`;
  };

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${CONTACT_DATA.name}
TITLE:${CONTACT_DATA.title}
TEL:${CONTACT_DATA.phone}
EMAIL:${CONTACT_DATA.email}
ORG:${CONTACT_DATA.company}
URL:${CONTACT_DATA.website}
LABEL:${CONTACT_DATA.address}
NOTE:Tarjeta Digital
END:VCARD`;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/vcard;charset=utf-8,' + encodeURIComponent(vcard));
    element.setAttribute('download', `${CONTACT_DATA.name}.vcf`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Tarjeta de ${CONTACT_DATA.name}`,
          text: `Contacta a ${CONTACT_DATA.name} - ${CONTACT_DATA.title} en ${CONTACT_DATA.company}`,
          url: CONTACT_DATA.cardUrl,
        });
      } catch (err) {
        console.log('Error al compartir:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      {/* Contenedor Mobile - Reducido */}
      <div className="w-full max-w-xs bg-white rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Header con Logo */}
        <div className="relative h-32 bg-blue-700 overflow-hidden flex items-start justify-center pt-2">
          <div className="relative w-64 h-24">
            <Image
              src="/images/logo-provivir.png"
              alt="PROVIVIR Logo"
              fill
              className="object-contain object-center"
              priority
            />
          </div>
          <div className="absolute top-3 left-3 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-30">
            <ArrowLeft className="w-4 h-4 text-white" />
          </div>
          <div className="absolute top-3 right-3 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-30"
               onClick={handleShare}>
            <Share2 className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="px-4 pb-6 relative z-10">
          
          {/* Foto Circular */}
          <div className="flex justify-center mb-4 -mt-10">
            <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200 relative">
              <Image
                src="/images/profile-card.png"
                alt={CONTACT_DATA.name}
                fill
                className="object-cover object-[50%_20%]"
                priority
              />
            </div>
          </div>

          {/* Nombre */}
          <h1 className="text-2xl font-black text-center text-gray-900 mb-1">
            {CONTACT_DATA.name}
          </h1>

          {/* Cargo */}
          <p className="text-center text-gray-600 font-semibold text-xs mb-4">
            {CONTACT_DATA.title}
          </p>

          {/* Datos de Contacto con Iconos */}
          <div className="space-y-2 mb-4 bg-gray-50 rounded-lg p-3">
            {/* Teléfono */}
            <a href={`tel:${CONTACT_DATA.phoneRaw}`} className="flex items-center gap-2 hover:bg-gray-100 p-1.5 rounded transition">
              <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="text-xs font-medium text-gray-800">{CONTACT_DATA.phone}</span>
            </a>

            {/* Email */}
            <a href={`mailto:${CONTACT_DATA.email}`} className="flex items-center gap-2 hover:bg-gray-100 p-1.5 rounded transition">
              <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="text-xs font-medium text-gray-800 break-all">{CONTACT_DATA.email}</span>
            </a>

            {/* Ubicación Completa */}
            <div className="flex items-start gap-2 hover:bg-gray-100 p-1.5 rounded transition">
              <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-xs font-medium text-gray-800 leading-snug">{CONTACT_DATA.address}</span>
            </div>

            {/* Website */}
            <a href={`https://${CONTACT_DATA.website}`} target="_blank" className="flex items-center gap-2 hover:bg-gray-100 p-1.5 rounded transition">
              <Globe className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="text-xs font-medium text-gray-800">{CONTACT_DATA.website}</span>
            </a>
          </div>

          {/* Botón Save Contact - Principal */}
          <button
            onClick={downloadVCard}
            className="w-full bg-blue-500/20 hover:bg-blue-500/40 backdrop-blur-md border border-blue-400/40 text-blue-700 font-bold py-2.5 px-4 rounded-full mb-3 flex items-center justify-center gap-2 transition-all shadow-md text-sm"
          >
            Save Contact Card
          </button>

          {/* Botones Secundarios */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleWhatsApp}
              className="bg-teal-500/20 hover:bg-teal-500/40 backdrop-blur-md border border-teal-400/40 text-teal-700 font-bold py-2 px-3 rounded-full flex items-center justify-center gap-1.5 transition-all shadow-md text-xs"
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
