import { Promotion } from '@/types/promotion';

export const MODAL_CONFIG = {
  SHOW_DELAY_MS: 2500,
  SESSION_KEY_PREFIX: 'promo-',
  OBSERVER_THRESHOLD: 0.5,
  AUTO_OPEN_ENABLED: true,
  SHOW_ON_INTERNAL_NAV: false,
};

export const SHARED_PROMOTIONS: Promotion[] = [
  // Example structure for time-based promotions:
  // {
  //   id: 'sunset-strip-launch',
  //   title: 'Sunset Strip - lanzamiento',
  //   description: 'Reserva tu visita esta semana.',
  //   type: 'shared',
  //   images: {
  //     desktop: '/images/properties/sunset-strip/flyers/modal-desktop.png',
  //     mobile: '/images/properties/sunset-strip/flyers/modal-mobile.png',
  //     thumbnail: '/images/properties/sunset-strip/flyers/modal-thumb.png',
  //   },
  //   video: {
  //     desktop: '/videos/promotions/sunset-strip-desktop.mp4',
  //     mobile: '/videos/promotions/sunset-strip-mobile.mp4',
  //     poster: '/images/properties/sunset-strip/flyers/modal-thumb.png',
  //     autoplay: true,
  //     loop: true,
  //     muted: true,
  //   },
  //   autoOpen: true,
  //   priority: 100,
  //   validFrom: '2026-03-01T00:00:00.000Z',
  //   validUntil: '2026-05-01T00:00:00.000Z',
  // },
];

// Ejemplo de banner informativo para Kings Park
// Este se inyecta en getPropertyPromotions en lib/promotions.ts
