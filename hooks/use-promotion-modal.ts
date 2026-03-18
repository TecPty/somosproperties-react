import { useState, useRef } from 'react';
import { Promotion } from '@/types/promotion';

export function usePromotionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const openModal = (promo: Promotion) => {
    previousFocus.current = document.activeElement as HTMLElement;
    setPromotion(promo);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
    previousFocus.current?.focus();
  };

  return { isOpen, promotion, openModal, closeModal };
}
