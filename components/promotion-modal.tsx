'use client';
import { useRef } from 'react';
import { Promotion } from '@/types/promotion';
import { PromotionImage } from './promotion-image';

import styles from './promotion-modal.module.css';
import { useFocusTrap } from '@/hooks/use-focus-trap';

interface Props {
  isOpen: boolean;
  promotion: Promotion | null;
  onClose: () => void;
}

export function PromotionModal({ isOpen, promotion, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(isOpen, modalRef, onClose);

  if (!isOpen || !promotion) return null;

  // Handler para click en la imagen
  const handleImageClick = () => {
    const contactForm = document.getElementById('contact-section');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/contacto';
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-title"
      aria-describedby="promo-description"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-xs sm:max-w-lg md:max-w-2xl flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 rounded-full p-2 focus:ring-2 focus:ring-white z-10"
          aria-label="Cerrar promoción"
          onClick={onClose}
        >
          <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div
          className="cursor-pointer flex items-center justify-center w-full"
          onClick={handleImageClick}
          title="Solicitar información"
        >
          <div className="w-full max-h-[50vh] sm:max-h-[60vh] md:max-h-[75vh] flex justify-center items-center">
            <PromotionImage images={promotion.images} alt={promotion.title} />
          </div>
        </div>
      </div>
    </div>
  );
}
