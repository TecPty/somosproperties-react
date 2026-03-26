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

// CAMBIO: Array centralizado de promociones por propiedad
// RAZÓN: Permite definir y mantener promociones de forma escalable y clara
export const PROPERTY_PROMOTIONS: Promotion[] = [
  {
    id: 'kings-park-info',
    propertyId: 1, // ID real de Kings Park
    title: 'Apartamentos en venta',
    description: 'Descubre los mejores apartamentos en Kings Park.',
    type: 'property-specific',
    images: {
      desktop: '/images/properties/kings-park/promotional/modal-kings-park-desktop.png',
      mobile: '/images/properties/kings-park/promotional/modal-kings-park-mobile.png',
      thumbnail: '/images/properties/kings-park/promotional/thumbnail-kings-park.png',
    },
    propertySlug: 'kings-park',
    autoOpen: true,
    priority: 10,
    validFrom: '2026-01-01T00:00:00.000Z',
    validUntil: '2026-12-31T23:59:59.999Z',
    config: {
      showDelayMs: 2200,
      showOncePerSession: true,
    },
  },
  {
    id: 'kings-park-info-238',
    propertyId: 238, // Otra unidad de Kings Park
    title: 'Apartamentos en venta',
    description: 'Descubre los mejores apartamentos en Kings Park.',
    type: 'property-specific',
    images: {
      desktop: '/images/properties/kings-park/promotional/modal-kings-park-desktop.png',
      mobile: '/images/properties/kings-park/promotional/modal-kings-park-mobile.png',
      thumbnail: '/images/properties/kings-park/promotional/thumbnail-kings-park.png',
    },
    propertySlug: 'kings-park',
    autoOpen: true,
    priority: 10,
    validFrom: '2026-01-01T00:00:00.000Z',
    validUntil: '2026-12-31T23:59:59.999Z',
    config: {
      showDelayMs: 2200,
      showOncePerSession: true,
    },
  },
  {
    id: 'balboa-boutique-info',
    propertyId: 134, // ID adicional de Balboa Boutique
    title: 'Balboa Boutique: Vive en el centro',
    description: 'Promoción exclusiva en Balboa Boutique. Consulta condiciones.',
    type: 'property-specific',
    images: {
      desktop: '/images/properties/balboa-boutique/promotional/modal-balboa-desktop.png',
      mobile: '/images/properties/balboa-boutique/promotional/modal-balboa-mobile.png',
      thumbnail: '/images/properties/balboa-boutique/promotional/thumbnail-balboa.png',
    },
    propertySlug: 'balboa-boutique',
    autoOpen: true,
    priority: 8,
    validFrom: '2026-01-01T00:00:00.000Z',
    validUntil: '2026-12-31T23:59:59.999Z',
    config: {
      showDelayMs: 2200,
      showOncePerSession: true,
    },
  },
  {
    id: 'playa-escondida-info',
    propertyId: 164, // ID real de Playa Escondida
    title: 'Playa Escondida: Oferta especial',
    description: 'Vive frente al mar con beneficios únicos. Consulta detalles.',
    type: 'property-specific',
    images: {
      desktop: '/images/properties/playa-escondida/promotional/modal-playa-desktop.png',
      mobile: '/images/properties/playa-escondida/promotional/modal-playa-mobile.png',
      thumbnail: '/images/properties/playa-escondida/promotional/thumbnail-playa.png',
    },
    propertySlug: 'playa-escondida',
    autoOpen: true,
    priority: 7,
    validFrom: '2026-01-01T00:00:00.000Z', 
    validUntil: '2026-12-31T23:59:59.999Z',
    config: {
      showDelayMs: 2200,
      showOncePerSession: true,
    },
  },
]
