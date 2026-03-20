import { useEffect, useRef, useState } from 'react';
import { Promotion } from '@/types/promotion';

export function usePromotionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const openModal = (promo: Promotion) => {
    previousFocus.current = document.activeElement as HTMLElement;
    setPromotion(promo);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    if (previousFocus.current) {
      previousFocus.current.focus();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return { isOpen, promotion, openModal, closeModal };
}
