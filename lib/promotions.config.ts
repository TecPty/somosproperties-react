import { Promotion } from '@/types/promotion';

export const MODAL_CONFIG = {
  SHOW_DELAY_MS: 2500,
  SESSION_KEY_PREFIX: 'promo-',
  OBSERVER_THRESHOLD: 0.5,
  AUTO_OPEN_ENABLED: true,
  SHOW_ON_INTERNAL_NAV: false,
};

export const SHARED_PROMOTIONS: Promotion[] = [
  // No hay promociones compartidas actualmente
];

// Ejemplo de banner informativo para Kings Park
// Este se inyecta en getPropertyPromotions en lib/promotions.ts
