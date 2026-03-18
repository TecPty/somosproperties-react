'use client';
import { useRef } from 'react';
import { Promotion } from '@/types/promotion';
import { PromotionImage } from './promotion-image';
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
        className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-[95vw] p-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-2 focus:ring-2 focus:ring-white z-10"
          aria-label="Cerrar promoción"
          onClick={onClose}
        >
          <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="cursor-pointer" onClick={handleImageClick} title="Solicitar información">
          <PromotionImage images={promotion.images} alt={promotion.title} />
        </div>
      </div>
    </div>
  );
}
